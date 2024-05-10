import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CategoryMenuService } from './Service/CategoryMenu/categorymenu.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, CategoryComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [CategoryMenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
