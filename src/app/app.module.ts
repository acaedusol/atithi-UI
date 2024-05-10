import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryMenuService } from './service/CategoryMenu/categorymenu.service';
import { CategoryComponent } from './category/category.component';
import { CommonModule } from '@angular/common';
import { OrderDataService } from './service/OrderData/order-data.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, CategoryComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [OrderDataService, CategoryMenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
