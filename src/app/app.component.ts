import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  showHeader = false;
  showFooter = false;
  componentName = '';
  showCart = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Reset scroll position on navigation end
      }
      if (event instanceof NavigationEnd) {
        // List of routes where the header should be hidden
        const routesWithHeader = ['/home'];
        this.showHeader = routesWithHeader.includes(this.router.url);
        const routesWithFooter = ['/home', '/item-list'];
        this.showFooter = routesWithFooter.includes(this.router.url);
        this.showCart = false;
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
            this.componentName = 'Order Confirmation';
        }
      }
    });
  }
}
