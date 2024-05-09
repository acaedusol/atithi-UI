// src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: WebSocket | undefined;
  private messageSubject = new Subject<string>(); // Observable for WebSocket messages

  public message$ = this.messageSubject.asObservable(); // Expose the observable to components

  constructor() {
    this.connect(); // Establish the WebSocket connection
  }

  private connect() {
    const webSocketUrl = 'ws://localhost:44328/ws/orders'; // Change as needed

    this.webSocket = new WebSocket(webSocketUrl);

    this.webSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.webSocket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      this.messageSubject.next(event.data); // Emit the received message
    };

    this.webSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.webSocket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
  }

  // Optional: method to send messages
  public sendMessage(message: string) {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(message);
    }
  }
}
