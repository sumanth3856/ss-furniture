"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sofa, UtensilsCrossed, Armchair, Bed, Lamp, MapPin, Mail, Clock, Phone, Play, Truck, ShieldCheck, RefreshCw, Headphones, Star, ChevronRight, Sparkles, Heart, ShoppingBag, Award, TrendingUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/lib/data";
import { siteConfig } from "@/lib/config";

const categories = [
  { name: "Sofas", icon: Sofa, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", count: 12, color: "from-amber-500 to-orange-600" },
  { name: "Dining", icon: UtensilsCrossed, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", count: 8, color: "from-emerald-500 to-teal-600" },
  { name: "Seating", icon: Armchair, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80", count: 15, color: "from-violet-500 to-purple-600" },
  { name: "Bedroom", icon: Bed, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80", count: 10, color: "from-blue-500 to-indigo-600" },
  { name: "Lighting", icon: Lamp, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80", count: 20, color: "from-yellow-500 to-amber-600" },
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

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const featuredProducts = products.slice(0, 6);
  
  const testimonials = [
    { name: "Priya Sharma", role: "Interior Designer, Mumbai", text: "SS Furniture has transformed my clients' homes with their stunning collections. Exceptional quality and service!", rating: 5 },
    { name: "Rajesh Kumar", role: "Homeowner, Bangalore", text: "The craftsmanship is outstanding. Every piece feels premium and the delivery was seamless.", rating: 5 },
    { name: "Anita Desai", role: "Architect, Hyderabad", text: "I've recommended SS Furniture to over 50 clients. Their attention to detail is remarkable.", rating: 5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80" alt="Luxury interior" fill priority className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-[100vh] h-[100vh] border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/2 w-[80vh] h-[80vh] border border-white/5 rounded-full"
          />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-white/90 text-sm font-medium">Now Open in Vijayawada</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="block">
                  Craft Your
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.3 }}
                  className="block bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent"
                >
                  Dream Space
                </motion.span>
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
              >
                Discover handcrafted furniture that transforms your living spaces into havens of elegance and comfort.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/products" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-full hover:bg-amber-400 transition-colors"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Book Visit
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hidden md:flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {stats.slice(0, 4).map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-3 bg-white/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Browse Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Explore our curated collections designed to inspire and elevate every room in your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href="/products" className="block">
                  <div className="relative aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-lg`}>
                        <cat.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-1">{cat.name}</h3>
                      <p className="text-sm text-white/60">{cat.count} Products</p>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Trending Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Featured Products
              </h2>
            </div>
            <Link 
              href="/products" 
              className="group inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              View All Products
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 rounded-full mb-6">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400">Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Where Quality<br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Meets Craft</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                For over 25 years, we&apos;ve been crafting furniture that tells a story. Each piece is a labor of love, 
                designed to bring warmth and elegance to your home. Our master craftsmen combine traditional techniques 
                with modern design to create pieces that stand the test of time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/about" 
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-full hover:bg-amber-400 transition-colors"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-4 lg:space-y-6">
                  <div className="relative aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80" 
                      alt="Craftsmanship" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl lg:rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-5xl lg:text-6xl font-bold text-white mb-2">25+</p>
                      <p className="text-lg text-amber-100">Years of Excellence</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 lg:space-y-6 pt-8">
                  <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" 
                      alt="Furniture" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="relative aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80" 
                      alt="Lighting" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We&apos;re committed to delivering exceptional value and service with every purchase.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-gray-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentTestimonial === i ? 'bg-amber-500 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Visit Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Showroom
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Experience our furniture in person at our Vijayawada showroom.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: MapPin, title: "Address", lines: [siteConfig.address.street, `${siteConfig.address.city}, ${siteConfig.address.region}`] },
              { icon: Phone, title: "Phone", lines: [siteConfig.contact.phone] },
              { icon: Mail, title: "Email", lines: [siteConfig.contact.email] },
              { icon: Clock, title: "Hours", lines: ["Mon-Sat: 10AM - 8PM", "Sunday: 11AM - 6PM"] },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-amber-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-500">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl lg:rounded-full overflow-hidden"
          >
            <div className="absolute inset-0">
              <Image 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80" 
                alt="" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/80" />
            </div>
            
            <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-400">Limited Time Offer</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-lg text-gray-300 mb-0 lg:mb-6">
                  Use code <span className="font-bold text-amber-400">WELCOME10</span> at checkout. Visit our Vijayawada showroom or shop online.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link 
                  href="/products" 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-full hover:shadow-xl hover:shadow-gray-900/30 transition-all"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full border border-white/20 hover:bg-white hover:text-gray-900 transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
