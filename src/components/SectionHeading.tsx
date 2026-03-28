"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-8 ${centered ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-[#6B6B6B] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
