// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Category } from '../../../Models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryMenuService {

  constructor(private http: HttpClient) {}

  getAllCategoryMenu(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + 'category/categorymenu');
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + 'category/categorymenu');
  }
}
