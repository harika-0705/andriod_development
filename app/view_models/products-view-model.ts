import { Observable, ObservableArray, Page } from '@nativescript/core';
import { Product, DEFAULT_PRODUCT_IMAGE } from '../models/product';
import { ApiService } from '../services/api.service';

export class ProductsViewModel extends Observable {
  private _products: ObservableArray<Product>;
  private _isLoading: boolean;
  private _searchQuery: string;
  private _page: Page;
  private _loadingImages: Set<string>;

  constructor() {
    super();
    this._products = new ObservableArray<Product>();
    this._isLoading = false;
    this._searchQuery = '';
    this._loadingImages = new Set();
    this.loadProducts();
  }

  get page(): Page {
    return this._page;
  }

  set page(value: Page) {
    this._page = value;
  }

  get products(): ObservableArray<Product> {
    return this._products;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    if (this._isLoading !== value) {
      this._isLoading = value;
      this.notifyPropertyChange('isLoading', value);
    }
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

  set searchQuery(value: string) {
    if (this._searchQuery !== value) {
      this._searchQuery = value;
      this.notifyPropertyChange('searchQuery', value);
      this.filterProducts();
    }
  }

  isImageLoading(imageUrl: string): boolean {
    return this._loadingImages.has(imageUrl);
  }

  onImageLoaded(args: any) {
    const imageUrl = args.object.src;
    this._loadingImages.delete(imageUrl);
    this.notifyPropertyChange('isImageLoading', imageUrl);
  }

  async loadProducts() {
    try {
      this.isLoading = true;
      const products = await ApiService.getProducts();
      this._products.length = 0;
      
      products.forEach(product => {
        // Set default image if URL is empty or invalid
        if (!product.image || product.image.trim() === '') {
          product.image = DEFAULT_PRODUCT_IMAGE;
        } else {
          // Add image to loading set
          this._loadingImages.add(product.image);
        }
        this._products.push(product);
      });
    } catch (error) {
      console.error('Error loading products:', error);
      // In case of error, show empty state with default images
      this._products.length = 0;
    } finally {
      this.isLoading = false;
    }
  }

  private filterProducts() {
    if (!this._searchQuery) {
      this.loadProducts();
      return;
    }

    const query = this._searchQuery.toLowerCase();
    const filteredProducts = this._products.filter(product => 
      product.product_name.toLowerCase().includes(query) ||
      product.product_type.toLowerCase().includes(query)
    );
    
    this._products.length = 0;
    this._products.push(...filteredProducts);
  }
}