import { getDeviceId } from "./deviceId";
import type { Product } from "./data";

const API_BASE = "/api";

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (typeof window === "undefined") {
    throw new Error("API calls can only be made on the client");
  }

  let deviceId = "";
  try {
    deviceId = getDeviceId();
  } catch {
    deviceId = "";
  }
  
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  
  if (deviceId) {
    headers.set("x-device-id", deviceId);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface ProductsResponse {
  data: Product[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface CartItem {
  id: string;
  product_id: number;
  quantity: number;
  products?: Product;
}

interface WishlistItem {
  id: string;
  product_id: number;
  products?: Product;
}

export const api = {
  products: {
    getAll: async (params?: { category?: string; search?: string; page?: number; limit?: number }): Promise<ProductsResponse> => {
      try {
        const query = new URLSearchParams();
        if (params?.category && params.category !== "All") query.set("category", params.category);
        if (params?.search) query.set("search", params.search);
        if (params?.page) query.set("page", params.page.toString());
        if (params?.limit) query.set("limit", params.limit.toString());
        const queryString = query.toString();
        return await fetchApi<ProductsResponse>(`/products${queryString ? `?${queryString}` : ""}`);
      } catch (error) {
        console.warn("Failed to fetch products:", error);
        return { data: [] };
      }
    },
    getById: async (id: number): Promise<Product | null> => {
      try {
        return await fetchApi<Product>(`/products/${id}`);
      } catch {
        return null;
      }
    },
  },

  cart: {
    get: async (): Promise<{ items: CartItem[] }> => {
      try {
        return await fetchApi<{ items: CartItem[] }>("/cart");
      } catch {
        return { items: [] };
      }
    },
    add: async (productId: number, quantity = 1): Promise<void> => {
      await fetchApi("/cart", {
        method: "POST",
        body: JSON.stringify({ product_id: productId, quantity }),
      });
    },
    update: async (id: string, quantity: number): Promise<void> => {
      await fetchApi("/cart", {
        method: "PUT",
        body: JSON.stringify({ id, quantity }),
      });
    },
    remove: async (id: string): Promise<void> => {
      await fetchApi(`/cart?id=${id}`, { method: "DELETE" });
    },
    clear: async (): Promise<void> => {
      await fetchApi("/cart", { method: "DELETE" });
    },
  },

  wishlist: {
    get: async (): Promise<{ items: WishlistItem[] }> => {
      try {
        return await fetchApi<{ items: WishlistItem[] }>("/wishlist");
      } catch {
        return { items: [] };
      }
    },
    add: async (productId: number): Promise<void> => {
      await fetchApi("/wishlist", {
        method: "POST",
        body: JSON.stringify({ product_id: productId }),
      });
    },
    remove: async (id?: string, productId?: number): Promise<void> => {
      const query = id ? `id=${id}` : productId ? `product_id=${productId}` : "";
      await fetchApi(`/wishlist${query ? `?${query}` : ""}`, {
        method: "DELETE",
      });
    },
  },
};
