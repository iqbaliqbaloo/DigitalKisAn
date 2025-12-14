// src/types/product.types.ts
export interface ProductInputType {
  _id?: string; // optional
  name: string;
  category: string;
  price: number | string;
  quantity: number | string;
  description: string;
  imageUri?: string | null;
}
