import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../service/OrderData/order-data.service';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css',
})
export class EmptyCartComponent {
  constructor(
    private router: Router,
    private orderDataService: OrderDataService
  ) {}
  navigateToHomePage() {
    this.orderDataService.setOrderPlacement();
    this.router.navigate(['/home']);
  }
}
