"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-white to-[#F5F5F0]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#C9A96E]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A1A1A]/5 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#C9A96E] bg-[#C9A96E]/10 rounded-full">
            Premium Furniture Collection
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="block font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] leading-tight">
            Elevate Your
          </span>
          <span className="block font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#1A1A1A] leading-tight mt-2">
            Living <span className="text-[#C9A96E]">Space</span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#6B6B6B] mb-10 leading-relaxed"
        >
          Discover meticulously crafted furniture that transforms your home into a
          sanctuary of style and comfort. Where timeless design meets exceptional quality.
        </motion.p>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/about"
            className="group px-8 py-4 bg-white text-gray-900 font-medium border-2 border-gray-200 rounded-full hover:border-gray-900 transition-all duration-300 hover:shadow-lg"
          >
            Our Story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-[#6B6B6B]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
