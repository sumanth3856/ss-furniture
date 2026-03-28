"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/Toast";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const { showToast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    showToast("Redirecting to checkout...", "info");
    setIsCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="py-12 px-6 bg-gradient-to-b from-[#FAFAFA] to-white border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
          </div>
        </section>
        <section className="py-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#C9A96E]/10 flex items-center justify-center"
            >
              <ShoppingBag className="w-10 h-10 text-[#C9A96E]" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              Looks like you haven't added any items to your cart yet. Start exploring our collection to find something you love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="py-12 px-6 bg-gradient-to-b from-[#FAFAFA] to-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              Shopping Cart
            </h1>
            <p className="text-[#6B6B6B] mt-2">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-black/5 shadow-sm"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <Link
                        href={`/products/${item.id}`}
                        className="block font-semibold text-[#1A1A1A] hover:text-[#C9A96E] transition-colors mt-1"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-black/10 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#1A1A1A]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-[#6B6B6B]">
                            ₹{item.price.toLocaleString()} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.id);
                      showToast(`${item.name} removed from cart`, "info");
                    }}
                    className="p-2 text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => {
                    clearCart();
                    showToast("Cart cleared", "info");
                  }}
                  className="text-sm text-[#6B6B6B] hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  href="/products"
                  className="text-sm font-medium text-[#C9A96E] hover:text-[#B8956A] transition-colors flex items-center gap-1"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-black/5 shadow-sm p-6">
                <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="flex justify-between text-lg font-bold text-[#1A1A1A]">
                      <span>Total</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="mt-6 pt-6 border-t border-black/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
                    <Truck className="w-4 h-4 text-[#C9A96E]" />
                    <span>Free delivery on orders above ₹15,000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
                    <Shield className="w-4 h-4 text-[#C9A96E]" />
                    <span>10-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
                    <RefreshCw className="w-4 h-4 text-[#C9A96E]" />
                    <span>30-day hassle-free returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
