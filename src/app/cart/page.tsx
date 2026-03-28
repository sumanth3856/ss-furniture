"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, RefreshCw, Loader2, Heart, Sparkles } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useToast } from "@/components/Toast";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount, isLoading } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { showToast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [savingToWishlistId, setSavingToWishlistId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    showToast("Redirecting to checkout...", "info");
    setIsCheckingOut(false);
  };

  const handleRemove = async (id: string, name: string) => {
    setShowDeleteConfirm(null);
    setRemovingId(id);
    try {
      await removeItem(id);
      showToast(`${name} removed from cart`, "info");
    } finally {
      setRemovingId(null);
    }
  };

  const handleSaveForLater = async (item: typeof items[0]) => {
    setSavingToWishlistId(item.id);
    try {
      await addToWishlist(item.products);
      await removeItem(item.id);
      showToast(`${item.products.name} saved to wishlist`, "success");
    } catch {
      showToast("Failed to save item", "error");
    } finally {
      setSavingToWishlistId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-[#C9A96E]" />
        </motion.div>
      </div>
    );
  }

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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center"
            >
              <ShoppingBag className="w-12 h-12 text-[#C9A96E]" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              Looks like you haven't added any items to your cart yet. Start exploring our collection to find something you love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-all hover:shadow-lg"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const freeDeliveryThreshold = 15000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

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

      {remainingForFreeDelivery > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-6 max-w-7xl mx-auto"
        >
          <div className="bg-[#C9A96E]/10 border border-[#C9A96E]/20 rounded-xl p-4 text-center">
            <p className="text-sm text-[#1A1A1A]">
              Add ₹{remainingForFreeDelivery.toLocaleString("en-IN")} more for <span className="font-semibold">FREE delivery!</span>
            </p>
            <div className="mt-2 h-2 bg-[#C9A96E]/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                className="h-full bg-[#C9A96E] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => {
                  const product = item.products;
                  const isRemoving = removingId === item.id;
                  const isSaving = savingToWishlistId === item.id;
                  const showConfirm = showDeleteConfirm === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="flex p-4 gap-4">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                          {item.quantity > 1 && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#1A1A1A] text-white text-xs font-medium rounded-full">
                              x{item.quantity}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-wider">
                              {product.category}
                            </span>
                            <Link
                              href={`/products/${product.id}`}
                              className="block font-semibold text-[#1A1A1A] hover:text-[#C9A96E] transition-colors mt-1 truncate"
                            >
                              {product.name}
                            </Link>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-black/10 rounded-full bg-gray-50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-100 rounded-l-full transition-colors disabled:opacity-50"
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
                                ₹{(product.price * item.quantity).toLocaleString("en-IN")}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-[#6B6B6B]">
                                  ₹{product.price.toLocaleString("en-IN")} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => setShowDeleteConfirm(item.id)}
                            disabled={isRemoving || isSaving}
                            className="p-2 text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="More options"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {showConfirm && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-black/5 bg-gray-50/50 overflow-hidden"
                          >
                            <div className="p-4 flex items-center justify-between gap-4">
                              <p className="text-sm text-[#6B6B6B]">Remove or save for later?</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveForLater(item)}
                                  disabled={isSaving}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#6B6B6B] hover:text-[#C9A96E] hover:bg-[#C9A96E]/10 rounded-full transition-colors disabled:opacity-50"
                                >
                                  {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Heart className="w-4 h-4" />
                                  )}
                                  Save
                                </button>
                                <button
                                  onClick={() => handleRemove(item.id, product.name)}
                                  disabled={isRemoving}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                >
                                  {isRemoving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between pt-6 border-t border-black/5"
              >
                <button
                  onClick={() => clearCart()}
                  className="text-sm text-[#6B6B6B] hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
                <Link
                  href="/products"
                  className="text-sm font-medium text-[#C9A96E] hover:text-[#B8956A] transition-colors flex items-center gap-1"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-white rounded-2xl border border-black/5 shadow-sm p-6"
              >
                <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Delivery</span>
                    <span className={remainingForFreeDelivery > 0 ? "line-through" : "text-green-600 font-medium"}>
                      {remainingForFreeDelivery > 0 ? "₹999" : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6B6B6B]">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-black/10 pt-4">
                    <div className="flex justify-between text-lg font-bold text-[#1A1A1A]">
                      <span>Total</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
