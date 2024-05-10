// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Category, CategoryItems, MenuItem } from '../../../Models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryMenuService {
  private categorySubject = new BehaviorSubject<Category[]>([]);
  category$ = this.categorySubject.asObservable();

  private categoryItemSubject = new BehaviorSubject<CategoryItems[]>([]);
  categoryItem$ = this.categoryItemSubject.asObservable();

  private menuItemSubject = new BehaviorSubject<MenuItem[]>([]);
  menuItem$ = this.menuItemSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCategoryMenu(): Observable<Category[]> {
    return this.http.get<Category[]>(
      environment.apiUrl + 'category/categorymenu'
    );
  }

  setCategories(categories: Category[]): void {
    this.categorySubject.next(categories);

    this.categoryItemSubject.next(
      this.categorySubject.value.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName,
      }))
    );

    this.menuItemSubject.next(
      this.categorySubject.value.flatMap((category) => category.items)
    );
  }

  // Method to get the current orderItems data
  getCategories(): Category[] {
    return this.categorySubject.value;
  }

  getCategoryItems(): CategoryItems[] {
    return this.categoryItemSubject.value;
  }

  getMenuItems(): MenuItem[] {
    return this.menuItemSubject.value;
  }
}
