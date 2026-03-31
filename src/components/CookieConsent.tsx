"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    setTimeout(() => setIsHidden(true), 300);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
    setTimeout(() => setIsHidden(true), 300);
  };

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[420px] z-[90]"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-black/5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-[#C9A96E]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1A1A] mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>
              <button
                onClick={handleDecline}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#6B6B6B]" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded-full hover:bg-[#2C2C2C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
              >
                Accept All
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2.5 bg-white text-[#1A1A1A] text-sm font-medium border border-black/10 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
              >
                Decline
              </button>
            </div>

            <Link
              href="/privacy"
              className="block mt-3 text-center text-xs text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
            >
              Learn more about our privacy policy
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
