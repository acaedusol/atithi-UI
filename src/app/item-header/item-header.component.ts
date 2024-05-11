import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';

@Component({
  selector: 'app-item-header',
  templateUrl: './item-header.component.html',
  styleUrl: './item-header.component.css',
})
export class ItemHeaderComponent {
  showCart = true;
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  componentName: string = '';
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // List of routes where the header should be hidden
        const urlParts = this.router.url.split('/');
        const lastIndex = urlParts[urlParts.length - 1];
        switch (lastIndex) {
          case 'item-list':
            this.componentName = 'Item List';
            this.showCart = true;
            break;
          case 'empty':
            this.componentName = 'Cart';
            break;
          case 'checkout':
            this.componentName = 'Checkout';
            break;
          default:
            console.log('');
            this.componentName = 'Order Confirmation';
        }
      }
    });
  }

  backButtonClicked() {
    try {
      this.location.back(); // Navigate back
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
