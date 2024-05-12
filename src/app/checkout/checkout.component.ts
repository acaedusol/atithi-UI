import { Component } from '@angular/core';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';
import { CategoryMenuService } from '../service/CategoryMenu/categorymenu.service';
import { MenuItem } from '../Models/Category';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/LocalStorage/localstorage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  menuItems: MenuItem[] = [];
  totalPrice: number = 0;
  gst: number = 0;
  totalItemPrice: number = 0;
  roomId: string | null = '';
  constructor(
    private orderDataService: OrderDataService,
    private categoryService: CategoryMenuService,
    private router: Router,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    var roomNumber = this.storageService.getItem('RoomId');
    if (roomNumber === null) {
      this.router.navigate(['/home']);
    } else {
      this.roomId = roomNumber;
    }
    this.orderDataService.orderItems$.subscribe((order) => {
      this.orderItems = order;
      this.cartCount = this.orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });
    this.categoryService.menuItem$.subscribe((item) => {
      this.menuItems = item;
    });

    if (this.orderItems.length === 0) {
      this.router.navigate(['/empty']);
    }

    this.totalPrice = this.fetchOrderDetails();
    this.gst = (this.totalPrice * 5) / 100;
    this.totalItemPrice = this.totalPrice + this.gst + 20;
  }

  // Get menu items for the selected category
  getMenuItemsForSelectedCategory(): MenuItem[] {
    const menuList: MenuItem[] = [];
    this.orderItems.forEach((order) => {
      const menuItem = this.fetchMenuDetails(order.menuItemId);
      if (menuItem !== null) {
        menuList.push(menuItem);
      }
    });
    return menuList;
  }

  fetchMenuDetails(menuItemId: string): MenuItem | null {
    const menuItem = this.menuItems.find((item) => item.menuId === menuItemId);
    return menuItem !== undefined ? menuItem : null;
  }

  updateOrderItems(): void {
    this.orderDataService.setOrderItems(this.orderItems);

    if (this.orderItems.length === 0) {
      this.router.navigate(['/empty']);
    }

    this.totalPrice = this.fetchOrderDetails();
    this.gst = (this.totalPrice * 5) / 100;
    this.totalItemPrice = this.totalPrice + this.gst + 20;
  }

  selectItem(item: MenuItem): void {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase the quantity
    } else {
      // Add the item with a quantity of 1
      this.orderItems.push({ menuItemId: item.menuId, quantity: 1 });
    }
    this.updateOrderItems();
  }

  // Increase the quantity of an order item
  increaseItem(item: MenuItem): void {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase by 1
    }
    this.updateOrderItems();
  }

  // Reduce the quantity of an order item
  reduceItem(item: MenuItem): void {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1; // Decrease by 1
    } else if (existingItem && existingItem.quantity === 1) {
      this.orderItems = this.orderItems.filter(
        (orderItem) => orderItem.menuItemId !== item.menuId
      ); // Remove the item if quantity is 0
    }
    this.updateOrderItems();
  }

  // Determine whether the "Add" button should be shown
  showAddButton(item: MenuItem): boolean {
    return !this.orderItems.some(
      (orderItem) => orderItem.menuItemId === item.menuId
    );
  }

  // Determine whether the "+" and "-" buttons should be shown
  showIncrementDecrementButtons(item: MenuItem): boolean {
    return !this.showAddButton(item); // Shown when "Add" is not shown
  }

  getItemQuantity(item: MenuItem): number {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    return existingItem ? existingItem.quantity : 0; // Return 0 if not found
  }

  fetchOrderDetails(): number {
    let totalPrice = 0;
    this.orderItems.forEach((orderItem) => {
      const menuDetails = this.fetchMenuDetails(orderItem.menuItemId);
      if (menuDetails != null) {
        const itemTotalPrice = menuDetails.price * orderItem.quantity;
        totalPrice += itemTotalPrice;
      }
    });
    return totalPrice;
  }

  navigateToConfirmPage() {
    this.router.navigate(['/confirm']);
  }
}
