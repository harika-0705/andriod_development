import { Observable } from '@nativescript/core';
import { ApiService } from '../services/api.service';

export class AddProductViewModel extends Observable {
  private _productName: string = '';
  private _productType: string = '';
  private _price: string = '';
  private _tax: string = '';
  private _image: string = '';
  private _isLoading: boolean = false;

  get productName(): string {
    return this._productName;
  }

  set productName(value: string) {
    if (this._productName !== value) {
      this._productName = value;
      this.notifyPropertyChange('productName', value);
    }
  }

  get productType(): string {
    return this._productType;
  }

  set productType(value: string) {
    if (this._productType !== value) {
      this._productType = value;
      this.notifyPropertyChange('productType', value);
    }
  }

  get price(): string {
    return this._price;
  }

  set price(value: string) {
    if (this._price !== value) {
      this._price = value;
      this.notifyPropertyChange('price', value);
    }
  }

  get tax(): string {
    return this._tax;
  }

  set tax(value: string) {
    if (this._tax !== value) {
      this._tax = value;
      this.notifyPropertyChange('tax', value);
    }
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    if (this._image !== value) {
      this._image = value;
      this.notifyPropertyChange('image', value);
    }
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

  async addProduct(): Promise<boolean> {
    if (!this.validateForm()) {
      return false;
    }

    const formData = new FormData();
    formData.append('product_name', this._productName);
    formData.append('product_type', this._productType);
    formData.append('price', this._price);
    formData.append('tax', this._tax);
    if (this._image) {
      formData.append('image', this._image);
    }

    try {
      this.isLoading = true;
      const response = await ApiService.addProduct(formData);
      return response.success;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    if (!this._productName || !this._productType || !this._price || !this._tax) {
      return false;
    }

    const price = parseFloat(this._price);
    const tax = parseFloat(this._tax);

    if (isNaN(price) || price <= 0 || isNaN(tax) || tax < 0 || tax > 100) {
      return false;
    }

    return true;
  }

  reset() {
    this.productName = '';
    this.productType = '';
    this.price = '';
    this.tax = '';
    this.image = '';
  }
}