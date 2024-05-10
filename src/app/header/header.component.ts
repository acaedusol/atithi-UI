import { Component } from '@angular/core';
import { OrderItem } from '../Models/Order';
import { OrderDataService } from '../service/OrderData/order-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  constructor(private orderDataService: OrderDataService) {}

  ngOnInit(): void {
    this.orderDataService.orderItems$.subscribe((order) => {
      this.orderItems = order;
      this.cartCount = this.orderItems.length; // Update cart count
    });
  }
}
