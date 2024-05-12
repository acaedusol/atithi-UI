import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';
import { LocalStorageService } from '../service/LocalStorage/localstorage.service';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrl: './item-header.component.css',
})
export class ItemHeaderComponent {
  @Input() showCart = true;
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  @Input() componentName: string = '';
  constructor(
    private location: Location,
    private router: Router,
    private orderDataService: OrderDataService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit() {
    var orderDetails = this.storageService.getObject('OrderDetails');
    if (orderDetails?.length == 0) {
      this.orderDataService.orderItems$.subscribe((order) => {
        this.orderItems = order;
        this.cartCount = this.orderItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      });
    } else {
      this.orderItems = orderDetails['OrderItems'];
      this.cartCount = this.orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      this.updateOrderItems();
    }
  }

  updateOrderItems(): void {
    this.orderDataService.setOrderItems(this.orderItems);
  }

  backButtonClicked() {
    try {
      const urlParts = this.router.url.split('/');
      const lastIndex = urlParts[urlParts.length - 1];
      if (this.orderDataService.getOrderItems().length === 0) {
        this.orderDataService.setOrderPlacement(false);
        this.router.navigate(['/home']);
      } else if (lastIndex === 'confirm') {
        this.orderDataService.setOrderPlacement(true);
        this.router.navigate(['/home']);
      } else {
        this.location.back(); // Navigate back
      }
    } catch (error) {
      this.router.navigate(['/home']); // Fallback navigation
    }
  }
  proceedCheckOut() {
    if (this.cartCount === 0) {
      this.router.navigate(['empty']);
    } else {
      this.router.navigate(['checkout']);
    }
  }
}
