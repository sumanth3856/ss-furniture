"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Info, User, ShoppingCart, Heart, Menu, X } from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Explore", icon: Search },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const isCartActive = pathname === "/cart";
  const isWishlistActive = pathname === "/wishlist";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 safe-area-bottom">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          <div className="relative backdrop-blur-xl bg-white/80">
            <div className="flex items-stretch justify-between px-2 pb-safe">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex-1 relative flex flex-col items-center justify-center py-3 px-1 transition-all duration-300"
                  >
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute inset-x-2 inset-y-1.5 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg shadow-gray-900/20"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="relative z-10 flex flex-col items-center gap-0.5">
                      <Icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive 
                            ? "text-white scale-110" 
                            : "text-gray-400 group-hover:text-gray-600"
                        }`}
                        strokeWidth={isActive ? 2.5 : 1.75}
                      />
                      <span
                        className={`text-[10px] font-medium transition-all duration-300 ${
                          isActive 
                            ? "text-white -translate-y-0.5" 
                            : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
              
              <div className="flex items-center gap-1 pl-1">
                <Link
                  href="/wishlist"
                  className={`relative flex flex-col items-center justify-center py-3 px-3 transition-all duration-300 ${
                    isWishlistActive ? "scale-110" : ""
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isWishlistActive && (
                      <motion.div
                        layoutId="wishlistIndicator"
                        className="absolute inset-0 bg-gradient-to-b from-rose-500 to-pink-500 rounded-2xl shadow-lg shadow-rose-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-10 flex flex-col items-center gap-0.5">
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        isWishlistActive 
                          ? "text-white scale-110" 
                          : "text-gray-400"
                      }`}
                      strokeWidth={isWishlistActive ? 2.5 : 1.75}
                      fill={isWishlistActive ? "currentColor" : "none"}
                    />
                    {wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-rose-500 to-pink-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 px-1"
                      >
                        {wishlistCount > 99 ? "99+" : wishlistCount}
                      </motion.span>
                    )}
                    <span className={`text-[10px] font-medium transition-all duration-300 ${
                      isWishlistActive ? "text-white" : "text-gray-400"
                    }`}>
                      Saved
                    </span>
                  </div>
                </Link>

                <Link
                  href="/cart"
                  className={`relative flex flex-col items-center justify-center py-3 px-3 transition-all duration-300 ${
                    isCartActive ? "scale-110" : ""
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isCartActive && (
                      <motion.div
                        layoutId="cartIndicator"
                        className="absolute inset-0 bg-gradient-to-b from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-10 flex flex-col items-center gap-0.5">
                    <ShoppingCart
                      className={`w-5 h-5 transition-all duration-300 ${
                        isCartActive 
                          ? "text-white scale-110" 
                          : "text-gray-400"
                      }`}
                      strokeWidth={isCartActive ? 2.5 : 1.75}
                    />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-br from-amber-500 to-amber-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 px-1"
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </motion.span>
                    )}
                    <span className={`text-[10px] font-medium transition-all duration-300 ${
                      isCartActive ? "text-white" : "text-gray-400"
                    }`}>
                      Cart
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative flex flex-col items-center justify-center py-3 px-3 transition-all duration-300 active:scale-95"
                  aria-label="Open menu"
                >
                  <div className="relative z-10 flex flex-col items-center gap-0.5">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Menu className="w-5 h-5 text-gray-400" strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">Menu</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </nav>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      <style jsx global>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: max(env(safe-area-inset-bottom), 8px);
          }
        }
      `}</style>
    </>
  );
}
