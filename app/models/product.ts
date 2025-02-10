export interface Product {
  image: string;
  price: number;
  product_name: string;
  product_type: string;
  tax: number;
}

export interface AddProductResponse {
  message: string;
  product_details: Product;
  product_id: number;
  success: boolean;
}

export const DEFAULT_PRODUCT_IMAGE = "https://via.placeholder.com/200x200.png?text=No+Image";