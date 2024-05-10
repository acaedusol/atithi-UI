import { Component } from '@angular/core';
import { OrderItem } from '../Models/Order';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  orderItems: OrderItem[] = [];
  cartCount: number = 0;
  constructor(
    private orderDataService: OrderDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderDataService.orderItems$.subscribe((order) => {
      this.orderItems = order;
      this.cartCount = this.orderItems.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Update cart count
    });
  }
  proceedCheckOut() {
    if (this.cartCount === 0) {
      this.router.navigate(['empty']);
    } else {
      this.router.navigate(['checkout']);
    }
  }
}
