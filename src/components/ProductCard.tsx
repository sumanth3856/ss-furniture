"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { useToast } from "./Toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { showToast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdding || isAdded) return;
    
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAdding(false);
    setIsAdded(true);
    showToast(`${product.name} added to cart`, "success");
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    showToast(
      isLiked ? "Removed from favorites" : "Added to favorites",
      "info"
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 focus-within:ring-2 focus-within:ring-[#C9A96E] focus-within:ring-offset-2"
    >
      <a href={`/products#${product.id}`} className="block">
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
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          <button
            onClick={handleToggleLike}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-[#C9A96E] text-[#C9A96E]" : "text-[#6B6B6B]"
              }`}
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
              View Details
            </span>
          </div>
        </div>

        <div className="p-5">
          <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-[#1A1A1A] font-serif">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-[#6B6B6B] line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-[#1A1A1A]">
              ${product.price.toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isAdding || isAdded}
              className={`group/btn relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 disabled:cursor-not-allowed ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "text-[#1A1A1A] border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              }`}
              aria-label={
                isAdded ? "Added to cart" : isAdding ? "Adding to cart" : "Add to cart"
              }
            >
              <span className={`flex items-center gap-2 ${isAdded ? "opacity-0" : "opacity-100"}`}>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </span>
              {isAdding && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              )}
              {isAdded && (
                <span className="absolute inset-0 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Added!
                </span>
              )}
            </button>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
