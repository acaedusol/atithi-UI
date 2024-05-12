export interface OrderItem {
  menuItemId: string; // Unique identifier for the menu item
  quantity: number; // Quantity of the item ordered
}

export interface Order {
  roomId: number; // Room identifier
  orderItems: OrderItem[]; // List of order items
}

export interface StorageObject {
  data: Object;
  expiryTime: number;
}
