import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css',
})
export class EmptyCartComponent {
  constructor(private router: Router) {}
  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
}
