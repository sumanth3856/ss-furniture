"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList,
  LogOut,
  X,
  Eye,
  Shield
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const initAuth = () => {
      const auth = sessionStorage.getItem("ss_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen, isMobile]);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm relative"
        >
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/20">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="text-center mb-6 pt-2">
              <h1 className="text-2xl font-bold text-white mb-1">SS Furniture</h1>
              <p className="text-gray-400 text-sm">Admin Portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Access Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
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
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2"
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
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                Sign In
              </motion.button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Protected by secure authentication
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`
        fixed lg:static inset-0 z-50 w-full sm:w-72 bg-gray-900 transform transition-transform duration-300 ease-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h2 className="font-bold text-white text-base sm:text-lg">SS Furniture</h2>
                  <p className="text-xs text-gray-400">Admin Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 sm:p-4 space-y-1 border-t border-white/5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Eye className="w-5 h-5" />
              <span className="font-medium">View Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-h-screen flex flex-col w-full">
        <div className="flex-1 p-4 sm:p-6">
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
      </main>
    </div>
  );
}
