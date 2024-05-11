import { Component } from '@angular/core';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';
import { CategoryMenuService } from '../service/CategoryMenu/categorymenu.service';
import { MenuItem } from '../Models/Category';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  menuItems: MenuItem[] = [];
  constructor(
    private orderDataService: OrderDataService,
    private categoryService: CategoryMenuService
  ) {}

  ngOnInit(): void {
    this.orderDataService.orderItems$.subscribe((order) => {
      this.orderItems = order;
      this.cartCount = this.orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Update cart count
    });
    this.categoryService.menuItem$.subscribe((item) => {
      this.menuItems = item;
    });

    console.log()
  }
}
