"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart, Star } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./Toast";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem: addToCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [product, onClose]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    showToast(
      isWishlisted ? "Removed from favorites" : "Added to favorites",
      "info"
    );
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
              aria-label="Close quick view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col">
                <span className="text-sm font-medium text-[#C9A96E] uppercase tracking-wider mb-2">
                  {product.category}
                </span>
                
                <h2 id="quick-view-title" className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? "text-[#C9A96E] fill-[#C9A96E]" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#6B6B6B]">(128 reviews)</span>
                </div>

                <p className="text-2xl font-bold text-[#1A1A1A] mb-4">
                  ${product.price.toLocaleString()}
                </p>

                <p className="text-[#6B6B6B] leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`p-3 rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                      isWishlisted
                        ? "border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10"
                        : "border-black/10 hover:border-[#1A1A1A]"
                    }`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="mt-4 text-center text-sm text-[#C9A96E] hover:text-[#B8956A] transition-colors font-medium"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
