"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, Package, Info, Mail, Phone, MapPin, ChevronRight, ExternalLink, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function MobileDrawer({ isOpen, onClose }: DrawerProps) {
  const pathname = usePathname();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-[320px] bg-white z-[70] md:hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-11 h-11"
                  >
                    <rect x="2" y="2" width="44" height="44" rx="10" fill="#1a1a1a" />
                    <path d="M14 14C14 11.7909 15.7909 10 18 10H22C24.2091 10 26 11.7909 26 14V14.5H22V14C22 12.8954 21.1046 12 20 12H18C16.8954 12 16 12.8954 16 14V32C16 33.1046 16.8954 34 18 34H22C24.2091 34 26 32.2091 26 30V30.5H22V30C22 31.1046 21.1046 32 20 32H18C16.8954 32 16 31.1046 16 30V14H14Z" fill="#C9A96E" />
                    <path d="M34 14C34 11.7909 35.7909 10 38 10H42C44.2091 10 46 11.7909 46 14V30C46 32.2091 44.2091 34 42 34H38C35.7909 34 34 32.2091 34 30V14Z" fill="#C9A96E" fillOpacity="0.7" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold text-gray-900 leading-tight">
                      SS Furniture
                    </span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                      Premium Living
                    </span>
                  </div>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-amber-50 to-amber-50/50 text-amber-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${isActive ? "bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg shadow-gray-900/20" : "bg-gray-100"}`}>
                              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? "text-amber-500" : "text-gray-300"}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Quick Links
                  </p>
                  <ul className="space-y-1">
                    {[
                      { label: "New Arrivals", href: "/products?sort=newest" },
                      { label: "Best Sellers", href: "/products?sort=featured" },
                      { label: "Sale Items", href: "/products?sale=true" },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                        >
                          <ExternalLink className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    My Account
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/wishlist"
                        onClick={onClose}
                        className="flex items-center justify-between p-4 rounded-2xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-gray-100">
                            <Heart className="w-5 h-5 text-gray-500" />
                          </div>
                          <span className="font-medium">Wishlist</span>
                        </div>
                        {wishlistCount > 0 && (
                          <span className="min-w-[24px] h-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 px-2">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cart"
                        onClick={onClose}
                        className="flex items-center justify-between p-4 rounded-2xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-gray-100">
                            <ShoppingCart className="w-5 h-5 text-gray-500" />
                          </div>
                          <span className="font-medium">Cart</span>
                        </div>
                        {cartCount > 0 && (
                          <span className="min-w-[24px] h-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-gray-900/30 px-2">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="p-6 border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-amber-50 to-amber-50/50">
                      <MapPin className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Visit Our Showroom</p>
                      <p className="text-xs text-gray-500 mt-0.5">MG Road, Near Benz Circle</p>
                      <p className="text-xs text-gray-500">Vijayawada, AP 520010</p>
                    </div>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:shadow-lg hover:shadow-gray-900/30 transition-all"
                  >
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Call Us Now</p>
                      <p className="text-sm font-bold">+91 98765 43210</p>
                    </div>
                  </a>
                </div>
                <p className="text-[10px] text-center text-gray-400 mt-4">
                  Mon-Sat: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
