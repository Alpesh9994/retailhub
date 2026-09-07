import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product, ProductFilterQuery } from '@retailhub/shared-models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/products';

  getProducts(query?: ProductFilterQuery): Observable<Product[]> {
    let params = new HttpParams();

    if (query?.search) {
      params = params.set('search', query.search);
    }
    if (query?.category) {
      params = params.set('category', query.category);
    }
    if (query?.status) {
      params = params.set('status', query.status);
    }

    return this.http.get<Product[]>(this.apiUrl, {
      params,
      withCredentials: true,
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, {
      withCredentials: true,
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
