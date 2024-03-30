import { API_BASE_URL } from "api";
import { IApiResponse } from "types";

export const login = async (email: string, password: string): Promise<IApiResponse<string>> => {
  try {
    const body = {
      email,
      password,
    };
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const { token, error } = await response.json();

    return {
      data: token,
      error,
    };
  } catch (e) {
    return {
      error: e,
    }
  }
}

export const verify = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "get",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.ok
  } catch (e) {
    console.error(e);
    return false;
  }
}