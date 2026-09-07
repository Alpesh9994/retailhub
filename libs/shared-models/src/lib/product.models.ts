export type ProductStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    products: number;
  };
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  price: number | string;
  stock: number;
  status: ProductStatus;
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilterQuery {
  search?: string;
  status?: ProductStatus;
  category?: string;
}

export interface CreateProductPayload {
  sku: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  status?: ProductStatus;
  categoryId: number;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  status?: ProductStatus;
  categoryId?: number;
}
