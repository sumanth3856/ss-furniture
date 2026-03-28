"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, Package, Info, Mail, Phone, MapPin, ChevronRight, ExternalLink } from "lucide-react";

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
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                  <div className="w-11 h-11 bg-[#1A1A1A] rounded-xl flex items-center justify-center">
                    <span className="text-[#C9A96E] font-serif text-xl font-bold">S</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold text-[#1A1A1A] leading-tight">
                      SS Furniture
                    </span>
                    <span className="text-[9px] text-[#6B6B6B] uppercase tracking-widest">
                      Vijayawada
                    </span>
                  </div>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#6B6B6B]" />
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
                              ? "bg-[#C9A96E]/10 text-[#C9A96E]"
                              : "text-[#6B6B6B] hover:bg-black/[0.03] hover:text-[#1A1A1A]"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-xl ${isActive ? "bg-[#C9A96E]/20" : "bg-black/[0.03]"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#C9A96E]" : "text-black/20"}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 pt-6 border-t border-black/5">
                  <p className="px-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-3">
                    Quick Links
                  </p>
                  <ul className="space-y-1">
                    {[
                      { label: "New Arrivals", href: "/products" },
                      { label: "Best Sellers", href: "/products" },
                      { label: "Sale", href: "/products" },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl text-[#6B6B6B] hover:bg-black/[0.03] hover:text-[#1A1A1A] transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="p-6 border-t border-black/5 bg-gradient-to-b from-[#FAFAFA] to-white">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#C9A96E]/10 rounded-xl">
                      <MapPin className="w-4 h-4 text-[#C9A96E]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">Visit Our Showroom</p>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">MG Road, Near Benz Circle</p>
                      <p className="text-xs text-[#6B6B6B]">Vijayawada, AP 520010</p>
                    </div>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 p-3 bg-[#1A1A1A] text-white rounded-xl hover:bg-[#2C2C2C] transition-colors"
                  >
                    <div className="p-2 bg-white/10 rounded-xl">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Call Us Now</p>
                      <p className="text-sm font-bold">+91 98765 43210</p>
                    </div>
                  </a>
                </div>
                <p className="text-[10px] text-center text-[#6B6B6B] mt-4">
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
