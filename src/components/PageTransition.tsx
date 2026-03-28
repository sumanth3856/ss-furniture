"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
