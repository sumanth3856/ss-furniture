"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Heart, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LogoIconSVG = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12"
    suppressHydrationWarning
  >
    <rect x="2" y="2" width="44" height="44" rx="10" fill="#1a1a1a" />
    <path
      d="M14 14C14 11.7909 15.7909 10 18 10H22C24.2091 10 26 11.7909 26 14V14.5H22V14C22 12.8954 21.1046 12 20 12H18C16.8954 12 16 12.8954 16 14V32C16 33.1046 16.8954 34 18 34H22C24.2091 34 26 32.2091 26 30V30.5H22V30C22 31.1046 21.1046 32 20 32H18C16.8954 32 16 31.1046 16 30V14H14Z"
      fill="#C9A96E"
    />
    <path
      d="M34 14C34 11.7909 35.7909 10 38 10H42C44.2091 10 46 11.7909 46 14V30C46 32.2091 44.2091 34 42 34H38C35.7909 34 34 32.2091 34 30V14Z"
      fill="#C9A96E"
      fillOpacity="0.7"
    />
  </svg>
);

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

  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

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
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100/50"
          : "bg-white/80 backdrop-blur-xl"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="flex items-center gap-3.5 group flex-shrink-0"
          >
            <LogoIconSVG />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-gray-900 leading-tight tracking-tight">
                SS Furniture
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">
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
                  className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-200 rounded-full ${
                    isActive 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="group p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-500 group-hover:text-gray-900 transition-colors" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5 text-gray-500 hover:text-rose-500 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-gradient-to-br from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30 px-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-gray-500 hover:text-gray-900 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-gray-900/30 px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/contact"
              className="ml-2 group relative px-6 py-2.5 overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-gray-900/30" />
              <span className="relative z-10 text-sm font-semibold text-white tracking-wide">
                Get in Touch
              </span>
            </Link>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative max-w-2xl mx-auto group">
                <div className="relative flex items-center">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for furniture, sofas, tables..."
                    className="w-full pl-14 pr-14 py-4 bg-gray-50/80 rounded-full border-2 border-gray-100 focus:border-gray-900 focus:bg-white focus:outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
