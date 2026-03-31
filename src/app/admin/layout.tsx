"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X,
  Eye,
  Shield,
  LogOut,
  Menu,
  LayoutDashboard,
  Package,
  ClipboardList
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/orders", icon: ClipboardList, label: "Orders" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = () => {
      const auth = sessionStorage.getItem("ss_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    };
    initAuth();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("ss_admin_auth", "true");
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ss_admin_auth");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-violet-950 to-purple-950 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm relative"
        >
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8 pt-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-1">SS Furniture</h1>
              <p className="text-indigo-300/70 text-sm font-medium">Admin Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-indigo-200/80 mb-2">
                  Access Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-indigo-300/30 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all backdrop-blur-sm"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-red-500/15 border border-red-500/25 rounded-xl text-red-300 text-sm flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
              >
                Sign In
              </motion.button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-white/5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <p className="text-xs text-indigo-300/50 font-medium">
                Protected by secure authentication
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex">
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:bg-gradient-to-b lg:from-white lg:to-slate-50 lg:border-r lg:border-indigo-100/50 lg:fixed lg:inset-y-0">
        <div className="relative p-6 border-b border-indigo-100/50">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-purple-500/5" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">SS Furniture</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-xs text-gray-500 font-medium">Admin Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl p-1">
            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300
                        ${isActive 
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25" 
                          : "text-gray-600 hover:text-indigo-700 hover:bg-white/80"
                        }
                      `}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                      <Icon className={`w-5 h-5 relative z-10 ${isActive ? '' : 'group-hover:text-indigo-500'}`} />
                      <span className="font-semibold relative z-10">{item.label}</span>
                      {isActive && (
                        <div className="absolute right-3 w-2 h-2 bg-white/50 rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-auto p-4 space-y-2">
          <div className="h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent mb-4" />
          <Link
            href="/"
            target="_blank"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300"
          >
            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">View Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-all duration-300"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-72">
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">Admin</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 pt-16 lg:pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-indigo-900/40 via-violet-900/30 to-purple-900/40 backdrop-blur-md z-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-b from-white via-white to-indigo-50/30 shadow-2xl z-50 lg:hidden"
            >
              <div className="relative p-5 border-b border-indigo-100/50">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-purple-500/5" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Menu</h3>
                      <p className="text-xs text-gray-500">Navigation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300
                          ${isActive 
                            ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25" 
                            : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50/80"
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110'}`} />
                        <span className="font-semibold">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="absolute bottom-6 left-4 right-4">
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent mb-4" />
                <Link
                  href="/"
                  target="_blank"
                  className="group flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                >
                  <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">View Store</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
