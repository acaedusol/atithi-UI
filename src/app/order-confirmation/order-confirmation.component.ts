import { Component } from '@angular/core';
import { OrderItem } from '../Models/Order';
import { MenuItem } from '../Models/Category';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { CategoryMenuService } from '../service/CategoryMenu/categorymenu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent {
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  menuItems: MenuItem[] = [];
  totalPrice: number = 0;
  gst: number = 0;
  totalItemPrice: number = 0;
  constructor(
    private orderDataService: OrderDataService,
    private categoryService: CategoryMenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      this.orderDataService.setOrderPlacement();
      this.router.navigate(['/home']);
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

  navigateToHomePage() {
    this.orderDataService.setOrderPlacement();
    this.router.navigate(['/home']);
  }
}
