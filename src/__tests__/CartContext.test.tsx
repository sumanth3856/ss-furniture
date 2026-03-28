import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CartProvider, useCart } from "@/components/CartContext";
import { ToastProvider } from "@/components/Toast";
import { Product } from "@/lib/data";

jest.mock("@/lib/api", () => ({
  api: {
    cart: {
      get: jest.fn().mockResolvedValue({ items: [] }),
      add: jest.fn().mockResolvedValue({ id: "test-id", product_id: 1, quantity: 1 }),
      update: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue({}),
      clear: jest.fn().mockResolvedValue({}),
    },
  },
}));

const createMockProduct = (id: number): Product => ({
  id,
  name: `Test Product ${id}`,
  description: "Test Description",
  price: 999 + id,
  category: "Sofas",
  image: "/test.jpg",
});

function TestCartComponent({ product }: { product: Product }) {
  const { items, addItem, itemCount, subtotal, isLoading, isHydrated } = useCart();
  
  return (
    <div>
      <span data-testid="item-count">{itemCount}</span>
      <span data-testid="subtotal">{subtotal}</span>
      <span data-testid="items-length">{items.length}</span>
      <span data-testid="is-loading">{isLoading ? "true" : "false"}</span>
      <span data-testid="is-hydrated">{isHydrated ? "true" : "false"}</span>
      <button onClick={() => addItem(product)}>Add Item</button>
    </div>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(
        <ToastProvider>
          <TestCartComponent product={createMockProduct(1)} />
        </ToastProvider>
      );
    }).toThrow("useCart must be used within a CartProvider");
    
    consoleError.mockRestore();
  });

  it("should initialize with loading state", async () => {
    render(
      <ToastProvider>
        <CartProvider>
          <TestCartComponent product={createMockProduct(1)} />
        </CartProvider>
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("is-hydrated")).toHaveTextContent("true");
    });
  });

  it("should show loading initially", async () => {
    render(
      <ToastProvider>
        <CartProvider>
          <TestCartComponent product={createMockProduct(1)} />
        </CartProvider>
      </ToastProvider>
    );

    expect(screen.getByTestId("is-loading")).toHaveTextContent("true");
  });
});
