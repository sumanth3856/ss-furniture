import { getDeviceId } from "./deviceId";

const API_BASE = "/api";

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const deviceId = typeof window !== "undefined" ? getDeviceId() : "";
  
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  
  if (deviceId) {
    headers.set("x-device-id", deviceId);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.message !== "Request failed") {
      console.error(`API Error [${endpoint}]:`, error);
    }
    throw error;
  }
}

export const api = {
  products: {
    getAll: async (params?: { category?: string; search?: string }): Promise<any[]> => {
      try {
        const query = new URLSearchParams();
        if (params?.category && params.category !== "All") query.set("category", params.category);
        if (params?.search) query.set("search", params.search);
        const queryString = query.toString();
        return await fetchApi<any[]>(`/products${queryString ? `?${queryString}` : ""}`);
      } catch {
        return [];
      }
    },
    getById: async (id: number): Promise<any | null> => {
      try {
        return await fetchApi<any>(`/products/${id}`);
      } catch {
        return null;
      }
    },
  },

  cart: {
    get: async (): Promise<{ items: any[] }> => {
      try {
        return await fetchApi<{ items: any[] }>("/cart");
      } catch {
        return { items: [] };
      }
    },
    add: async (productId: number, quantity = 1): Promise<any> => {
      return await fetchApi<any>("/cart", {
        method: "POST",
        body: JSON.stringify({ product_id: productId, quantity }),
      });
    },
    update: async (id: string, quantity: number): Promise<any> => {
      return await fetchApi<any>("/cart", {
        method: "PUT",
        body: JSON.stringify({ id, quantity }),
      });
    },
    remove: async (id: string): Promise<any> => {
      return await fetchApi<any>(`/cart?id=${id}`, { method: "DELETE" });
    },
    clear: async (): Promise<any> => {
      return await fetchApi<any>("/cart", { method: "DELETE" });
    },
  },

  wishlist: {
    get: async (): Promise<{ items: any[] }> => {
      try {
        return await fetchApi<{ items: any[] }>("/wishlist");
      } catch {
        return { items: [] };
      }
    },
    add: async (productId: number): Promise<any> => {
      return await fetchApi<any>("/wishlist", {
        method: "POST",
        body: JSON.stringify({ product_id: productId }),
      });
    },
    remove: async (id?: string, productId?: number): Promise<any> => {
      const query = id ? `id=${id}` : productId ? `product_id=${productId}` : "";
      return await fetchApi<any>(`/wishlist${query ? `?${query}` : ""}`, {
        method: "DELETE",
      });
    },
  },
};
