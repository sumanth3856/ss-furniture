"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sofa, UtensilsCrossed, Armchair, Bed, Lamp, Truck, ShieldCheck, RefreshCw, Headphones, Star, ChevronRight, Sparkles, Heart, ShoppingBag, Award, TrendingUp, Quote, MapPin, Mail, Clock, Phone } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";
import { siteConfig } from "@/lib/config";

const categories = [
  { name: "Sofas", icon: Sofa, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80", count: 12, color: "from-amber-500 to-orange-600" },
  { name: "Dining", icon: UtensilsCrossed, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80", count: 8, color: "from-emerald-500 to-teal-600" },
  { name: "Seating", icon: Armchair, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80", count: 15, color: "from-violet-500 to-purple-600" },
  { name: "Bedroom", icon: Bed, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80", count: 10, color: "from-blue-500 to-indigo-600" },
  { name: "Lighting", icon: Lamp, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80", count: 20, color: "from-yellow-500 to-amber-600" },
];

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹15,000", color: "bg-blue-50 text-blue-600" },
  { icon: ShieldCheck, title: "10-Year Warranty", desc: "Full coverage included", color: "bg-green-50 text-green-600" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free", color: "bg-purple-50 text-purple-600" },
  { icon: Headphones, title: "Expert Support", desc: "Design consultants", color: "bg-orange-50 text-orange-600" },
];

const stats = [
  { value: "25+", label: "Years Experience", icon: Award },
  { value: "50K+", label: "Happy Customers", icon: Heart },
  { value: "500+", label: "Products", icon: ShoppingBag },
  { value: "4.9", label: "Avg Rating", icon: Star },
];

const testimonials = [
  { name: "Priya Sharma", role: "Interior Designer, Mumbai", text: "SS Furniture has transformed my clients' homes with their stunning collections. Exceptional quality and service!", rating: 5, avatar: "PS" },
  { name: "Rajesh Kumar", role: "Homeowner, Bangalore", text: "The craftsmanship is outstanding. Every piece feels premium and the delivery was seamless.", rating: 5, avatar: "RK" },
  { name: "Anita Desai", role: "Architect, Hyderabad", text: "I've recommended SS Furniture to over 50 clients. Their attention to detail is remarkable.", rating: 5, avatar: "AD" },
];

const featuredProducts = products.slice(0, 6);

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const totalSlides = categories.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* PREMIUM CAROUSEL SECTION */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Background Slides */}
        <div className="absolute inset-0">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 sm:pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-3 sm:mb-4">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                <span className="text-white/90 text-[10px] sm:text-xs font-medium uppercase tracking-wider">Featured</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                {categories[currentSlide].name}
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-6 max-w-md">
                Premium {categories[currentSlide].name.toLowerCase()} collection crafted with exceptional quality.
              </p>
              
              <Link 
                href="/products" 
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all text-sm sm:text-base"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex items-center justify-start gap-2 sm:gap-3 mt-6 sm:mt-8">
              {categories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentSlide 
                      ? "w-8 sm:w-10 md:w-12 bg-white" 
                      : "w-6 sm:w-8 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-start gap-1.5 sm:gap-2 py-2 sm:py-3 overflow-x-auto scrollbar-hide">
              {categories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => { setCurrentSlide(i); setIsPaused(true); }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all duration-300 text-xs sm:text-sm ${
                    i === currentSlide
                      ? "bg-white text-gray-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <cat.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gray-900 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-0.5">
                  <stat.icon className="w-4 h-4 text-amber-400" />
                  <span className="text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SHOWCASE */}
      <section className="py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-2">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Collections</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Browse by Category</h2>
            </div>
            <Link 
              href="/products" 
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/products" className="group block">
                <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-md">
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    fill 
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-1 md:mb-2 shadow-lg`}>
                      <cat.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-white">{cat.name}</h3>
                    <p className="text-[10px] md:text-xs text-white/60">{cat.count} Products</p>
                  </div>

                  <div className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/products" className="md:hidden flex items-center justify-center gap-2 mt-4 text-amber-600 font-medium text-sm">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-2">
                <TrendingUp className="w-3 h-3 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Trending</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Products</h2>
            </div>
            <Link 
              href="/products" 
              className="hidden md:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors text-sm"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors text-sm"
            >
              Explore All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">Committed to delivering exceptional value and service with every purchase.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-0.5">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-2">
              <Star className="w-3 h-3 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Reviews</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">What Customers Say</h2>
          </div>

          <div className="relative">
            <div className="absolute -top-2 -left-2 text-6xl md:text-8xl text-amber-200 opacity-50">
              <Quote className="w-12 h-12 md:w-16 md:h-16" />
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 relative">
              <div className="flex gap-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8 italic">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </p>
              
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base">{testimonials[currentTestimonial].name}</p>
                  <p className="text-xs md:text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${currentTestimonial === i ? 'bg-amber-500 w-4 md:w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-2">
              <MapPin className="w-3 h-3 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Location</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Visit Our Showroom</h2>
            <p className="text-sm text-gray-500">Experience our furniture in person at our Vijayawada showroom.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: MapPin, title: "Address", lines: [siteConfig.address.street, `${siteConfig.address.city}, ${siteConfig.address.region}`] },
              { icon: Phone, title: "Phone", lines: [siteConfig.contact.phone] },
              { icon: Mail, title: "Email", lines: [siteConfig.contact.email] },
              { icon: Clock, title: "Hours", lines: ["Mon-Sat: 10AM - 8PM", "Sunday: 11AM - 6PM"] },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-amber-50 transition-colors group">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg md:rounded-xl flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-xs md:text-sm text-gray-500">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-10 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80" 
                alt="" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/80" />
            </div>
            
            <div className="relative z-10 px-6 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full mb-3">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">Limited Time</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                  Use code <span className="font-bold text-amber-400">WELCOME10</span> at checkout.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-amber-500 text-gray-900 font-bold rounded-full hover:bg-amber-400 transition-colors text-sm"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full border border-white/20 hover:bg-white hover:text-gray-900 transition-all text-sm"
                >
                  Book Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
