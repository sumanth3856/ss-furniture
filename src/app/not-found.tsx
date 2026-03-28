"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found | SS Furniture";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAFAFA]">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[150px] md:text-[200px] font-serif font-bold text-[#C9A96E]/20 leading-none block">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Page Not Found
          </h1>
          <p className="text-[#6B6B6B] mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 text-[#1A1A1A] font-medium border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-sm text-[#6B6B6B] mb-4">You might be looking for:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Products", "About", "Contact", "FAQ"].map((page) => (
              <Link
                key={page}
                href={`/${page.toLowerCase()}`}
                className="px-4 py-2 text-sm text-[#6B6B6B] bg-white border border-black/10 rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                {page}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
