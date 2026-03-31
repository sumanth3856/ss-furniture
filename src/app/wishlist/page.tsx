"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, X, ArrowRight, Loader2, Check, Trash2, Plus, Minus, MoveRight, Sparkles, Package } from "lucide-react";
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
  const { items, removeItem, clearWishlist, isLoading } = useWishlist();
  const { addItem: addToCart, items: cartItems } = useCart();
  const { showToast } = useToast();
  
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showQuantityModal, setShowQuantityModal] = useState<string | null>(null);
  const [movingAllToCart, setMovingAllToCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

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
      setSelectedItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
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
      setSelectedItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
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
      setSelectedItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
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
    
    setSelectedItems(new Set());
    if (addedCount > 0) {
      showToast(`${addedCount} items moved to cart`, "success");
    }
    setMovingAllToCart(false);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  const isInCart = (productId: number) => cartItems.some((item) => item.product_id === productId);
  const totalValue = items.reduce((sum, item) => sum + item.products.price, 0);
  const selectedTotal = items
    .filter(item => selectedItems.has(item.id))
    .reduce((sum, item) => sum + item.products.price, 0);

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
              className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center shadow-xl shadow-rose-500/10"
            >
              <Heart className="w-14 h-14 text-rose-400" />
            </motion.div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 rounded-full mb-4">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-semibold text-rose-600">Your Favorites</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Save your favorite furniture pieces here. Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </section>

      {/* PAGE HEADER */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 rounded-full mb-3">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Saved Items</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                  My Wishlist
                </h1>
              </div>
              <p className="text-gray-500">
                {items.length} {items.length === 1 ? "item" : "items"} · Total value: <span className="font-semibold text-gray-900">₹{totalValue.toLocaleString("en-IN")}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={selectAll}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  selectedItems.size === items.length ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
                }`}>
                  {selectedItems.size === items.length && <Check className="w-3 h-3 text-white" />}
                </div>
                Select All
              </button>
              <button
                onClick={handleMoveAllToCart}
                disabled={movingAllToCart || selectedItems.size === 0}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {movingAllToCart ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MoveRight className="w-4 h-4" />
                )}
                Move to Cart {selectedItems.size > 0 && `(${selectedItems.size})`}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SELECTED ITEMS BAR (Mobile) */}
      <AnimatePresence>
        {selectedItems.size > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="sm:hidden fixed bottom-24 left-4 right-4 z-[60]"
          >
            <div className="bg-gray-900 text-white rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">{selectedItems.size} selected</span>
                <span className="font-bold">₹{selectedTotal.toLocaleString("en-IN")}</span>
              </div>
              <button
                onClick={handleMoveAllToCart}
                disabled={movingAllToCart}
                className="w-full py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                {movingAllToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <MoveRight className="w-5 h-5" />}
                Move All to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCTS GRID */}
      <section className="pb-24 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => {
                const product = item.products;
                const inCart = isInCart(product.id);
                const isAdding = addingToCartId === item.id;
                const isRemoving = removingId === item.id;
                const showModal = showQuantityModal === item.id;
                const quantity = getQuantity(item.id);
                const isSelected = selectedItems.has(item.id);

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      isSelected ? 'border-gray-900 shadow-xl shadow-gray-900/10' : 'border-transparent shadow-lg shadow-gray-900/5 hover:shadow-xl'
                    }`}
                  >
                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleSelectItem(item.id)}
                      className="absolute top-3 left-3 z-10 w-7 h-7 rounded-lg bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all hover:scale-110"
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item)}
                        disabled={isRemoving || isAdding}
                        className="absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:text-red-500 transition-all transform hover:scale-110 disabled:opacity-50 z-10"
                        aria-label="Remove from wishlist"
                      >
                        {isRemoving ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                            <Loader2 className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </button>

                      {/* In Cart Badge */}
                      {inCart && (
                        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                          <Check className="w-3 h-3" />
                          In Cart
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-1 line-clamp-1 text-lg">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[2.5rem]">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        
                        {inCart ? (
                          <Link
                            href="/cart"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            View Cart
                          </Link>
                        ) : showModal ? (
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1"
                          >
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                              disabled={quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-semibold">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(item)}
                              disabled={isAdding}
                              className="ml-1 p-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
                            >
                              {isAdding ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                            </button>
                          </motion.div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleQuickAddToCart(item)}
                              disabled={isAdding}
                              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:shadow-lg hover:shadow-gray-900/30 transition-all disabled:opacity-50"
                            >
                              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                              Add
                            </button>
                            <button
                              onClick={() => setShowQuantityModal(item.id)}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
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

      {/* CTA SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              <Package className="w-7 h-7 text-gray-400" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Continue Shopping
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Discover more premium furniture for your home
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all"
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
