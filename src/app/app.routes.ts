import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebSocketService } from './service/WebSocket/websocket.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryMenuService } from './service/CategoryMenu/categorymenu.service';
import { CategoryListComponent } from './Category/category-list/category-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
];

@NgModule({
  declarations: [
    // Any other components in your app
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes), // Importing RouterModule with routes
    CategoryListComponent,
  ],
  providers: [
    WebSocketService, // Provide the WebSocket service
    CategoryMenuService,
  ],
  bootstrap: [], // Main component to bootstrap the app
})
export class AppModule {}
