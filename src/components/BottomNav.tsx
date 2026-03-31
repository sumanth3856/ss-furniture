"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Info, User, ShoppingCart, Heart } from "lucide-react";
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
  
  if (pathname.startsWith("/admin")) {
    return null;
  }
  
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const isCartActive = pathname === "/cart";
  const isWishlistActive = pathname === "/wishlist";

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 safe-area-bottom">
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="relative flex items-center justify-between px-2 pb-2 pt-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200"
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-900/25" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}>
                <Icon
                  className="w-5 h-5"
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
              </div>
              <span className={`text-[10px] mt-1 font-medium ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
        
        <Link
          href="/wishlist"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200"
        >
          <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
            isWishlistActive 
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30" 
              : "text-gray-400 hover:text-rose-500 hover:bg-rose-50"
          }`}>
            <Heart
              className="w-5 h-5"
              strokeWidth={isWishlistActive ? 2.5 : 1.75}
              fill={isWishlistActive ? "currentColor" : "none"}
            />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-1 font-medium ${
            isWishlistActive ? "text-rose-500" : "text-gray-400"
          }`}>
            Saved
          </span>
        </Link>

        <Link
          href="/cart"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200"
        >
          <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
            isCartActive 
              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30" 
              : "text-gray-400 hover:text-amber-500 hover:bg-amber-50"
          }`}>
            <ShoppingCart
              className="w-5 h-5"
              strokeWidth={isCartActive ? 2.5 : 1.75}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-1 font-medium ${
            isCartActive ? "text-amber-500" : "text-gray-400"
          }`}>
            Cart
          </span>
        </Link>
      </div>
      
      <style jsx global>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 8px);
        }
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .safe-area-bottom {
            padding-bottom: max(env(safe-area-inset-bottom), 8px);
          }
        }
      `}</style>
    </nav>
  );
}
