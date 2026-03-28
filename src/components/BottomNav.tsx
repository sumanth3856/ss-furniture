"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Package, Info, Mail, Menu, X, ShoppingCart, Heart } from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"nav" | "cart">("nav");
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <>
      <nav className="fixed bottom-6 left-4 right-4 md:hidden z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#2C2C2C] to-[#1A1A1A] rounded-2xl blur-xl opacity-30" />
          
          <div className="relative bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "nav" ? (
                <motion.div
                  key="nav"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-around py-2 px-2"
                >
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveTab("nav")}
                        className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 focus:outline-none"
                      >
                        <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                          isActive ? "scale-110" : "hover:scale-105"
                        }`}>
                          {isActive && (
                            <motion.div
                              layoutId="mobileActive"
                              className="absolute inset-0 bg-[#C9A96E] rounded-xl"
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                          <Icon
                            className={`relative z-10 w-5 h-5 transition-colors duration-300 ${
                              isActive ? "text-white" : "text-[#6B6B6B]"
                            }`}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                        </div>
                        <span
                          className={`text-[10px] mt-1 transition-colors duration-300 ${
                            isActive ? "text-[#C9A96E] font-semibold" : "text-[#6B6B6B]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}

                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 focus:outline-none"
                    aria-label="Open menu"
                  >
                    <div className="relative p-2 rounded-xl hover:bg-black/5 transition-colors">
                      <Menu className="w-5 h-5 text-[#6B6B6B]" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] mt-1 text-[#6B6B6B]">Menu</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-around py-2 px-4"
                >
                  <button
                    onClick={() => setActiveTab("nav")}
                    className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 focus:outline-none"
                    aria-label="Close"
                  >
                    <div className="relative p-2 rounded-xl hover:bg-black/5 transition-colors">
                      <X className="w-5 h-5 text-[#6B6B6B]" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] mt-1 text-[#6B6B6B]">Close</span>
                  </button>

                  <Link
                    href="/wishlist"
                    onClick={() => setActiveTab("nav")}
                    className="relative flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 focus:outline-none"
                  >
                    <div className="relative p-2">
                      <Heart className="w-5 h-5 text-[#6B6B6B]" strokeWidth={2} />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A96E] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] mt-1 text-[#6B6B6B]">Wishlist</span>
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setActiveTab("nav")}
                    className="relative flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 focus:outline-none"
                  >
                    <div className="relative p-2">
                      <ShoppingCart className="w-5 h-5 text-[#6B6B6B]" strokeWidth={2} />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1A1A1A] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] mt-1 text-[#6B6B6B]">Cart</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </nav>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
