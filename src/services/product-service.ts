
import type { Product } from '@/lib/types';
import { PRODUCTS_TO_SEED } from '@/lib/products';

// This service now returns dummy data instead of fetching from Firebase.
let products: Product[] = [...PRODUCTS_TO_SEED];

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    // Return a copy to prevent mutation
    return Promise.resolve([...products]);
  }

  static async getProductById(id: string): Promise<Product | null> {
    const product = products.find(p => p.id === id) || null;
    return Promise.resolve(product);
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const product = products.find(p => p.slug === slug) || null;
    return Promise.resolve(product);
  }

  static async createProduct(productData: Omit<Product, 'id'>): Promise<string> {
    const newProduct: Product = {
      ...productData,
      id: `prod-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`,
    };
    products.push(newProduct);
    console.log("New product added:", newProduct);
    return Promise.resolve(newProduct.id);
  }

  static async updateProduct(id: string, productData: Partial<Omit<Product, 'id'>>): Promise<void> {
    products = products.map(p => p.id === id ? { ...p, ...productData } as Product : p);
    console.log("Product updated:", id, productData);
    return Promise.resolve();
  }

  static async deleteProduct(id: string): Promise<void> {
    products = products.filter(p => p.id !== id);
    console.log("Product deleted:", id);
    return Promise.resolve();
  }
}
