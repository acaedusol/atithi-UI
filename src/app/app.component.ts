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
        this.showHeader = false;
        this.showCart = false;
        this.componentName = '';
        var location = this.router.url.split('/')[1];

        // List of routes where the header should be hidden
        const routesWithHeader = ['home'];
        this.showHeader = routesWithHeader.includes(location);
        const routesWithFooter = ['home', 'item-list'];
        this.showFooter = routesWithFooter.includes(location);

        if (['item-list'].includes(location)) {
          this.componentName = 'Item List';
          this.showCart = true;
        } else if (['empty'].includes(location)) {
          this.componentName = 'Cart';
        } else if (['checkout'].includes(location)) {
          this.componentName = 'Checkout';
        } else if (['confirm'].includes(location)) {
          this.componentName = 'Order Confirmation';
        }
      }
    });
  }
}
