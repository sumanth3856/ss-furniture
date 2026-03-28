import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { WishlistProvider, useWishlist } from "@/components/WishlistContext";
import { ToastProvider } from "@/components/Toast";
import { Product } from "@/lib/data";

jest.mock("@/lib/api", () => ({
  api: {
    wishlist: {
      get: jest.fn().mockResolvedValue({ items: [] }),
      add: jest.fn().mockResolvedValue({ id: "test-id", product_id: 1 }),
      remove: jest.fn().mockResolvedValue({}),
    },
  },
}));

const createMockProduct = (id: number): Product => ({
  id,
  name: `Test Product ${id}`,
  description: "Test Description",
  price: 999,
  category: "Sofas",
  image: "/test.jpg",
});

function TestWishlistComponent({ product }: { product: Product }) {
  const { items, addItem, isInWishlist, itemCount, isLoading, isHydrated } = useWishlist();
  
  return (
    <div>
      <span data-testid="item-count">{itemCount}</span>
      <span data-testid="items-length">{items.length}</span>
      <span data-testid="is-in-wishlist">{isInWishlist(product.id) ? "true" : "false"}</span>
      <span data-testid="is-loading">{isLoading ? "true" : "false"}</span>
      <span data-testid="is-hydrated">{isHydrated ? "true" : "false"}</span>
      <button onClick={() => addItem(product)}>Add Item</button>
    </div>
  );
}

describe("WishlistContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(
        <ToastProvider>
          <TestWishlistComponent product={createMockProduct(1)} />
        </ToastProvider>
      );
    }).toThrow("useWishlist must be used within a WishlistProvider");
    
    consoleError.mockRestore();
  });

  it("should initialize with loading state", async () => {
    render(
      <ToastProvider>
        <WishlistProvider>
          <TestWishlistComponent product={createMockProduct(1)} />
        </WishlistProvider>
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("is-hydrated")).toHaveTextContent("true");
    });
  });

  it("should show loading initially", async () => {
    render(
      <ToastProvider>
        <WishlistProvider>
          <TestWishlistComponent product={createMockProduct(1)} />
        </WishlistProvider>
      </ToastProvider>
    );

    expect(screen.getByTestId("is-loading")).toHaveTextContent("true");
  });
});
