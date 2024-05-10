// src/app/components/category-list/category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Category, CategoryItems, MenuItem } from '../Models/Category';
import { OrderItem } from '../Models/Order';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { CategoryMenuService } from '../service/CategoryMenu/categorymenu.service';

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
    private orderDataService: OrderDataService
  ) {}

  ngOnInit(): void {
    this.categoryService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category ?? undefined;
    });

    this.categoryService.category$.subscribe((item) => {
      this.categories = item;
    });
    if (this.selectedCategory === undefined || this.categories.length === 0) {
      this.categories = [
        {
          categoryId: '9e64c7e3-6562-4bb3-9ff1-ea1f9325155a',
          categoryName: 'Cakes',
          items: [
            {
              menuId: '77add31a-8536-4e6b-9a13-e878ffda9a55',
              itemName: 'Mojito',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '9e64c7e3-6562-4bb3-9ff1-ea1f9325155a',
            },
            {
              menuId: 'b49fb209-c770-4e78-96a8-d36416379380',
              itemName: 'Gin',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '9e64c7e3-6562-4bb3-9ff1-ea1f9325155a',
            },
          ],
        },
        {
          categoryId: '52895bf5-23f0-421b-a53d-534154d3cc58',
          categoryName: 'Beverages',
          items: [
            {
              menuId: 'c36eba8a-bd38-4a36-a69b-61a56b302fb5',
              itemName: 'Strawberry',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc58',
            },
            {
              menuId: 'c36eba8a-bd38-4a36-a69b-61a56b302fb4',
              itemName: 'Strawberry',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc58',
            },
            {
              menuId: 'c36eba8a-bd38-4a36-a69b-61a56b302fb6',
              itemName: 'Strawberry',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc58',
            },
            {
              menuId: 'd83573c6-4875-40e9-9a45-a1795a1d8f78',
              itemName: 'BlackForest',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc58',
            },
          ],
        },
        {
          categoryId: '52895bf5-23f0-421b-a53d-534154d3cc59',
          categoryName: 'Fast Food',
          items: [
            {
              menuId: 'c36eba8a-bd38-4a36-a69b-534154d3cfb5',
              itemName: 'Chilli Potato',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc59',
            },
            {
              menuId: 'd83573c6-4875-40e9-9a45-534154d3cf78',
              itemName: 'FriedRice',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc59',
            },
          ],
        },
        {
          categoryId: '52895bf5-23f0-421b-a53d-534154d3cc60',
          categoryName: 'Fast Food',
          items: [
            {
              menuId: 'c36eba8a-bd38-4a36-a69b-534154d3cfb5',
              itemName: 'Chilli Potato',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc60',
            },
            {
              menuId: 'd83573c6-4875-40e9-9a45-534154d3cf78',
              itemName: 'FriedRice',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc60',
            },
          ],
        },
        {
          categoryId: '52895bf5-23f0-421b-a53d-534154d3cc68',
          categoryName: 'Fast Food',
          items: [
            {
              menuId: '52895bf5-bd38-4a36-a69b-61a56b302fb5',
              itemName: 'Chilli Potato',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc68',
            },
            {
              menuId: '52895bf5-4875-40e9-9a45-a1795a1d8f78',
              itemName: 'FriedRice',
              price: 500,
              availability: true,
              imagePath: 'string',
              categoryId: '52895bf5-23f0-421b-a53d-534154d3cc68',
            },
          ],
        },
      ];
      this.categoryService.setCategories(this.categories);
      this.selectedCategory = this.categories[0];
      this.categoryService.setSelectedCategories(this.selectedCategory);
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
