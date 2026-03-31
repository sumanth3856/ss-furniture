"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "dark" | "light" | "admin";
  className?: string;
}

const logoSizes = {
  sm: { icon: 32, text: "text-base", subtext: "text-[8px]" },
  md: { icon: 40, text: "text-lg", subtext: "text-[9px]" },
  lg: { icon: 48, text: "text-xl", subtext: "text-[10px]" },
};

const LogoIconSVG = ({ size = "md", variant = "dark" }: { size?: "sm" | "md" | "lg"; variant?: "dark" | "light" | "admin" }) => {
  const s = logoSizes[size];
  
  const isLight = variant === "light";
  const primaryColor = isLight ? "#C9A96E" : "#C9A96E";
  const secondaryColor = isLight ? "#E8D5B7" : "#B8956A";
  const bgColor = isLight ? "#F5F5F5" : "#1a1a1a";
  const strokeColor = isLight ? "#333333" : "#ffffff";
  const subTextColor = isLight ? "#666666" : "#999999";

  return (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-${Math.round(s.icon / 4)} h-${Math.round(s.icon / 4)}`}
      suppressHydrationWarning
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E4BA" />
          <stop offset="50%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.15"/>
        </filter>
      </defs>
      
      <rect x="4" y="4" width="48" height="48" rx="14" fill={bgColor} />
      
      <g filter="url(#logoShadow)">
        <path
          d="M28 12L40 18V32L28 38L16 32V18L28 12Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        
        <path
          d="M22 24H34M22 28H34M22 32H30"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        <circle cx="28" cy="22" r="3" fill="url(#goldShine)" />
        
        <path
          d="M20 40C20 38.8954 20.8954 38 22 38H34C35.1046 38 36 38.8954 36 40V44H20V40Z"
          fill="url(#goldGradient)"
          fillOpacity="0.3"
        />
        
        <path
          d="M24 44V48M32 44V48"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      
      <path
        d="M20 18V32C20 33.1046 20.8954 34 22 34H34C35.1046 34 36 33.1046 36 32V18"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      <path
        d="M23 22H33M23 28H33"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
};

export default function Logo({ size = "md", showText = true, variant = "dark", className = "" }: LogoProps) {
  const s = logoSizes[size];
  const textColor = variant === "dark" ? "text-gray-900" : variant === "admin" ? "text-slate-900" : "text-white";
  const subtextColor = variant === "dark" ? "text-gray-500" : variant === "admin" ? "text-slate-500" : "text-gray-400";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <LogoIconSVG size={size} variant={variant} />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif ${s.text} font-bold ${textColor} leading-tight tracking-tight`}>
            SS Furniture
          </span>
          <span className={`${s.subtext} ${subtextColor} uppercase tracking-[0.2em] font-medium`}>
            Premium Living
          </span>
        </div>
      )}
    </Link>
  );
}

export { LogoIconSVG };
