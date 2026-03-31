"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingCart, Heart, TrendingUp, DollarSign, Loader2 } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalCartItems: number;
  totalWishlistItems: number;
  categories: string[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const productsRes = await fetch("/api/products?limit=1000");
        const response = await productsRes.json();
        const products = response.data || [];

        const categories: string[] = [...new Set<string>(products.map((p: { category: string }) => p.category))];

        setStats({
          totalProducts: products.length,
          totalCartItems: 0,
          totalWishlistItems: 0,
          categories,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Cart Items",
      value: stats?.totalCartItems || 0,
      icon: ShoppingCart,
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Wishlist Items",
      value: stats?.totalWishlistItems || 0,
      icon: Heart,
      color: "bg-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Categories",
      value: stats?.categories.length || 0,
      icon: TrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#C9A96E]" />
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your store.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {stats?.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a
              href="/admin/products"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Manage Products</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="/products"
              target="_blank"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">View Store</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
