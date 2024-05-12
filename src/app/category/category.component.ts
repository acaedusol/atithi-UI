// src/app/components/category-list/category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Category, CategoryItems, MenuItem } from '../Models/Category';
import { OrderItem } from '../Models/Order';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { CategoryMenuService } from '../service/CategoryMenu/categorymenu.service';
import { LocalStorageService } from '../service/LocalStorage/localstorage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = []; // Array to hold fetched categories
  selectedCategory: Category | undefined;
  orderItems: OrderItem[] = [];
  constructor(
    private categoryService: CategoryMenuService,
    private orderDataService: OrderDataService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.categoryService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category ?? undefined;
    });

    this.categoryService.category$.subscribe((item) => {
      this.categories = item;
    });

    var orderDetails = this.storageService.getObject('OrderDetails');
    if (orderDetails == null) {
      this.orderDataService.orderItems$.subscribe((order) => {
        this.orderItems = order;
      });
    } else {
      this.orderItems = orderDetails['OrderItems'];
      this.updateOrderItems();
    }

    if (this.selectedCategory === undefined || this.categories.length === 0) {
      if (this.categoryService.getCategories().length === 0) {
        this.categoryService.getAllCategoryMenu().subscribe((data) => {
          this.categoryService.setCategories(data);
          this.categoryService.setSelectedCategories(this.categories[0]);
        });
      } else {
        this.categories = this.categoryService.getCategories();
        this.categoryService.setSelectedCategories(this.categories[0]);
      }
    }
  }

  // Set the selected category
  selectCategory(category: Category): void {
    this.selectedCategory = category; // Update the selected category
    this.categoryService.setSelectedCategories(this.selectedCategory);
  }

  // Get menu items for the selected category
  getMenuItemsForSelectedCategory(): MenuItem[] {
    var menuItems: MenuItem[] = [];
    this.categoryService.selectedCategory$.subscribe((category) => {
      menuItems = category?.items ?? [];
    });
    return menuItems;
  }

  updateOrderItems(): void {
    this.orderDataService.setOrderItems(this.orderItems);
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
}
