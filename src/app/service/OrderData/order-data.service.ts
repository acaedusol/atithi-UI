// src/app/services/order-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderItem } from '../../Models/Order';
import { LocalStorageService } from '../LocalStorage/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root', // Available globally
})
export class OrderDataService {
  constructor(private http: HttpClient) {}

  private storageService = new LocalStorageService();
  // Use a BehaviorSubject to hold the orderItems data
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);

  // Observable that components can subscribe to
  orderItems$ = this.orderItemsSubject.asObservable();

  private roomIdSubject = new BehaviorSubject<number>(0);
  roomId$ = this.roomIdSubject.asObservable();

  // Use a BehaviorSubject to hold the orderItems data
  private isOrderPlacedSubject = new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  isOrderPlaced$ = this.isOrderPlacedSubject.asObservable();

  // Method to update the orderItems data
  setOrderItems(orderItems: OrderItem[]): void {
    var orderDetails = {
      RoomId: this.roomIdSubject.value,
      OrderItems: orderItems,
    };
    localStorage.removeItem('OrderDetails');
    if (orderItems != null) {
      this.storageService.setObject('OrderDetails', orderDetails);
    }
    this.orderItemsSubject.next(orderItems);
  }

  // Method to get the current orderItems data
  getOrderItems(): OrderItem[] {
    return this.orderItemsSubject.value;
  }

  setOrderPlacement(isOrderPlaced: boolean) {
    localStorage.removeItem('OrderDetails');
    localStorage.setItem('PlaceOrder', 'true');
    this.isOrderPlacedSubject.next(isOrderPlaced);
    this.orderItemsSubject.next([]);
  }

  setRoomId(roomId: number) {
    this.roomIdSubject.next(roomId);
  }

  placeOrder(roomId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });

    const requestBody = {
      roomId: roomId,
      orderItems: this.getOrderItems(),
    };

    return this.http.post<string>(
      environment.apiUrl + 'order/placeOrder',
      requestBody,
      { headers }
    );
  }
}
