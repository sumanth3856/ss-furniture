"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingCart, Heart, TrendingUp, ArrowRight, Eye, Settings, Bell, Plus, ClipboardList, Clock, Sun, Moon, Gem, Crown } from "lucide-react";

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
  const [time, setTime] = useState(() => {
    if (typeof window !== "undefined") {
      return new Date();
    }
    return null;
  });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl border border-emerald-200/30">
        <Clock className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">Loading...</span>
      </div>
    );
  }

  const hours = time.getHours();
  const isNight = hours >= 18 || hours < 6;
  const greeting = hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-emerald-200/30 shadow-sm">
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${isNight ? "bg-slate-800/80" : "bg-gradient-to-br from-amber-400/20 to-orange-400/20"}`}>
        {isNight ? (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        ) : (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
        )}
      </div>
      <div className="hidden sm:block">
        <p className="text-xs text-emerald-700/80 font-medium">{greeting}</p>
        <p className="text-lg font-bold text-emerald-900 leading-tight">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </p>
      </div>
      <div className="block sm:hidden">
        <p className="text-xs font-bold text-emerald-900">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      <div className="hidden sm:block h-10 w-px bg-emerald-300/40 mx-1" />
      <div className="hidden md:block">
        <p className="text-xs text-emerald-700/80 font-medium">
          {time.toLocaleDateString("en-US", { weekday: "short" })}
        </p>
        <p className="text-sm font-bold text-emerald-900 leading-tight">
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
      gradient: "from-sky-500 via-blue-600 to-indigo-700",
      bgGradient: "from-sky-50/80 via-blue-50/60 to-indigo-50/40",
      trend: "+12%",
    },
    {
      title: "Active Carts",
      value: stats?.totalCartItems || 0,
      icon: ShoppingCart,
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      bgGradient: "from-emerald-50/80 via-teal-50/60 to-cyan-50/40",
      trend: "+8%",
    },
    {
      title: "Wishlist",
      value: stats?.totalWishlistItems || 0,
      icon: Heart,
      gradient: "from-rose-500 via-pink-600 to-fuchsia-700",
      bgGradient: "from-rose-50/80 via-pink-50/60 to-fuchsia-50/40",
      trend: "+15%",
    },
    {
      title: "Categories",
      value: stats?.categories.length || 0,
      icon: TrendingUp,
      gradient: "from-amber-500 via-orange-600 to-red-700",
      bgGradient: "from-amber-50/80 via-orange-50/60 to-red-50/40",
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
        <div className="w-14 h-14 border-4 border-emerald-200/30 border-t-emerald-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading dashboard...</p>
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
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
              <span className="bg-gradient-to-r from-slate-800 via-emerald-800 to-teal-800 bg-clip-text text-transparent">Dashboard</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium mt-0.5 sm:mt-1 text-sm sm:text-base ml-7 lg:ml-8">Here&apos;s your store overview</p>
        </div>
        <div className="flex-shrink-0">
          <LiveClock />
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
              className="group relative overflow-hidden bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/60 hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.bgGradient}" />
              <div className="relative">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 sm:mb-5 shadow-xl transform group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="absolute top-4 sm:top-5 right-4 sm:right-5">
                  <span className="text-xs font-bold px-2.5 py-1 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 text-emerald-700 rounded-full shadow-sm backdrop-blur-sm">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500/80 font-medium mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{stat.value}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-slate-100/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/60"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-100/20 to-transparent rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Gem className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent Activity</h3>
              </div>
              <button className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-all">
                View All
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-slate-50/80 to-white rounded-xl hover:from-emerald-50/50 hover:to-teal-50/30 transition-all border border-slate-100/80 hover:border-emerald-200/50 group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-105 transition-transform ${
                    activity.type === "create" ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500" :
                    activity.type === "update" ? "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500" :
                    "bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-500"
                  }`}>
                    {activity.type === "create" && <Plus className="w-5 h-5 text-white" />}
                    {activity.type === "update" && <Settings className="w-5 h-5 text-white" />}
                    {activity.type === "delete" && <Heart className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">{activity.action}</p>
                    <p className="text-xs text-slate-500 truncate">{activity.item}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400 flex-shrink-0 bg-slate-100/80 px-2 py-1 rounded-full backdrop-blur-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/60"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Quick Actions</h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Package className="w-5 h-5" />
                  <span className="font-bold text-sm sm:text-base">Products</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-lg transition-all group border border-slate-200/60 hover:border-sky-200/50"
              >
                <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
                  <ClipboardList className="w-5 h-5 text-sky-600" />
                  <span className="font-bold text-sm sm:text-base">Orders</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl hover:shadow-lg transition-all group border border-slate-200/60 hover:border-amber-200/50"
              >
                <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
                  <Eye className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-sm sm:text-base">View Store</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
              </Link>
            </div>

            <div className="mt-5 p-4 bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-xl border border-amber-200/40 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-amber-900">Alerts</span>
              </div>
              <p className="text-sm font-medium text-amber-800">2 products low in stock</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/60"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-100/20 to-transparent rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats?.categories.map((category, index) => {
              const categoryGradients = [
                "from-sky-100/80 to-blue-100/60 text-sky-800 border-sky-200/50",
                "from-emerald-100/80 to-teal-100/60 text-emerald-800 border-emerald-200/50",
                "from-amber-100/80 to-orange-100/60 text-amber-800 border-amber-200/50",
                "from-rose-100/80 to-pink-100/60 text-rose-800 border-rose-200/50",
                "from-violet-100/80 to-purple-100/60 text-violet-800 border-violet-200/50",
              ];
              const gradient = categoryGradients[index % categoryGradients.length];
              return (
                <span
                  key={category}
                  className={`px-4 py-2 bg-gradient-to-r ${gradient} rounded-full text-sm font-bold border hover:shadow-md transition-all cursor-pointer backdrop-blur-sm`}
                >
                  {category}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
