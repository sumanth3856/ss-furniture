"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Check, Loader2, Eye, XCircle, Bell, TrendingDown } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./Toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  
  const { addItem, items: cartItems } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const isInCart = cartItems.some((item) => item.product_id === product.id);
  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.in_stock === false;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || isInCart || isOutOfStock) return;
    
    setIsAdding(true);
    
    try {
      await addItem(product);
      showToast(`${product.name} added to cart`, "success");
    } catch {
      showToast("Failed to add to cart", "error");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await toggleItem(product);
      showToast(
        isLiked ? "Removed from wishlist" : "Added to wishlist",
        "info"
      );
    } catch {
      showToast("Failed to update wishlist", "error");
    }
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setNotifySubmitted(true);
    showToast("We'll notify you when this product is back in stock!", "success");
    setTimeout(() => {
      setShowNotifyModal(false);
      setNotifySubmitted(false);
      setNotifyEmail("");
    }, 2000);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: isOutOfStock ? 0 : -4 }}
        className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-[#C9A96E] focus-within:ring-offset-2 ${
          isOutOfStock ? "ring-2 ring-gray-200" : ""
        }`}
      >
        <a href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } ${isOutOfStock ? "grayscale opacity-60" : ""}`}
              onLoad={() => setImageLoaded(true)}
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                  <p className="text-sm font-semibold text-gray-900">Out of Stock</p>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleLike}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] z-20 ${
                isLiked 
                  ? "bg-red-500 text-white shadow-red-200" 
                  : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-lg"
              }`}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 transition-all ${isLiked ? "fill-current text-white" : "text-gray-400 group-hover:text-red-500"}`} />
            </motion.button>

            <AnimatePresence>
              {isLiked && !isOutOfStock && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-4 left-4 px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full z-20"
                >
                  <Heart className="w-3 h-3 inline fill-current mr-1" />
                  Saved
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
                  View Details
                </span>
                <Eye className="w-4 h-4 text-white/80" />
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-wider">
                {product.category}
              </span>
              
              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                  <XCircle className="w-3 h-3" />
                  Unavailable
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-600 bg-green-50 rounded-full">
                  <Check className="w-3 h-3" />
                  In Stock
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-[#1A1A1A] font-serif line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-2 text-sm text-[#6B6B6B] line-clamp-2">
              {product.description}
            </p>
            
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-xl font-bold text-[#1A1A1A] whitespace-nowrap">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {isOutOfStock && (
                  <p className="text-xs text-red-500 mt-0.5">Currently unavailable</p>
                )}
              </div>
              
              {isOutOfStock ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowNotifyModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  Notify Me
                </button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isAdding || isInCart}
                  className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 overflow-hidden ${
                    isInCart
                      ? "bg-green-500 text-white"
                      : "bg-[#1A1A1A] text-white hover:bg-[#2C2C2C] hover:shadow-lg"
                  } disabled:cursor-default`}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Adding...
                      </motion.span>
                    ) : isInCart ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </div>
          </div>
        </a>
      </motion.article>

      <AnimatePresence>
        {showNotifyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowNotifyModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Get Notified</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your email to be notified when &quot;{product.name}&quot; is back in stock.
                  </p>
                </div>

                {notifySubmitted ? (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                    >
                      <Check className="w-6 h-6 text-green-500" />
                    </motion.div>
                    <p className="text-green-600 font-medium">You&apos;ll be notified!</p>
                  </div>
                ) : (
                  <form onSubmit={handleNotifySubmit}>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent outline-none mb-3"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowNotifyModal(false)}
                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-[#C9A96E] text-white font-medium rounded-xl hover:bg-[#B8956A] transition-colors"
                      >
                        Notify Me
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
