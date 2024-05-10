// src/app/services/order-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../../../Models/Order';

@Injectable({
  providedIn: 'root', // Available globally
})
export class OrderDataService {
  // Use a BehaviorSubject to hold the orderItems data
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);

  // Observable that components can subscribe to
  orderItems$ = this.orderItemsSubject.asObservable();

  // Method to update the orderItems data
  setOrderItems(orderItems: OrderItem[]): void {
    this.orderItemsSubject.next(orderItems);
  }

  // Method to get the current orderItems data
  getOrderItems(): OrderItem[] {
    return this.orderItemsSubject.value;
  }
}
