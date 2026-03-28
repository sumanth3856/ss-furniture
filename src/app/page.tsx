"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sofa, UtensilsCrossed, Armchair, Bed, Lamp, Phone, MapPin, Mail, Clock, Play, Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { products } from "@/lib/data";

const categories = [
  { name: "Sofas", icon: Sofa, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", count: 12 },
  { name: "Dining", icon: UtensilsCrossed, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", count: 8 },
  { name: "Seating", icon: Armchair, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80", count: 15 },
  { name: "Bedroom", icon: Bed, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80", count: 10 },
  { name: "Lighting", icon: Lamp, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80", count: 20 },
];

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹15,000" },
  { icon: ShieldCheck, title: "10-Year Warranty", desc: "Full coverage included" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free" },
  { icon: Headphones, title: "Expert Support", desc: "Design consultants" },
];

const stats = [
  { value: "25+", label: "Years" },
  { value: "50K+", label: "Customers" },
  { value: "500+", label: "Products" },
  { value: "15", label: "Showrooms" },
];

export default function HomePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION - Single immersive hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80" alt="Luxury living room" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-xl">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-white/90 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full" /> Now Open in Vijayawada
            </motion.span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="block">Transform Your</motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="block text-[#C9A96E]">Living Space</motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-base md:text-lg text-white/70 mb-8 max-w-md">
              Premium furniture crafted with passion. From elegant sofas to stunning lighting — find pieces that reflect your unique style.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A96E] text-[#1A1A1A] font-semibold rounded-full hover:bg-[#D4B87A] transition-all shadow-lg shadow-[#C9A96E]/25">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur text-white font-medium rounded-full hover:bg-white hover:text-[#1A1A1A] transition-all border border-white/20">
                <Play className="w-4 h-4" /> Book Visit
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 divide-x divide-black/5">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="py-5 text-center">
                <span className="block text-xl md:text-2xl font-bold text-[#1A1A1A] font-serif">{stat.value}</span>
                <span className="text-xs text-[#6B6B6B]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Shop By Room</span>
              <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] font-serif mt-1">Find Your Style</h2>
            </div>
            <Link href="/products" className="text-sm font-medium text-[#C9A96E] hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                <Link href="/products" className="block group">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image src={cat.image} alt={cat.name} fill sizes="20vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/15 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <cat.icon className="w-4 h-4 text-[#C9A96E] mb-1" />
                      <h3 className="text-sm font-bold text-white">{cat.name}</h3>
                      <p className="text-xs text-white/60">{cat.count} items</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-10 px-6 bg-gradient-to-b from-[#FAFAFA] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Featured</span>
              <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] font-serif mt-1">Bestselling Pieces</h2>
            </div>
            <Link href="/products" className="text-sm font-medium text-[#C9A96E] hover:underline">View All →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section ref={targetRef} className="py-12 px-6 relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-5">
          <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80" alt="" fill className="object-cover" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Our Promise</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] font-serif mt-2 mb-4">
                Where Quality<br /><span className="text-[#C9A96E]">Meets Design</span>
              </h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
                For over 25 years, we've been crafting furniture that tells a story. Each piece is a labor of love, designed to bring warmth and elegance to your home.
              </p>
              <div className="flex gap-3">
                <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded-full hover:bg-[#2C2C2C] transition-colors">
                  Our Story <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1A1A1A] text-[#1A1A1A] text-sm font-medium rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors">
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80" alt="Craftsman" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-square rounded-xl bg-[#C9A96E] flex items-end p-4">
                    <span className="text-3xl font-bold text-white font-serif">25+</span>
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" alt="Sofa" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" alt="Lamp" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 px-6 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A96E] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#C9A96E] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 text-center">
                <div className="w-10 h-10 bg-[#C9A96E]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-white/50">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Showroom</span>
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] font-serif mt-1">Visit Us in Vijayawada</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MapPin, title: "Address", lines: ["MG Road, Near Benz Circle", "Vijayawada, AP 520010"] },
              { icon: Phone, title: "Phone", lines: ["+91 98765 43210", "Mon-Sat: 10AM - 8PM"] },
              { icon: Mail, title: "Email", lines: ["hello@ssfurniture.in", "Reply within 24h"] },
              { icon: Clock, title: "Hours", lines: ["Mon-Sat: 10AM - 8PM", "Sunday: 11AM - 6PM"] },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl p-4 shadow-sm border border-black/5">
                <item.icon className="w-5 h-5 text-[#C9A96E] mb-2" />
                <h3 className="text-xs font-semibold text-[#1A1A1A] mb-1">{item.title}</h3>
                {item.lines.map((line, j) => <p key={j} className="text-xs text-[#6B6B6B]">{line}</p>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/85 to-transparent" />
            </div>
            <div className="relative z-10 px-8 md:px-12 py-12 md:py-16 max-w-xl">
              <span className="inline-block px-3 py-1 bg-[#C9A96E]/20 text-[#C9A96E] text-xs font-medium rounded-full mb-4">Limited Offer</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-3">
                Get 10% Off<br />Your First Order
              </h2>
              <p className="text-sm text-white/70 mb-6">Use code WELCOME10 at checkout. Visit our Vijayawada showroom or shop online.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A96E] text-[#1A1A1A] font-semibold text-sm rounded-full hover:bg-[#D4B87A] transition-colors">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-medium text-sm rounded-full hover:bg-white hover:text-[#1A1A1A] transition-colors border border-white/20">
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & FAQ */}
      <Testimonials />
      <FAQ />

      {/* FOOTER */}
      <footer className="py-10 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#C9A96E] rounded-lg flex items-center justify-center">
                  <span className="text-[#1A1A1A] font-serif text-lg font-bold">S</span>
                </div>
                <span className="font-serif text-lg font-bold text-white">SS Furniture</span>
              </Link>
              <p className="text-sm text-white/50 leading-relaxed mb-4">Premium furniture crafted with passion for modern living.</p>
              <div className="flex gap-2">
                {["F", "I", "P", "T"].map((s, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#C9A96E]/20 transition-colors">
                    <span className="text-xs text-white/50">{s}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                {["Products", "About", "Contact", "Showroom"].map(l => (
                  <li key={l}><Link href={`/${l.toLowerCase()}`} className="text-sm text-white/50 hover:text-[#C9A96E] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Categories</h4>
              <ul className="space-y-2">
                {["Sofas", "Tables", "Chairs", "Bedroom", "Lighting"].map(l => (
                  <li key={l}><Link href="/products" className="text-sm text-white/50 hover:text-[#C9A96E] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>MG Road, Near Benz Circle, Vijayawada, AP 520010</span></li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /><span>+91 98765 43210</span></li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>hello@ssfurniture.in</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2024 SS Furniture. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-white/30">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Refund</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
