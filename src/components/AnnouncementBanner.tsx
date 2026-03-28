"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck } from "lucide-react";
import Link from "next/link";

interface AnnouncementBannerProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
}

export default function AnnouncementBanner({ 
  message = "Free shipping on orders over $999 | Use code WELCOME10 for 10% off",
  linkText,
  linkHref = "/products"
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcement-dismissed", "true");
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-[#1A1A1A]"
        >
          <div className="relative">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-center gap-2 text-center">
                <Truck className="w-4 h-4 text-[#C9A96E] hidden sm:block" />
                <p className="text-sm text-white">
                  {message}
                </p>
                {linkText && (
                  <Link
                    href={linkHref}
                    className="text-sm font-medium text-[#C9A96E] hover:text-[#D4B87A] transition-colors underline underline-offset-2"
                  >
                    {linkText}
                  </Link>
                )}
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
