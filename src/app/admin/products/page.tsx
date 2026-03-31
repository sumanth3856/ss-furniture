"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Loader2,
  X,
  Check,
  Package,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Edit3,
  Trash,
  CheckCircle,
  XCircle,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import ErrorBoundary from "@/components/ErrorBoundary";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  in_stock: boolean;
  created_at: string;
}

const categories = ["Sofas", "Tables", "Chairs", "Bedroom", "Lighting", "Storage", "Outdoor"];

function StockToggle({ inStock, onChange, disabled }: { inStock: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onChange}
      disabled={disabled}
      className={`
        relative w-12 h-7 rounded-full transition-colors duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${inStock ? "bg-emerald-500" : "bg-slate-200"}
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      `}
      title={inStock ? "Click to mark as out of stock" : "Click to mark as in stock"}
    >
      <motion.span
        initial={false}
        animate={{ left: inStock ? 26 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
      >
        {inStock ? (
          <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        )}
      </motion.span>
    </motion.button>
  );
}

function ProductCard({ product, onEdit, onDelete, onToggleStock }: { 
  product: Product; 
  onEdit: () => void;
  onDelete: () => void;
  onToggleStock: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden hover:shadow-lg hover:border-slate-300/80 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!product.in_stock ? 'grayscale opacity-60' : ''}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-20 h-20 text-slate-300" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
            product.in_stock 
              ? "bg-emerald-500/90 text-white" 
              : "bg-slate-600/90 text-white"
          }`}>
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl text-slate-700 font-medium text-sm hover:bg-white transition-all"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2.5 bg-white/95 backdrop-blur-sm rounded-xl text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
            {product.category}
          </span>
          <StockToggle 
            inStock={product.in_stock} 
            onChange={onToggleStock}
          />
        </div>
        
        <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={onEdit}
            className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DeleteConfirmation({ productName, onConfirm, onCancel }: {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 max-w-md mx-auto"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-500/20">
        <Trash className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-xl font-black text-slate-900 text-center mb-2">Delete Product</h3>
      <p className="text-sm text-slate-500 text-center mb-6">
        Are you sure you want to delete <span className="font-bold text-slate-700">{productName}</span>? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all border border-slate-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/40 transition-all"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    in_stock: true as boolean,
  });

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/admin/api/products");
      
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.in_stock).length,
    outOfStock: products.filter(p => !p.in_stock).length,
  };

  const toggleStockStatus = async (product: Product) => {
    const newStockStatus = !product.in_stock;
    
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, in_stock: newStockStatus } : p
      )
    );
    
    try {
      const res = await fetch(`/admin/api/products/${product.id}/stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ in_stock: newStockStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update stock status");
      }
    } catch (error) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, in_stock: !newStockStatus } : p
        )
      );
      setError(error instanceof Error ? error.message : "Failed to update stock status");
      setTimeout(() => setError(""), 3000);
    }
  };

  function openModal(product?: Product) {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        category: product.category,
        image: product.image || "",
        in_stock: product.in_stock ?? true,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        in_stock: true,
      });
    }
    setError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingProduct(null);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = editingProduct 
        ? `/admin/api/products/${editingProduct.id}` 
        : "/admin/api/products";
      
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save product");
      }

      await fetchProducts();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/admin/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      await fetchProducts();
      setDeleteProduct(null);
    } catch (error) {
      console.error("Failed to delete:", error);
      setError("Failed to delete product");
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-14 h-14 border-4 border-slate-200 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
    <div className="space-y-5 sm:space-y-6">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="p-4 bg-red-50/80 border border-red-200/40 rounded-2xl flex items-center gap-3 overflow-hidden shadow-lg"
          >
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-red-700 font-semibold flex-1">{error}</span>
            <button onClick={() => setError("")} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Products</h1>
          </div>
          <p className="text-slate-500 text-sm ml-11">Manage your furniture inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchProducts()}
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all"
        >
          <div className="w-11 h-11 bg-indigo-500 rounded-xl flex items-center justify-center mb-3">
            <Package className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.total}</p>
          <p className="text-xs text-slate-500 mt-1">Total Products</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all"
        >
          <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center mb-3">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.inStock}</p>
          <p className="text-xs text-slate-500 mt-1">In Stock</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/50 hover:shadow-md hover:border-slate-300/60 transition-all"
        >
          <div className="w-11 h-11 bg-rose-500 rounded-xl flex items-center justify-center mb-3">
            <XCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.outOfStock}</p>
          <p className="text-xs text-slate-500 mt-1">Out of Stock</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-slate-900 rounded-2xl p-4 sm:p-5"
        >
          <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white">
            {stats.total > 0 ? Math.round((stats.inStock / stats.total) * 100) : 0}%
          </p>
          <p className="text-xs text-slate-400 mt-1">Availability</p>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-48 pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 text-center max-w-sm text-sm">
              {searchTerm || categoryFilter 
                ? "Try adjusting your search or filter criteria" 
                : "Get started by adding your first product"}
            </p>
            {!searchTerm && !categoryFilter && (
              <button
                onClick={() => openModal()}
                className="mt-6 flex items-center gap-2 px-5 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => openModal(product)}
                onDelete={() => setDeleteProduct(product)}
                onToggleStock={() => toggleStockStatus(product)}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="hidden xl:block overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Product</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Category</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Price</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Stock</th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 shadow-inner">
                            {product.image ? (
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                <ImageIcon className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-sm lg:text-base truncate max-w-[150px] lg:max-w-none">{product.name}</p>
                            <p className="text-xs lg:text-sm text-slate-500 line-clamp-1 max-w-[180px] lg:max-w-xs hidden sm:block">{product.description || "No description"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span className="px-2 lg:px-3 py-1 lg:py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-lg text-xs lg:text-sm font-bold border border-amber-200/50">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span className="font-black text-slate-900 text-base lg:text-lg">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <StockToggle 
                          inStock={product.in_stock} 
                          onChange={() => toggleStockStatus(product)}
                        />
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center justify-end gap-1.5 lg:gap-2">
                          <button
                            onClick={() => openModal(product)}
                            className="p-2 lg:p-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg lg:rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteProduct(product)}
                            className="p-2 lg:p-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg lg:rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="xl:hidden space-y-3 p-3 sm:p-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/60 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 shadow-inner">
                      {product.image ? (
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <ImageIcon className="w-8 h-8 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 mt-0.5">{product.description || "No description"}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-md text-xs font-bold border border-amber-200/50">
                          {product.category}
                        </span>
                        <span className="font-black text-slate-900 text-base sm:text-lg">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <StockToggle 
                      inStock={product.in_stock} 
                      onChange={() => toggleStockStatus(product)}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="p-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div               className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden pointer-events-auto border border-slate-200">
                <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 font-medium">
                      {editingProduct ? "Update product information" : "Fill in the details below"}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all text-base shadow-sm"
                        placeholder="e.g., Milano Leather Sofa - 3 Seater"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all resize-none text-base shadow-sm"
                        placeholder="Describe the product features, materials, and dimensions..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all text-base shadow-sm"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3.5 pr-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all bg-white text-base appearance-none shadow-sm"
                          >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Product Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all text-base shadow-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.image && (
                        <div className="mt-3 relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300">
                          <Image
                            src={formData.image}
                            alt="Preview"
                            fill
                            className="object-cover"
                            onError={() => setFormData({ ...formData, image: "" })}
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between mb-5">
                        <label className="text-base font-black text-slate-900">
                          Stock Availability
                        </label>
                        <motion.div
                          initial={false}
                          animate={{
                            backgroundColor: formData.in_stock ? "rgba(16, 185, 129, 0.15)" : "rgba(100, 116, 139, 0.15)"
                          }}
                          className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                            formData.in_stock 
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" 
                              : "bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30"
                          }`}
                        >
                          {formData.in_stock ? "Active" : "Inactive"}
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <StockToggle 
                          inStock={formData.in_stock} 
                          onChange={() => setFormData({ ...formData, in_stock: !formData.in_stock })}
                        />

                        <div className="flex-1">
                          <p className={`font-bold text-lg transition-colors ${
                            formData.in_stock ? "text-emerald-600" : "text-slate-500"
                          }`}>
                            {formData.in_stock ? "Available for Sale" : "Not Available"}
                          </p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {formData.in_stock 
                              ? "Customers can purchase this item" 
                              : "This item is hidden from customers"}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`mt-5 pt-4 border-t flex items-center gap-2 ${
                        formData.in_stock ? "border-emerald-200" : "border-slate-200"
                      }`}>
                        <motion.div
                          initial={false}
                          animate={{
                            backgroundColor: formData.in_stock ? "#10b981" : "#94a3b8",
                            scale: formData.in_stock ? [1, 1.3, 1] : 1,
                          }}
                          transition={{ 
                            scale: { duration: 0.4, repeat: formData.in_stock ? Infinity : 0, repeatDelay: 1 },
                            backgroundColor: { duration: 0.2 }
                          }}
                          className={`w-2.5 h-2.5 rounded-full ${formData.in_stock ? "shadow-lg shadow-emerald-500/50" : ""}`}
                        />
                        <span className="text-xs text-slate-500 font-medium">
                          Status will be updated when you save
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all border border-slate-200 text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-6 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5" />
                          {editingProduct ? "Update Product" : "Add Product"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
              onClick={() => setDeleteProduct(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="pointer-events-auto">
                <DeleteConfirmation
                  productName={deleteProduct.name}
                  onConfirm={() => handleDelete(deleteProduct.id)}
                  onCancel={() => setDeleteProduct(null)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}
