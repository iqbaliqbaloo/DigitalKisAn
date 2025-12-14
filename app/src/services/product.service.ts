// src/services/product.service.ts
import { Platform } from "react-native";
import { ProductInputType } from "../types/product.types";



const BASE_API = Platform.select({
  android: "http://10.0.2.2:5000", // Android emulator
  ios: "http://localhost:5000",    // iOS simulator
  default: "http://10.109.20.92:5000", // Real device / LAN
});

const PRODUCTS_URL = `${BASE_API}/api/products`;


// Add Product
export const addProductService = async (product: ProductInputType) => {
  try {
    const payload = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity),
    };

    const response = await fetch(PRODUCTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to add product");
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message || "Network request failed");
  }
};

// Get Products
export const getProductsService = async (): Promise<ProductInputType[]> => {
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to fetch products");
    }

    const data: ProductInputType[] = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message || "Network request failed");
  }
};
