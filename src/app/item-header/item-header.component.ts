import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';

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
    private orderDataService: OrderDataService
  ) {}

  ngOnInit() {
    this.orderDataService.orderItems$.subscribe((order) => {
      this.orderItems = order;
      this.cartCount = this.orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Update cart count
    });
  }

  backButtonClicked() {
    try {
      const urlParts = this.router.url.split('/');
      const lastIndex = urlParts[urlParts.length - 1];
      if (
        this.orderDataService.getOrderItems().length === 0 ||
        lastIndex === 'confirm'
      ) {
        this.orderDataService.setOrderPlacement();
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
