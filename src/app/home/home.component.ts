import { Component } from '@angular/core';
import { CategoryListComponent } from '../Category/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CategoryListComponent],
})
export class HomeComponent {}
