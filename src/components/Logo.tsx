"use client";

import Link from "next/link";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "dark" | "light" | "admin";
  className?: string;
}

const logoConfig = {
  xs: { icon: 24, text: "text-xs", subtext: "text-[6px]", gap: "gap-1.5" },
  sm: { icon: 28, text: "sm:text-sm text-xs", subtext: "text-[7px]", gap: "gap-2" },
  md: { icon: 36, text: "text-base", subtext: "text-[8px]", gap: "gap-2.5" },
  lg: { icon: 44, text: "text-lg", subtext: "text-[9px]", gap: "gap-3" },
  xl: { icon: 52, text: "text-xl md:text-2xl", subtext: "text-[10px] md:text-[11px]", gap: "gap-3 md:gap-4" },
};

const LogoIcon = ({ size = "md" }: { size: "xs" | "sm" | "md" | "lg" | "xl" }) => {
  const iconSize = logoConfig[size].icon;
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SS Furniture Logo"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37"/>
          <stop offset="50%" stopColor="#C9A96E"/>
          <stop offset="100%" stopColor="#B8860B"/>
        </linearGradient>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d2d2d"/>
          <stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
      </defs>
      
      <rect width="48" height="48" rx="12" fill="url(#logoBg)"/>
      
      <path d="M24 8L36 16H32L24 10L16 16H12L24 8Z" fill="url(#logoGold)"/>
      <rect x="11" y="16" width="26" height="18" rx="3" fill="url(#logoGold)"/>
      <rect x="20" y="22" width="8" height="12" rx="4" fill="#1a1a1a"/>
      <rect x="14" y="19" width="6" height="6" rx="1.5" fill="#1a1a1a"/>
      <rect x="28" y="19" width="6" height="6" rx="1.5" fill="#1a1a1a"/>
    </svg>
  );
};

export default function Logo({ size = "md", showText = true, variant = "dark", className = "" }: LogoProps) {
  const config = logoConfig[size];
  const textColor = variant === "dark" ? "text-gray-900" : variant === "admin" ? "text-slate-900" : "text-white";
  const subtextColor = variant === "dark" ? "text-gray-500" : variant === "admin" ? "text-slate-500" : "text-gray-400";

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center ${config.gap} group ${className}`}
      style={{ textDecoration: 'none' }}
    >
      <div 
        className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: config.icon, height: config.icon }}
      >
        <LogoIcon size={size} />
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
          style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.2), transparent)' }}
        />
      </div>
      
      {showText && (
        <div className="flex flex-col min-w-0">
          <span 
            className={`font-serif ${config.text} font-bold ${textColor} leading-tight tracking-tight whitespace-nowrap`}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            SS Furniture
          </span>
          <span 
            className={`${config.subtext} ${subtextColor} uppercase tracking-[0.2em] font-medium whitespace-nowrap`}
          >
            Premium Living
          </span>
        </div>
      )}
    </Link>
  );
}

export { LogoIcon };
