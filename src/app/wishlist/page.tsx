"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, X, ArrowRight } from "lucide-react";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/Toast";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
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
              <Heart className="w-10 h-10 text-[#C9A96E]" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-[#6B6B6B] mb-8">
              Save your favorite furniture pieces here. Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors"
            >
              Browse Products
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
            className="mt-8 flex items-end justify-between"
          >
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                My Wishlist
              </h1>
              <p className="text-[#6B6B6B] mt-2">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={() => {
                  clearWishlist();
                  showToast("Wishlist cleared", "info");
                }}
                className="text-sm text-[#6B6B6B] hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <button
                    onClick={() => {
                      removeItem(item.id);
                      showToast(`${item.name} removed from wishlist`, "info");
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:text-red-500 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-[#1A1A1A] mt-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] mt-1 line-clamp-2 h-10">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-[#1A1A1A]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1A1A1A] text-white rounded-full hover:bg-[#2C2C2C] transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">
            Continue Shopping
          </h2>
          <p className="text-[#6B6B6B] mb-6">
            Discover more premium furniture for your home
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors"
          >
            Browse All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
