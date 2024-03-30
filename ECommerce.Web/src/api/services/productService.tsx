import { API_BASE_URL } from "api"
import { error } from "console";
import { IApiResponse, IProduct } from "types";

export const getProducts = async (): Promise<IApiResponse<IProduct[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw 'Failed to fetch';
    }

    const data = await response.json();
    return {
      data,
    };
  } catch (e) {
    return {
      error: e,
    }
  }
}

export const getProductById = async (id: number | string): Promise<IApiResponse<IProduct>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw 'Failed to fetch';
    }

    const data = await response.json();
    return {
      data,
    };
  } catch (e) {
    return {
      error: e,
    }
  }
}

export const createProduct = async (formData: FormData): Promise<IApiResponse<IProduct>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/create`, {
      method: "POST",
      body: formData,
    });
    debugger;

    if (!response.ok) {
      const error = await response.text();
      return {
        error,
      }
    }
    
    const data = await response.json();

    return {
      data,
    };
  } catch (e) {
    return {
      error: e,
    }
  }
}