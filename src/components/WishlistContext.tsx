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

interface WishlistItem {
  id: string;
  product_id: number;
  products?: Product;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  toggleItem: (product: Product) => Promise<void>;
  clearWishlist: () => Promise<void>;
  itemCount: number;
  isLoading: boolean;
  isHydrated: boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshWishlist = useCallback(async () => {
    try {
      const { items: wishlistItems } = await api.wishlist.get();
      setItems(wishlistItems || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initWishlist = async () => {
      await refreshWishlist();
      setIsHydrated(true);
    };
    initWishlist();
  }, [refreshWishlist]);

  const addItem = useCallback(
    async (product: Product) => {
      try {
        await api.wishlist.add(product.id);
        await refreshWishlist();
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
        throw error;
      }
    },
    [refreshWishlist]
  );

  const removeItem = useCallback(async (productId: number) => {
    try {
      await api.wishlist.remove(undefined, productId);
      setItems((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      throw error;
    }
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => {
      return items.some((item) => item.product_id === productId);
    },
    [items]
  );

  const toggleItem = useCallback(
    async (product: Product) => {
      if (isInWishlist(product.id)) {
        await removeItem(product.id);
      } else {
        await addItem(product);
      }
    },
    [isInWishlist, removeItem, addItem]
  );

  const clearWishlist = useCallback(async () => {
    try {
      for (const item of items) {
        await api.wishlist.remove(item.id);
      }
      setItems([]);
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
      throw error;
    }
  }, [items]);

  const itemCount = useMemo(() => items.length, [items]);

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      isInWishlist,
      toggleItem,
      clearWishlist,
      itemCount,
      isLoading,
      isHydrated,
      refreshWishlist,
    }),
    [items, addItem, removeItem, isInWishlist, toggleItem, clearWishlist, itemCount, isLoading, isHydrated, refreshWishlist]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}
