import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  orderItems: OrderItem[] = [];
  cartCount: Number = 0;
  constructor(private orderDataService: OrderDataService) {}

  ngOnInit(): void {
    this.orderDataService.orderItems$.subscribe((order) => {
      this.orderItems = order;
      this.cartCount = this.orderItems.length; // Update cart count
    });
  }
}
