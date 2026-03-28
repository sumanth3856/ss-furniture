"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 mx-auto mb-4"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#C9A96E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 200"
            />
          </svg>
        </motion.div>
        <p className="text-[#6B6B6B] text-sm">Loading...</p>
      </div>
    </div>
  );
}
