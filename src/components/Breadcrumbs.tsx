"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  products: "Products",
  about: "About",
  contact: "Contact",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => ({
      label: routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + segments.slice(0, index + 1).join("/"),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-[#6B6B6B]" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="text-[#1A1A1A] font-medium" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[#6B6B6B] hover:text-[#C9A96E] transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
