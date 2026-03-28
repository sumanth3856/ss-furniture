"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeleton";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuickViewModal from "@/components/QuickViewModal";
import { products, categories } from "@/lib/data";
import type { Product } from "@/lib/data";

type SortOption = "featured" | "price-low" | "price-high" | "name";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000]);
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const handleCategoryChange = useCallback((category: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchQuery(value);
      setIsLoading(false);
    }, 300);
  }, []);

  const clearFilters = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory("All");
      setSearchQuery("");
      setSortBy("featured");
      setPriceRange([0, 250000]);
      setIsLoading(false);
    }, 300);
  }, []);

  const hasActiveFilters = selectedCategory !== "All" || searchQuery !== "" || sortBy !== "featured" || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="min-h-screen">
      <section className="py-8 px-6 bg-gradient-to-b from-[#FAFAFA] to-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-6"
          >
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
              Our Collection
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-3">
              All Products
            </h1>
            <p className="text-base text-[#6B6B6B] max-w-xl mx-auto">
              Discover our curated collection of premium furniture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 mt-6"
          >
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-10 py-2.5 rounded-full border border-black/10 bg-white focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                  aria-label="Search products"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-[#6B6B6B]" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setSortBy(e.target.value as SortOption);
                      setIsLoading(false);
                    }, 300);
                  }}
                  className="px-4 py-2.5 rounded-full border border-black/10 bg-white focus:outline-none focus:border-[#C9A96E] transition-colors cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`md:hidden px-4 py-2.5 rounded-full border transition-colors ${
                    showFilters
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                      : "border-black/10"
                  }`}
                  aria-expanded={showFilters}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#6B6B6B] shrink-0 hidden md:block" aria-hidden="true" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                    selectedCategory === category
                      ? "bg-[#1A1A1A] text-white shadow-md"
                      : "bg-white text-[#6B6B6B] border border-black/10 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="p-4 bg-white rounded-2xl border border-black/5 mt-4">
                    <h3 className="font-semibold text-[#1A1A1A] mb-3">Price Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="250000"
                        step="5000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-[#C9A96E]"
                        aria-label="Maximum price"
                      />
                      <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
                        <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                        <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hidden md:block p-4 bg-white rounded-2xl border border-black/5">
              <h3 className="font-semibold text-[#1A1A1A] mb-3">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="250000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#C9A96E]"
                  aria-label="Maximum price"
                />
                <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
                  <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                  <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center"
              >
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#C9A96E] hover:text-[#B8956A] transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#6B6B6B]" role="status" aria-live="polite">
              {isLoading ? (
                "Filtering..."
              ) : (
                <>
                  Showing <span className="font-medium text-[#1A1A1A]">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? "s" : ""}
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </>
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </motion.div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    onDoubleClick={() => setQuickViewProduct(product)}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
                role="status"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#C9A96E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                  No products found
                </h3>
                <p className="text-[#6B6B6B] max-w-md mx-auto mb-6">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
            Can't Decide?
          </h2>
          <p className="text-base text-white/70 mb-6">
            Our design consultants are here to help you find the perfect pieces.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#1A1A1A] font-medium rounded-full hover:bg-[#D4B87A] transition-colors duration-300"
          >
            Get Expert Advice
          </a>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
