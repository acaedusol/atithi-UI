import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:roomId', component: HomeComponent },
  { path: 'item-list', component: CategoryComponent },
  { path: 'confirm', component: OrderConfirmationComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'empty', component: EmptyCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
