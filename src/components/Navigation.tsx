"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`hidden md:block sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-black/5"
          : "bg-[#FAFAFA]/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <span className="text-[#C9A96E] font-serif text-2xl font-bold">S</span>
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A96E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-[#1A1A1A] leading-tight">
                SS Furniture
              </span>
              <span className="text-[10px] text-[#6B6B6B] uppercase tracking-widest">
                Premium Living
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1" role="menubar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  className="relative px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
                >
                  <span className={`relative z-10 ${isActive ? "text-[#1A1A1A]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopActive"
                      className="absolute inset-0 bg-[#C9A96E]/10 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#6B6B6B]" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C9A96E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className="ml-2 px-6 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded-full hover:bg-[#2C2C2C] transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-black/5"
            >
              <form onSubmit={handleSearch} className="py-4">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for furniture..."
                    className="w-full pl-12 pr-12 py-3 bg-[#FAFAFA] rounded-full border border-black/10 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4 text-[#6B6B6B]" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
