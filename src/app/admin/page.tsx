"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingCart, Heart, TrendingUp, ArrowRight, Eye, Settings, Bell, Calendar, Plus, ClipboardList } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalCartItems: number;
  totalWishlistItems: number;
  categories: string[];
}

interface RecentActivity {
  id: number;
  action: string;
  item: string;
  time: string;
  type: "create" | "update" | "delete";
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
      title: "Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+12%",
    },
    {
      title: "Active Carts",
      value: stats?.totalCartItems || 0,
      icon: ShoppingCart,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      trend: "+8%",
    },
    {
      title: "Wishlist",
      value: stats?.totalWishlistItems || 0,
      icon: Heart,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      textColor: "text-rose-600",
      trend: "+15%",
    },
    {
      title: "Categories",
      value: stats?.categories.length || 0,
      icon: TrendingUp,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
      trend: "+3",
    },
  ];

  const recentActivity: RecentActivity[] = [
    { id: 1, action: "Added new product", item: "Milano Leather Sofa", time: "2h ago", type: "create" },
    { id: 2, action: "Updated price", item: "Oak Dining Table", time: "4h ago", type: "update" },
    { id: 3, action: "Stock updated", item: "Velvet Armchair", time: "6h ago", type: "update" },
    { id: 4, action: "Removed product", item: "Vintage Lamp", time: "1d ago", type: "delete" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-0.5">Here&apos;s your store overview</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-50 rounded-xl self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
          <span className="text-xs sm:text-sm font-medium text-amber-700">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.textColor}`} />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-0.5 sm:mb-1">{stat.title}</p>
              <p className="text-xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-xs sm:text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="space-y-2 sm:space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.type === "create" ? "bg-emerald-100 text-emerald-600" :
                  activity.type === "update" ? "bg-blue-100 text-blue-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {activity.type === "create" && <Plus className="w-4 h-4" />}
                  {activity.type === "update" && <Settings className="w-4 h-4" />}
                  {activity.type === "delete" && <Heart className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.item}</p>
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg sm:rounded-xl text-white hover:shadow-lg hover:shadow-gray-900/25 transition-all group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">Products</span>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">Orders</span>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">View Store</span>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              <span className="font-medium text-amber-800 text-sm">Alerts</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-700">2 products low in stock</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {stats?.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
