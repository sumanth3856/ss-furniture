"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingCart, Heart, TrendingUp, ArrowRight, Eye, Settings, Bell, Plus, ClipboardList, Clock, Sun, Moon } from "lucide-react";

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

function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl">
        <Clock className="w-5 h-5 text-purple-600" />
        <span className="text-sm font-medium text-purple-700">Loading...</span>
      </div>
    );
  }

  const hours = time.getHours();
  const isNight = hours >= 18 || hours < 6;
  const greeting = hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl border border-purple-200/50 shadow-sm">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isNight ? "bg-indigo-200" : "bg-amber-100"}`}>
        {isNight ? (
          <Moon className="w-5 h-5 text-indigo-600" />
        ) : (
          <Sun className="w-5 h-5 text-amber-600" />
        )}
      </div>
      <div>
        <p className="text-xs text-purple-600 font-medium">{greeting}</p>
        <p className="text-lg font-bold text-purple-800 leading-tight">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>
      <div className="h-10 w-px bg-purple-300 mx-1" />
      <div>
        <p className="text-xs text-purple-600 font-medium">
          {time.toLocaleDateString("en-US", { weekday: "short" })}
        </p>
        <p className="text-sm font-bold text-purple-800 leading-tight">
          {time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
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
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
      trend: "+12%",
    },
    {
      title: "Active Carts",
      value: stats?.totalCartItems || 0,
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      textColor: "text-emerald-600",
      trend: "+8%",
    },
    {
      title: "Wishlist",
      value: stats?.totalWishlistItems || 0,
      icon: Heart,
      gradient: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
      iconBg: "bg-rose-100",
      textColor: "text-rose-600",
      trend: "+15%",
    },
    {
      title: "Categories",
      value: stats?.categories.length || 0,
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      iconBg: "bg-violet-100",
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
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">Here&apos;s your store overview</p>
        </div>
        <LiveClock />
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
              className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/80 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2.5 sm:p-3 rounded-xl ${stat.iconBg} shadow-sm`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full shadow-sm">
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mb-0.5">{stat.title}</p>
              <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/80"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent Activity</h3>
            <button className="text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-bold flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-all">
              View All
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl hover:from-purple-50 hover:to-indigo-50 transition-all border border-slate-100 hover:border-purple-200">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  activity.type === "create" ? "bg-gradient-to-br from-emerald-400 to-teal-500" :
                  activity.type === "update" ? "bg-gradient-to-br from-blue-400 to-indigo-500" :
                  "bg-gradient-to-br from-red-400 to-rose-500"
                }`}>
                  {activity.type === "create" && <Plus className="w-5 h-5 text-white" />}
                  {activity.type === "update" && <Settings className="w-5 h-5 text-white" />}
                  {activity.type === "delete" && <Heart className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{activity.action}</p>
                  <p className="text-xs text-slate-500 truncate">{activity.item}</p>
                </div>
                <span className="text-xs font-medium text-slate-400 flex-shrink-0 bg-slate-100 px-2 py-1 rounded-full">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/80"
        >
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-5">Quick Actions</h3>
          <div className="space-y-2 sm:space-y-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-size-200 text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Package className="w-5 h-5" />
                <span className="font-bold text-sm sm:text-base">Products</span>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-md transition-all group border border-slate-200 hover:border-purple-200"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
                <ClipboardList className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-sm sm:text-base">Orders</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-md transition-all group border border-slate-200 hover:border-purple-200"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
                <Eye className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-sm sm:text-base">View Store</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
            </Link>
          </div>

          <div className="mt-5 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/50 shadow-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg flex items-center justify-center shadow-sm">
                <Bell className="w-5 h-5 text-amber-700" />
              </div>
              <span className="font-bold text-amber-800">Alerts</span>
            </div>
            <p className="text-sm font-medium text-amber-700">2 products low in stock</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/80"
      >
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {stats?.categories.map((category) => (
            <span
              key={category}
              className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 rounded-full text-sm font-bold border border-amber-200/50 hover:from-amber-100 hover:to-orange-100 transition-all cursor-pointer shadow-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
