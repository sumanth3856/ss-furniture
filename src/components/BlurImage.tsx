"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlurImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function BlurImage({
  src,
  alt,
  fill = false,
  sizes,
  className = "",
  priority = false,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const containerClassName = fill ? "relative" : "inline-block";

  return (
    <div className={containerClassName}>
      {!isLoaded && !isError && (
        <motion.div
          className={`bg-gray-200 ${fill ? "absolute inset-0" : "w-full h-full"} ${className}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {isError && (
        <div className={`bg-gray-100 ${fill ? "absolute inset-0" : "w-full h-full"} ${className} flex items-center justify-center`}>
          <span className="text-[#6B6B6B] text-sm">Image unavailable</span>
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} ${fill ? "" : ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        priority={priority}
        style={{
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
}
