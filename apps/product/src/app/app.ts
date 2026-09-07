import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Badge, DataTable, TableColumn } from '@retailhub/shared-ui';
import { Category, Product, ProductStatus } from '@retailhub/shared-models';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, Badge, DataTable],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly isLoading = signal<boolean>(true);

  // Filter signals
  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('');
  readonly selectedStatus = signal<string>('');

  readonly columns: TableColumn[] = [
    { key: 'sku', label: 'SKU', width: '130px' },
    { key: 'name', label: 'Product Name' },
    { key: 'category.name', label: 'Category', width: '150px' },
    { key: 'price', label: 'Price', width: '120px', align: 'right' },
    { key: 'stock', label: 'Stock Level', width: '110px', align: 'center' },
    { key: 'status', label: 'Status', width: '130px', align: 'center' },
  ];

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Failed to load categories:', err),
    });
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService
      .getProducts({
        search: this.searchTerm() || undefined,
        category: this.selectedCategory() || undefined,
        status: (this.selectedStatus() as ProductStatus) || undefined,
      })
      .subscribe({
        next: (data) => {
          this.products.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load products:', err);
          this.isLoading.set(false);
        },
      });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.loadProducts();
  }

  onCategorySelect(categorySlug: string): void {
    this.selectedCategory.set(categorySlug);
    this.loadProducts();
  }

  onStatusSelect(status: string): void {
    this.selectedStatus.set(status);
    this.loadProducts();
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.selectedStatus.set('');
    this.loadProducts();
  }

  statusVariant(status: ProductStatus): 'success' | 'warning' | 'neutral' {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'DRAFT':
        return 'warning';
      case 'ARCHIVED':
      default:
        return 'neutral';
    }
  }
}
