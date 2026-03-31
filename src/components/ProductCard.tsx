"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Check, Loader2, Eye, XCircle, Bell, ArrowRight } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  
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
        transition={{ duration: 0.5, delay: index * 0.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 focus-within:ring-2 focus-within:ring-[#C9A96E] focus-within:ring-offset-2 ${
          isOutOfStock ? "ring-2 ring-gray-200" : ""
        }`}
      >
        <a href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
            {!imageLoaded && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } ${isOutOfStock ? "grayscale opacity-60" : ""} ${
                isHovered && !isOutOfStock ? "scale-110" : "scale-100"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {isOutOfStock && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl text-center shadow-xl"
                >
                  <XCircle className="w-7 h-7 text-red-500 mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-gray-900">Out of Stock</p>
                </motion.div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleLike}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] z-20 ${
                isLiked 
                  ? "bg-red-500 text-white shadow-red-200/50" 
                  : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-xl"
              }`}
              aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 transition-all ${isLiked ? "fill-current text-white" : "text-gray-400 group-hover:text-red-500"}`} />
            </motion.button>

            <AnimatePresence>
              {isLiked && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-medium rounded-full z-20 shadow-lg"
                >
                  <Heart className="w-3 h-3 inline fill-current mr-1" />
                  Saved
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered && !isOutOfStock ? 1 : 0, y: isHovered && !isOutOfStock ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/products/${product.id}`;
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-white/95 backdrop-blur-md rounded-xl text-sm font-semibold text-[#1A1A1A] hover:bg-white transition-colors shadow-lg"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <motion.span 
                className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider"
                layoutId={`category-${product.id}`}
              >
                {product.category}
              </motion.span>
              
              {isOutOfStock ? (
                <motion.span 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full"
                >
                  <XCircle className="w-3 h-3" />
                  Unavailable
                </motion.span>
              ) : (
                <motion.span 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full"
                >
                  <Check className="w-3 h-3" />
                  In Stock
                </motion.span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-[#1A1A1A] font-serif line-clamp-1 group-hover:text-[#C9A96E] transition-colors">
              {product.name}
            </h3>
            <p className="mt-2 text-sm text-[#6B6B6B] line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-xl font-bold text-[#1A1A1A] whitespace-nowrap">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {isOutOfStock && (
                    <p className="text-xs text-red-500 mt-0.5">Currently unavailable</p>
                  )}
                </div>
                
                {isOutOfStock ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowNotifyModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    Notify Me
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    disabled={isAdding || isInCart}
                    className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 overflow-hidden ${
                      isInCart
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5"
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowNotifyModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C9A96E]/10 to-transparent rounded-bl-full" />
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowNotifyModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-400" />
                </motion.button>

                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Bell className="w-8 h-8 text-red-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get Notified</h3>
                  <p className="text-sm text-gray-500">
                    Enter your email to be notified when <span className="font-medium text-gray-700">&quot;{product.name}&quot;</span> is back in stock.
                  </p>
                </div>

                {notifySubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <p className="text-green-600 font-semibold text-lg">You&apos;ll be notified!</p>
                    <p className="text-sm text-gray-500 mt-1">We&apos;ll email you as soon as this item is back.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNotifySubmit} className="space-y-4">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowNotifyModal(false)}
                        className="flex-1 px-4 py-3 border-2 border-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A96E]/20 transition-all"
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
