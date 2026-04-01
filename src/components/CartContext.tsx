"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { Product } from "@/lib/data";
import { api } from "@/lib/api";

interface CartItem {
  id: string;
  product_id: number;
  quantity: number;
  products?: Product;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  isHydrated: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = useCallback(async () => {
    try {
      const { items: cartItems } = await api.cart.get();
      setItems(cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initCart = async () => {
      await refreshCart();
      setIsHydrated(true);
    };
    initCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (product: Product, quantity = 1) => {
      try {
        await api.cart.add(product.id, quantity);
        await refreshCart();
      } catch (error) {
        console.error("Failed to add to cart:", error);
        throw error;
      }
    },
    [refreshCart]
  );

  const removeItem = useCallback(async (id: string) => {
    try {
      await api.cart.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    }
  }, []);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await api.cart.update(id, quantity);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      throw error;
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      await api.cart.clear();
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.products?.price || 0) * item.quantity, 0),
    [items]
  );

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      isLoading,
      isHydrated,
      refreshCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isLoading, isHydrated, refreshCart]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
