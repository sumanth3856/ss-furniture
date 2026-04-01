"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, RefreshCw, Loader2, Heart } from "lucide-react";
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
    if (!item.products) return;
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-900"
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumbs />
          </div>
        </section>
        <section className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center shadow-xl shadow-amber-500/10"
            >
              <ShoppingBag className="w-14 h-14 text-amber-500" />
            </motion.div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-600">Your Selection</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Looks like you haven&apos;t added any items to your cart yet. Start exploring our collection to find something you love.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    );
  }

  const freeDeliveryThreshold = 15000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryFee = remainingForFreeDelivery > 0 ? 999 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </section>

      {/* FREE DELIVERY PROGRESS */}
      {remainingForFreeDelivery > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 sm:mx-6 lg:mx-8"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium opacity-90">Add ₹{remainingForFreeDelivery.toLocaleString("en-IN")} more for</p>
                <p className="text-lg font-bold">FREE delivery!</p>
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* PAGE HEADER */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-lg shadow-gray-900/20">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-1">
                <ShoppingBag className="w-3 h-3 text-amber-600" />
                <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">Cart</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-500">
                {itemCount} {itemCount === 1 ? "item" : "items"} · <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.filter((item) => item.products).map((item, index) => {
                  const product = item.products;
                  if (!product) return null;
                  const isRemoving = removingId === item.id;
                  const isSaving = savingToWishlistId === item.id;
                  const showConfirm = showDeleteConfirm === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex p-4 gap-4">
                        {/* Image */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                          {item.quantity > 1 && (
                            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                              x{item.quantity}
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              {product.category}
                            </span>
                            <Link
                              href={`/products/${product.id}`}
                              className="block font-bold text-gray-900 hover:text-gray-600 transition-colors mt-0.5 truncate text-lg"
                            >
                              {product.name}
                            </Link>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-50 rounded-full p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-semibold text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <p className="font-bold text-gray-900 text-lg">
                                ₹{(product.price * item.quantity).toLocaleString("en-IN")}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-400">
                                  ₹{product.price.toLocaleString("en-IN")} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          disabled={isRemoving || isSaving}
                          className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors self-start"
                          aria-label="More options"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Expandable Actions */}
                      <AnimatePresence>
                        {showConfirm && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-100 bg-gray-50/50 overflow-hidden"
                          >
                            <div className="p-4 flex items-center justify-between gap-4">
                              <p className="text-sm text-gray-500">Remove or save for later?</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveForLater(item)}
                                  disabled={isSaving}
                                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-full border border-gray-200 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 transition-all disabled:opacity-50"
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
                                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
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

              {/* Bottom Actions */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between pt-4"
              >
                <button
                  onClick={() => clearCart()}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
                <Link
                  href="/products"
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-1"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* ORDER SUMMARY - Sticky on Desktop */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg p-6 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-serif text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>
                
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className={remainingForFreeDelivery > 0 ? "line-through text-gray-400" : "text-green-600 font-medium"}>
                      {remainingForFreeDelivery > 0 ? "₹999" : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="text-green-600 font-medium">Included</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-gray-900/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-gray-900" />
                    </div>
                    <span>Free delivery on orders above ₹15,000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-900" />
                    </div>
                    <span>10-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-gray-900" />
                    </div>
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
