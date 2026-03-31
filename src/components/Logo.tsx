"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "dark" | "light" | "admin";
  className?: string;
}

const logoConfig = {
  sm: { icon: 28, text: "text-sm", subtext: "text-[7px]", gap: "gap-2" },
  md: { icon: 36, text: "text-base", subtext: "text-[8px]", gap: "gap-2.5" },
  lg: { icon: 44, text: "text-lg", subtext: "text-[9px]", gap: "gap-3" },
};

export default function Logo({ size = "md", showText = true, variant = "dark", className = "" }: LogoProps) {
  const config = logoConfig[size];
  const textColor = variant === "dark" ? "text-gray-900" : variant === "admin" ? "text-slate-900" : "text-white";
  const subtextColor = variant === "dark" ? "text-gray-500" : variant === "admin" ? "text-slate-500" : "text-gray-400";

  return (
    <Link href="/" className={`inline-flex items-center ${config.gap} group ${className}`}>
      <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={config.icon}
          height={config.icon}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`gold-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37"/>
              <stop offset="50%" stopColor="#C9A96E"/>
              <stop offset="100%" stopColor="#B8860B"/>
            </linearGradient>
            <linearGradient id={`bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d2d2d"/>
              <stop offset="100%" stopColor="#1a1a1a"/>
            </linearGradient>
          </defs>
          
          <rect width="48" height="48" rx="12" fill={`url(#bg-${size})`}/>
          
          <g>
            <path d="M24 8 L36 16 L32 16 L24 10 L16 16 L12 16 Z" fill={`url(#gold-${size})`}/>
            <rect x="11" y="16" width="26" height="18" rx="3" fill={`url(#gold-${size})`}/>
            <rect x="20" y="22" width="8" height="12" rx="4" fill="#1a1a1a"/>
            <rect x="14" y="19" width="6" height="6" rx="1.5" fill="#1a1a1a"/>
            <rect x="28" y="19" width="6" height="6" rx="1.5" fill="#1a1a1a"/>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif ${config.text} font-bold ${textColor} leading-tight tracking-tight`}>
            SS Furniture
          </span>
          <span className={`${config.subtext} ${subtextColor} uppercase tracking-[0.2em] font-medium`}>
            Premium Living
          </span>
        </div>
      )}
    </Link>
  );
}
