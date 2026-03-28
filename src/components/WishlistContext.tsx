"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { Product } from "@/lib/data";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

const STORAGE_KEY = "ss-furniture-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isInWishlist = useCallback((id: number) => {
    return items.some((item) => item.id === id);
  }, [items]);

  const toggleItem = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  }, [isInWishlist, addItem, removeItem]);

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{ items, addItem, removeItem, isInWishlist, toggleItem, clearWishlist, itemCount: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
