"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingCart, Heart, TrendingUp, ArrowRight, Eye, Settings, Bell, Plus, ClipboardList, Clock, Sun, Moon, Activity, LayoutGrid, LayoutDashboard } from "lucide-react";

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
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <Clock className="w-5 h-5 text-slate-400" />
        <span className="text-sm text-slate-500">Loading...</span>
      </div>
    );
  }

  const hours = time.getHours();
  const isNight = hours >= 18 || hours < 6;
  const greeting = hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : "Good Evening";

  const timeString = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateString = time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isNight ? "bg-slate-800" : "bg-amber-100"}`}>
        {isNight ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-amber-600" />
        )}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium mb-0.5">{greeting}</p>
        <p className="text-xl font-bold text-slate-900 tracking-tight">
          {timeString}
        </p>
      </div>
      <div className="h-10 w-px bg-slate-200 mx-1" />
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-slate-700">{dateString}</p>
        <p className="text-xs text-slate-400">{time.getFullYear()}</p>
      </div>
      <div className="block sm:hidden">
        <p className="text-xs text-slate-500">{dateString}</p>
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
      bgColor: "bg-blue-500",
      trend: "+12%",
    },
    {
      title: "Active Carts",
      value: stats?.totalCartItems || 0,
      icon: ShoppingCart,
      bgColor: "bg-emerald-500",
      trend: "+8%",
    },
    {
      title: "Wishlist",
      value: stats?.totalWishlistItems || 0,
      icon: Heart,
      bgColor: "bg-rose-500",
      trend: "+15%",
    },
    {
      title: "Categories",
      value: stats?.categories.length || 0,
      icon: TrendingUp,
      bgColor: "bg-amber-500",
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
        <div className="w-14 h-14 border-4 border-slate-200 border-t-slate-800 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
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
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
              Dashboard
            </h2>
          </div>
          <p className="text-slate-500 font-medium mt-0.5 sm:mt-1 text-sm sm:text-base ml-10 lg:ml-11">Here&apos;s your store overview</p>
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
              className="group relative overflow-hidden bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/60 hover:shadow-xl hover:border-slate-300/80 transition-all duration-300"
            >
              <div className="relative">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3 sm:mb-4`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">{stat.title}</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/60"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent Activity</h3>
            </div>
            <button className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all">
              View All
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50/80 rounded-xl hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-200/60 group">
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === "create" ? "bg-emerald-500" :
                  activity.type === "update" ? "bg-blue-500" :
                  "bg-rose-500"
                }`}>
                  {activity.type === "create" && <Plus className="w-4 h-4 text-white" />}
                  {activity.type === "update" && <Settings className="w-4 h-4 text-white" />}
                  {activity.type === "delete" && <Heart className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">{activity.action}</p>
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
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/60"
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
              <LayoutGrid className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Quick Actions</h3>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 sm:p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Package className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">Products</span>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl hover:shadow-md transition-all group border border-slate-200/80 hover:border-emerald-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-emerald-600">
                <ClipboardList className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">Orders</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl hover:shadow-md transition-all group border border-slate-200/80 hover:border-amber-300"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-amber-600">
                <Eye className="w-5 h-5" />
                <span className="font-medium text-sm sm:text-base">View Store</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
            </Link>
          </div>

          <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-amber-900">Alerts</span>
            </div>
            <p className="text-sm font-medium text-amber-800">2 products low in stock</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200/60"
      >
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats?.categories.map((category) => (
            <span
              key={category}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200/80 hover:bg-slate-200/80 transition-all cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
