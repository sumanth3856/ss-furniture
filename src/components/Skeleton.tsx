"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <motion.div
      animate={{ 
        opacity: [0.5, 1, 0.5],
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
        <Skeleton className="h-6 w-48 mx-auto rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-16 md:h-24 w-full max-w-lg mx-auto" />
          <Skeleton className="h-16 md:h-24 w-full max-w-lg mx-auto" />
        </div>
        <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        <div className="flex items-center justify-center gap-4 pt-4">
          <Skeleton className="h-12 w-44 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5 space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-12 w-40 rounded-full" />
    </div>
  );
}
