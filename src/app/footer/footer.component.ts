import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
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
