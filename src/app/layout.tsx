import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import { ToastProvider } from "@/components/Toast";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
} from "@/lib/structuredData";
import { siteConfig } from "@/lib/config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SS Furniture | Premium Furniture for Modern Living",
    template: "%s | SS Furniture",
  },
  description: "Discover meticulously crafted furniture that transforms your home into a sanctuary of style and comfort. Shop sofas, tables, chairs, bedroom sets, and lighting.",
  keywords: ["furniture", "premium furniture", "modern furniture", "sofas", "tables", "chairs", "bedroom furniture", "lighting"],
  authors: [{ name: "SS Furniture" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "SS Furniture | Premium Furniture for Modern Living",
    description: "Discover meticulously crafted furniture that transforms your home into a sanctuary of style and comfort.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "SS Furniture - Premium Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Furniture | Premium Furniture for Modern Living",
    description: "Discover meticulously crafted furniture that transforms your home.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%231A1A1A' rx='15' width='100' height='100'/><text y='.9em' x='50%' text-anchor='middle' font-size='70' fill='%23C9A96E'>S</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebSiteStructuredData();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationData, websiteData]),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] antialiased">
        <ErrorBoundary>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <SiteLayout>{children}</SiteLayout>
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
