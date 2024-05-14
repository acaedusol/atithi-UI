import { ChangeDetectorRef, Component, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryMenuService } from '../service/CategoryMenu/categorymenu.service';
import { Category, CategoryItems, MenuItem } from '../Models/Category';
import { OrderDataService } from '../service/OrderData/order-data.service';
import { OrderItem } from '../Models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../service/LocalStorage/localstorage.service';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categories: Category[] = []; // Array to hold fetched categories
  selectedCategory: Category | undefined;
  orderItems: OrderItem[] = [];
  isOrderPlaced: boolean = false;
  roomId: string | null = '';
  orderId: string = '';
  roomErrorText: boolean = false;
  eventSource: EventSource | null = null; // Declare eventSource outside of the function scope
  timer: any;

  constructor(
    private categoryService: CategoryMenuService,
    private orderDataService: OrderDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: LocalStorageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setRoomNumberInLocalStorage();

    if (this.categoryService.getCategories().length === 0) {
      this.categoryService.getAllCategoryMenu().subscribe((data) => {
        this.categoryService.setCategories(data);
      });
    }

    this.categoryService.category$.subscribe((data) => {
      this.categories = data;
    });

    var orderDetails = this.storageService.getObject('OrderDetails');
    if (orderDetails?.length == 0) {
      this.orderItems = [];
    } else {
      this.orderItems = orderDetails['OrderItems'];
    }
    this.updateOrderItems();
    this.orderDataService.isOrderPlaced$.subscribe((source) => {
      var order = localStorage.getItem('OrderId+RoomId');
      if (order != null) {
        this.isOrderPlaced = true;
        var parsedData = JSON.parse(order);
        this.orderId = parsedData.OrderId;
        var roomIdfromStorage = parsedData.RoomId;
        if (this.roomId != roomIdfromStorage) {
          localStorage.clear();
          localStorage.setItem('OrderId+RoomId', order);
        }
      } else {
        this.isOrderPlaced = source;
      }
    });

    this.setOrderStatus();

    this.timer = setInterval(() => {
      this.setOrderStatus();
    }, 5 * 60 * 1000); // Check every 5 seconds (adjust as needed)
  }

  ngOnDestroy(): void {
    // Clear the timer when the component is destroyed
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private setRoomNumberInLocalStorage() {
    var roomNumber = this.storageService.getItem('RoomId');
    var params = this.activatedRoute.snapshot.paramMap.get('roomId');
    if (params != null && params != roomNumber) {
      roomNumber = null;
    }
    if (roomNumber === null) {
      this.roomId = params; // when param is null, open a popup to getdetails
      this.storageService.setItem('RoomId', this.roomId);
    } else {
      this.roomId = roomNumber;
      this.router.navigate(['/home/' + this.roomId]);
    }
    this.orderDataService.setRoomId(Number(this.roomId));
  }

  // Set the selected category
  selectCategory(category: Category): void {
    this.selectedCategory = category; // Update the selected category
  }

  // Get menu items for the selected category
  getMenuItemsForSelectedCategory(): MenuItem[] {
    return this.categoryService.getMenuItems();
  }

  getAllCategory(): CategoryItems[] {
    var categoryItems: CategoryItems[] = [];
    this.categoryService.categoryItem$.subscribe((data) => {
      categoryItems = data;
    });
    return categoryItems;
  }

  updateOrderItems(): void {
    this.orderDataService.setOrderItems(this.orderItems);
  }

  selectItem(item: MenuItem): void {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase the quantity
    } else {
      // Add the item with a quantity of 1
      this.orderItems.push({ menuItemId: item.menuId, quantity: 1 });
    }
    this.updateOrderItems();
  }

  // Increase the quantity of an order item
  increaseItem(item: MenuItem): void {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increase by 1
    }
    this.updateOrderItems();
  }

  // Reduce the quantity of an order item
  reduceItem(item: MenuItem): void {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1; // Decrease by 1
    } else if (existingItem && existingItem.quantity === 1) {
      this.orderItems = this.orderItems.filter(
        (orderItem) => orderItem.menuItemId !== item.menuId
      ); // Remove the item if quantity is 0
    }
    this.updateOrderItems();
  }

  // Determine whether the "Add" button should be shown
  showAddButton(item: MenuItem): boolean {
    return !this.orderItems.some(
      (orderItem) => orderItem.menuItemId === item.menuId
    );
  }

  // Determine whether the "+" and "-" buttons should be shown
  showIncrementDecrementButtons(item: MenuItem): boolean {
    return !this.showAddButton(item); // Shown when "Add" is not shown
  }

  getItemQuantity(item: MenuItem): number {
    const existingItem = this.orderItems.find(
      (orderItem) => orderItem.menuItemId === item.menuId
    );

    return existingItem ? existingItem.quantity : 0; // Return 0 if not found
  }
  onCategoryClick(item: CategoryItems) {
    var selectedCategoryValue = this.categories.filter(
      (data) => data.categoryId === item.categoryId
    );
    this.categoryService.setSelectedCategories(selectedCategoryValue[0]);
    this.router.navigate(['/item-list']);
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault(); // Prevents default scrolling behavior
    const container = event.currentTarget as HTMLElement;
    container.scrollLeft += event.deltaY; // Adjust scrolling speed as needed
  }

  setOrderStatus() {
    if (this.orderId != '') {
      if (this.eventSource) {
        this.eventSource.close();
      }
      // Create EventSource connection
      this.eventSource = new EventSource(
        `https://atithiweb20240510221117.azurewebsites.net/send/${this.orderId}/${this.roomId}`
      );

      this.eventSource.onmessage = (event) => {
        const item = JSON.parse(event.data);
        if (item != null && item != 'data: ' && item != 'data: null') {
          this.orderDataService.setOrderPlacement(false);
          localStorage.removeItem('OrderId+RoomId');
          this.isOrderPlaced = false;
          this.orderId = '';
          this.orderDataService.setOrderId('');
          this.cd.detectChanges();
        } else {
          this.orderDataService.setOrderPlacement(true);
        }
      };
    }
  }
}
