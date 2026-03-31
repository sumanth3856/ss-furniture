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
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Filter,
  Grid3X3,
  List,
  ArrowUpDown
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [togglingStock, setTogglingStock] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

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
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format");
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStockStatus = async (product: Product) => {
    setTogglingStock(product.id);
    
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
    } finally {
      setTogglingStock(null);
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
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete:", error);
      setError("Failed to delete product");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
    <div className="space-y-6">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
            <button onClick={() => setError("")} className="ml-auto">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {products.length} total · {products.filter(p => p.in_stock).length} available
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => fetchProducts()}
            className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="p-2 sm:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors"
            title="Toggle View"
          >
            {viewMode === "list" ? <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" /> : <List className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-100">
          <div className="flex flex-col gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select className="flex-1 sm:flex-none sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm bg-white">
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="lg:overflow-x-auto">
            <div className="lg:hidden divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="p-3 sm:p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {product.image ? (
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                            <span className="inline-flex px-1.5 py-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 rounded-full mt-0.5">
                              {product.category}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900 text-sm flex-shrink-0">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <button
                            onClick={() => toggleStockStatus(product)}
                            disabled={togglingStock === product.id}
                            className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium transition-all flex items-center gap-1 ${
                              product.in_stock
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            } disabled:opacity-50`}
                          >
                            {togglingStock === product.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : product.in_stock ? (
                              <ToggleRight className="w-3 h-3" />
                            ) : (
                              <ToggleLeft className="w-3 h-3" />
                            )}
                            <span className="hidden sm:inline">{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                          </button>
                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <button
                              onClick={() => openModal(product)}
                              className="p-1.5 sm:p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            {deleteConfirm === product.id ? (
                              <>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="p-1.5 sm:p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                >
                                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(product.id)}
                                className="p-1.5 sm:p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Product
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.image ? (
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                <ImageIcon className="w-6 h-6 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">{product.description || "No description"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStockStatus(product)}
                          disabled={togglingStock === product.id}
                          className={`group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            product.in_stock
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          } disabled:opacity-50`}
                        >
                          {togglingStock === product.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : product.in_stock ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                          <span>{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openModal(product)}
                            className="p-2.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {deleteConfirm === product.id ? (
                            <div className="flex items-center gap-1 bg-red-50 rounded-xl p-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                title="Confirm Delete"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square bg-gray-100">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" />
                    </div>
                  )}
                  <div className={`absolute top-2 right-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                    product.in_stock ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {product.in_stock ? "In Stock" : "Out"}
                  </div>
                </div>
                <div className="p-2.5 sm:p-4">
                  <span className="text-[10px] sm:text-xs font-medium text-amber-600 bg-amber-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    {product.category}
                  </span>
                  <h4 className="font-semibold text-gray-900 mt-1.5 sm:mt-2 mb-0.5 sm:mb-1 text-xs sm:text-sm truncate">{product.name}</h4>
                  <p className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">₹{product.price.toLocaleString("en-IN")}</p>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="p-1.5 sm:p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg sm:rounded-xl transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
            >
              <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto max-h-[calc(85vh-80px)] sm:max-h-[calc(90vh-160px)]">
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                        placeholder="e.g., Milano Leather Sofa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
                        placeholder="Product description..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-white text-sm sm:text-base"
                        >
                          <option value="">Select</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                        placeholder="https://..."
                      />
                      {formData.image && (
                        <div className="mt-2 sm:mt-3 relative w-20 h-20 sm:w-32 sm:h-32 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
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

                    <div className="p-3 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4">
                        Stock Availability
                      </label>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, in_stock: !formData.in_stock })}
                            className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                              formData.in_stock ? "bg-emerald-500" : "bg-gray-300"
                            }`}
                          >
                            <motion.span
                              animate={{ x: formData.in_stock ? 24 : 4 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-lg"
                            />
                          </motion.button>
                          <div>
                            <p className={`font-semibold text-sm sm:text-base ${formData.in_stock ? "text-emerald-600" : "text-gray-500"}`}>
                              {formData.in_stock ? "In Stock" : "Out of Stock"}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                          formData.in_stock 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {formData.in_stock ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 sm:py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span className="hidden xs:inline">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          {editingProduct ? "Update" : "Add"}
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
    </div>
    </ErrorBoundary>
  );
}
