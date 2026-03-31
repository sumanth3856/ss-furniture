"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronLeft, ChevronRight, Grid3X3, Grid2X2, MessageCircle, ArrowUpDown, Check, Command, SlidersHorizontal, Zap, ArrowRight, RotateCcw, LayoutGrid, TrendingUp, ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/Skeleton";
import Breadcrumbs from "@/components/Breadcrumbs";
import QuickViewModal from "@/components/QuickViewModal";
import { api, ProductsResponse } from "@/lib/api";
import { products as staticProducts, type Product } from "@/lib/data";

type SortOption = "featured" | "price-low" | "price-high" | "name";
type GridSize = 2 | 3 | 4;

const categories = [
  { id: "All", label: "All", icon: "✨" },
  { id: "Sofas", label: "Sofas", icon: "🛋️" },
  { id: "Tables", label: "Tables", icon: "🪑" },
  { id: "Chairs", label: "Chairs", icon: "💺" },
  { id: "Bedroom", label: "Bedroom", icon: "🛏️" },
  { id: "Lighting", label: "Lighting", icon: "💡" },
];

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
  { value: "featured" as SortOption, label: "Featured", icon: TrendingUp },
  { value: "price-low" as SortOption, label: "Price: Low to High", icon: ArrowDown },
  { value: "price-high" as SortOption, label: "Price: High to Low", icon: ArrowUp },
  { value: "name" as SortOption, label: "Name: A-Z", icon: DollarSign },
];

export default function ProductsPage() {
  const [apiResponse, setApiResponse] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [, setMinPrice] = useState(0);
  const [, setMaxPrice] = useState(300000);
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const priceMinRef = useRef<HTMLInputElement>(null);
  const priceMaxRef = useRef<HTMLInputElement>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.products.getAll({
        category: selectedCategory,
        search: debouncedSearch,
        page: 1,
        limit: 100,
      });
      setApiResponse(response);
      setCurrentPage(1);
    } catch {
      setApiResponse({ data: staticProducts });
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, debouncedSearch]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategory, debouncedSearch, sortBy, priceRange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const allProducts = useMemo(() => apiResponse?.data || staticProducts, [apiResponse]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = debouncedSearch === "" || 
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [allProducts, selectedCategory, debouncedSearch, sortBy, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const clearFilters = useCallback(() => {
    setSelectedCategory("All");
    setSearchQuery("");
    setDebouncedSearch("");
    setSortBy("featured");
    setPriceRange([0, 300000]);
    setMinPrice(0);
    setMaxPrice(300000);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);

  const hasActiveFilters = selectedCategory !== "All" || debouncedSearch !== "" || sortBy !== "featured" || priceRange[0] > 0 || priceRange[1] < 300000;

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (debouncedSearch !== "") count++;
    if (priceRange[0] > 0 || priceRange[1] < 300000) count++;
    return count;
  }, [selectedCategory, debouncedSearch, priceRange]);

  const gridColsClass = gridSize === 2 ? "grid-cols-1 sm:grid-cols-2" : gridSize === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  const popularSearches = ["Sofas", "Dining Table", "Office Chair", "Bed Frame", "Floor Lamp"];

  const currentSortOption = sortOptions.find(o => o.value === sortBy);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className={`
                relative flex items-center bg-white rounded-2xl
                border-2 transition-all duration-300 overflow-hidden
                ${searchFocused ? 'border-gray-900 shadow-xl shadow-gray-900/10' : 'border-gray-100 hover:border-gray-200'}
              `}>
                <div className="pl-5 pr-3 py-4 flex items-center">
                  <Search className={`w-5 h-5 transition-colors ${searchFocused ? 'text-gray-900' : 'text-gray-400'}`} />
                </div>
                
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search furniture, sofas, tables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="flex-1 py-4 pr-4 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                />
                
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); searchInputRef.current?.focus(); }}
                    className="mr-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
                
                <div className="hidden sm:flex items-center mr-4 pl-4 border-l border-gray-100">
                  <kbd className="px-2.5 py-1.5 text-xs font-medium text-gray-400 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-1">
                    <Command className="w-3 h-3" /> K
                  </kbd>
                </div>
              </div>

              <AnimatePresence>
                {searchFocused && !searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Popular Searches</p>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => { setSearchQuery(term); searchInputRef.current?.blur(); }}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                          >
                            <Zap className="w-3 h-3 text-gray-400" /> {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.label}
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 relative z-[60]">
              {/* Sort Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                    showSortDropdown || sortBy !== "featured"
                      ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/20'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
                  }`}
                >
                  {currentSortOption && <currentSortOption.icon className="w-4 h-4" />}
                  <span className="hidden sm:inline">{currentSortOption?.label}</span>
                  <ArrowUpDown className="w-4 h-4 opacity-50" />
                </button>
                
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      style={{ zIndex: 9999 }}
                    >
                      <div className="p-2">
                        <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sort By</p>
                        {sortOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                                sortBy === option.value 
                                  ? 'bg-gray-900 text-white' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`w-5 h-5 ${sortBy === option.value ? 'text-white' : 'text-gray-400'}`} />
                              <span className="text-sm font-medium flex-1">{option.label}</span>
                              {sortBy === option.value && <Check className="w-4 h-4" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Grid Size Toggle */}
              <div className="hidden lg:flex items-center gap-1 p-1.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                {([2, 3, 4] as GridSize[]).map((size) => {
                  const Icon = size === 2 ? Grid2X2 : size === 3 ? Grid3X3 : LayoutGrid;
                  return (
                    <button
                      key={size}
                      onClick={() => setGridSize(size)}
                      className={`p-2.5 rounded-lg transition-all duration-200 ${
                        gridSize === size 
                          ? 'bg-gray-900 text-white shadow-md' 
                          : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  showFilters || activeFilterCount > 0 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white border border-gray-200 text-gray-700'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 bg-white text-gray-900 text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {activeFilterCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden mb-6"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Price Range</p>
                      <button
                        onClick={() => { setMinPrice(0); setMaxPrice(300000); setPriceRange([0, 300000]); }}
                        className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                    
                    <div className="relative h-2 bg-gray-100 rounded-full mb-4">
                      <motion.div
                        className="absolute h-full bg-gray-900 rounded-full"
                        style={{
                          left: `${(priceRange[0] / 300000) * 100}%`,
                          right: `${100 - (priceRange[1] / 300000) * 100}%`,
                        }}
                      />
                      <input
                        type="range"
                        ref={priceMinRef}
                        min="0"
                        max="300000"
                        step="5000"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val < priceRange[1]) {
                            setPriceRange([val, priceRange[1]]);
                            setMinPrice(val);
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        ref={priceMaxRef}
                        min="0"
                        max="300000"
                        step="5000"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val > priceRange[0]) {
                            setPriceRange([priceRange[0], val]);
                            setMaxPrice(val);
                          }
                        }}
                        className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-gray-900 rounded-full shadow-lg cursor-pointer"
                        style={{ left: `calc(${(priceRange[0] / 300000) * 100}% - 10px)` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-gray-900 rounded-full shadow-lg cursor-pointer"
                        style={{ left: `calc(${(priceRange[1] / 300000) * 100}% - 10px)` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div className="px-3 py-1.5 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 text-xs">Min</span>
                        <p className="font-semibold text-gray-900">₹{priceRange[0].toLocaleString("en-IN")}</p>
                      </div>
                      <div className="px-3 py-1.5 bg-gray-50 rounded-lg">
                        <span className="text-gray-400 text-xs">Max</span>
                        <p className="font-semibold text-gray-900">₹{priceRange[1].toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                  
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors">
                      <RotateCcw className="w-4 h-4" /> Clear All Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Pills */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center gap-2 mb-4"
              >
                <span className="text-sm text-gray-400 font-medium">Active Filters:</span>
                {selectedCategory !== "All" && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => setSelectedCategory("All")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {selectedCategory} <X className="w-3 h-3" />
                  </motion.button>
                )}
                {debouncedSearch && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    &quot;{debouncedSearch}&quot; <X className="w-3 h-3" />
                  </motion.button>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 300000) && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => { setPriceRange([0, 300000]); setMinPrice(0); setMaxPrice(300000); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    ₹{priceRange[0].toLocaleString("en-IN")} - ₹{priceRange[1].toLocaleString("en-IN")} <X className="w-3 h-3" />
                  </motion.button>
                )}
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-900 underline transition-colors ml-2">Clear all</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <div>
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-900 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-500">Loading products...</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{paginatedProducts.length}</span> of <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                  {selectedCategory !== "All" && <span className="text-gray-900 ml-1">in <span className="font-medium">{selectedCategory}</span></span>}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort:</span>
              <button
                onClick={() => setShowSortDropdown(true)}
                className="font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                {currentSortOption?.label}
              </button>
            </div>
          </div>

          {/* Products */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid ${gridColsClass} gap-4 md:gap-6`}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <ProductCardSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            ) : paginatedProducts.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid ${gridColsClass} gap-4 md:gap-6`}
              >
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onDoubleClick={() => setQuickViewProduct(product)}
                    className="cursor-pointer"
                  >
                    <ProductCard product={product} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <Search className="w-8 h-8 text-gray-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">We could not find any products matching your filters.</p>
                <button onClick={clearFilters} className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-1 mt-10"
            >
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {currentPage > 3 && (
                <>
                  <button onClick={() => goToPage(1)} className="w-10 h-10 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">1</button>
                  {currentPage > 4 && <span className="px-1 text-gray-400">...</span>}
                </>
              )}

              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                
                return (
                  <button
                    key={i}
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition-colors ${
                      currentPage === pageNum 
                        ? 'bg-gray-900 text-white shadow-lg' 
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && <span className="px-1 text-gray-400">...</span>}
                  <button onClick={() => goToPage(totalPages)} className="w-10 h-10 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">{totalPages}</button>
                </>
              )}

              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Need Help?</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Cannot Decide?
            </h2>

            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Our design consultants are here to help you find the perfect pieces.
            </p>

            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Get Expert Advice <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
