import { Http, HttpResponse } from '@nativescript/core';
import { Product, AddProductResponse } from '../models/product';

export class ApiService {
  private static readonly BASE_URL = 'https://app.getswipe.in/api/public';

  static async getProducts(): Promise<Product[]> {
    try {
      const response = await Http.getJSON<Product[]>(`${this.BASE_URL}/get`);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async addProduct(formData: FormData): Promise<AddProductResponse> {
    try {
      const response = await Http.request({
        url: `${this.BASE_URL}/add`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        content: formData
      });
      return response.content.toJSON();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
}