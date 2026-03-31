"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import Logo from "./Logo";

const footerLinks = {
  quickLinks: [
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Showroom", href: "/contact" },
  ],
  categories: [
    { label: "Sofas", href: "/products?category=sofas" },
    { label: "Tables", href: "/products?category=tables" },
    { label: "Chairs", href: "/products?category=chairs" },
    { label: "Bedroom", href: "/products?category=bedroom" },
    { label: "Lighting", href: "/products?category=lighting" },
  ],
  support: [
    { label: "FAQ", href: "/contact" },
    { label: "Shipping", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "Warranty", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Logo size="lg" variant="light" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium furniture crafted with passion for modern living. Transform your space with our curated collections.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex gap-3 mt-6">
              {["F", "I", "P", "T"].map((s, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-amber-500/20 transition-colors group" aria-label={`Social ${s}`}>
                  <span className="text-sm text-gray-400 group-hover:text-amber-400">{s}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex items-center gap-1 text-gray-400 hover:text-amber-400 transition-colors text-sm group">
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex items-center gap-1 text-gray-400 hover:text-amber-400 transition-colors text-sm group">
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex items-center gap-1 text-gray-400 hover:text-amber-400 transition-colors text-sm group">
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-amber-500" />
                <span>{siteConfig.address.street}, {siteConfig.address.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-amber-500" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-amber-500" />
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all mt-6 shadow-lg shadow-amber-500/25"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} SS Furniture. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all">Privacy Policy</Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all">Terms of Service</Link>
            <Link href="/contact" className="px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
