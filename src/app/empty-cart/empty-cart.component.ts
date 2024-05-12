import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { LocalStorageService } from '../service/LocalStorage/localstorage.service';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css',
})
export class EmptyCartComponent {
  roomId: string | null = '';
  constructor(
    private router: Router,
    private orderDataService: OrderDataService,
    private storageService: LocalStorageService
  ) {}
  ngOnInit() {
    var roomNumber = this.storageService.getItem('RoomId');
    if (roomNumber === null) {
      this.router.navigate(['/home']);
    } else {
      this.roomId = roomNumber;
    }
  }
  navigateToHomePage() {
    this.orderDataService.setOrderPlacement(false);
    this.router.navigate(['/home']);
  }
}
