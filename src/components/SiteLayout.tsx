"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AnnouncementBanner from "./AnnouncementBanner";
import Navigation from "./Navigation";
import BottomNav from "./BottomNav";
import BackToTop from "./BackToTop";
import CookieConsent from "./CookieConsent";
import PageTransition from "./PageTransition";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C9A96E] focus:text-white focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>

      <AnnouncementBanner />
      <Navigation />

      <PageTransition>
        <main id="main-content" className="pb-24 md:pb-0" tabIndex={-1}>
          {children}
        </main>
      </PageTransition>

      <BottomNav />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
