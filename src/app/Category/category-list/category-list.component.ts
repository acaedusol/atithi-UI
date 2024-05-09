// src/app/components/category-list/category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Category, MenuItem } from '../../../Models/Category';
import { CategoryMenuService } from '../../service/CategoryMenu/categorymenu.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryMenuService],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = []; // Array to hold fetched categories
  selectedCategory: Category | undefined;

  constructor(private categoryService: CategoryMenuService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategoryMenu().subscribe((data) => {
      this.categories = data; // Assign fetched data to the array
      this.selectedCategory = this.categories[0];
    });
  }

  // Set the selected category
  selectCategory(category: Category): void {
    this.selectedCategory = category; // Update the selected category
  }

  // Get menu items for the selected category
  getMenuItemsForSelectedCategory(): MenuItem[] {
    return this.selectedCategory ? this.selectedCategory.items : [];
  }
}
