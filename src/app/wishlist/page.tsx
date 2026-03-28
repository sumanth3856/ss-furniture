"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, X, ArrowRight, Loader2, Check, Trash2, Plus, Minus, MoveRight } from "lucide-react";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/Toast";
import Breadcrumbs from "@/components/Breadcrumbs";

interface WishlistItemType {
  id: string;
  product_id: number;
  products: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  };
}

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, isLoading, refreshWishlist } = useWishlist();
  const { addItem: addToCart, items: cartItems } = useCart();
  const { showToast } = useToast();
  
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showQuantityModal, setShowQuantityModal] = useState<string | null>(null);
  const [movingAllToCart, setMovingAllToCart] = useState(false);

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = async (item: WishlistItemType) => {
    const quantity = getQuantity(item.id);
    setAddingToCartId(item.id);
    setShowQuantityModal(null);
    
    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(item.products);
      }
      await removeItem(item.product_id);
      showToast(`${item.products.name} moved to cart`, "success");
    } catch {
      showToast("Failed to add to cart", "error");
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleQuickAddToCart = async (item: WishlistItemType) => {
    setAddingToCartId(item.id);
    try {
      await addToCart(item.products);
      await removeItem(item.product_id);
      showToast(`${item.products.name} moved to cart`, "success");
    } catch {
      showToast("Failed to add to cart", "error");
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleRemove = async (item: WishlistItemType) => {
    setRemovingId(item.id);
    try {
      await removeItem(item.product_id);
      showToast(`${item.products.name} removed from wishlist`, "info");
    } catch {
      showToast("Failed to remove", "error");
    } finally {
      setRemovingId(null);
    }
  };

  const handleMoveAllToCart = async () => {
    if (movingAllToCart || items.length === 0) return;
    
    setMovingAllToCart(true);
    let addedCount = 0;
    
    for (const item of items) {
      try {
        await addToCart(item.products);
        await removeItem(item.product_id);
        addedCount++;
      } catch {
        // Continue with other items
      }
    }
    
    if (addedCount > 0) {
      showToast(`${addedCount} items moved to cart`, "success");
    }
    setMovingAllToCart(false);
  };

  const isInCart = (productId: number) => cartItems.some((item) => item.product_id === productId);

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
              <Heart className="w-12 h-12 text-[#C9A96E]" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              Save your favorite furniture pieces here. Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-all hover:shadow-lg"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const totalValue = items.reduce((sum, item) => sum + item.products.price, 0);

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
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                  My Wishlist
                </h1>
                <p className="text-[#6B6B6B] mt-2">
                  {items.length} {items.length === 1 ? "item" : "items"} · Total value: ₹{totalValue.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMoveAllToCart}
                  disabled={movingAllToCart || items.length === 0}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A96E] text-white font-medium rounded-full hover:bg-[#B8956A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {movingAllToCart ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MoveRight className="w-4 h-4" />
                  )}
                  Move All to Cart
                </button>
                <button
                  onClick={() => {
                    clearWishlist();
                    showToast("Wishlist cleared", "info");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#6B6B6B] hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => {
                const product = item.products;
                const inCart = isInCart(product.id);
                const isAdding = addingToCartId === item.id;
                const isRemoving = removingId === item.id;
                const showModal = showQuantityModal === item.id;
                const quantity = getQuantity(item.id);

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <button
                        onClick={() => handleRemove(item)}
                        disabled={isRemoving || isAdding}
                        className="absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:text-red-500 transition-all transform hover:scale-110 disabled:opacity-50 z-10"
                        aria-label="Remove from wishlist"
                      >
                        {isRemoving ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </button>

                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Link
                          href={`/products/${product.id}`}
                          className="block w-full py-2 text-center text-sm font-medium text-white bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-[#1A1A1A] mt-1 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#6B6B6B] mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-[#1A1A1A]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        
                        {inCart ? (
                          <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-full">
                            <Check className="w-4 h-4" />
                            In Cart
                          </div>
                        ) : showModal ? (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1"
                          >
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                              disabled={quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(item)}
                              disabled={isAdding}
                              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#C9A96E] text-white rounded-full hover:bg-[#B8956A] transition-colors disabled:opacity-50"
                            >
                              {isAdding ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <>
                                  <ShoppingCart className="w-3 h-3" />
                                  Add
                                </>
                              )}
                            </button>
                          </motion.div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuickAddToCart(item)}
                              disabled={isAdding}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-[#1A1A1A] text-white rounded-full hover:bg-[#2C2C2C] transition-all disabled:opacity-50"
                            >
                              {isAdding ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4" />
                                  Add
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => setShowQuantityModal(item.id)}
                              className="p-2 text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                              aria-label="Select quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-white to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              Continue Shopping
            </h2>
            <p className="text-[#6B6B6B] mb-6">
              Discover more premium furniture for your home
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-all hover:shadow-lg"
            >
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
