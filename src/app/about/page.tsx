"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Users, Leaf, ArrowRight, Check, Star, Target, Shield, Globe, MapPin, Phone, Mail, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const values = [
  {
    icon: Award,
    title: "Exceptional Quality",
    description: "Every piece undergoes rigorous quality checks. We source only the finest materials and partner with master craftsmen.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Heart,
    title: "Timeless Design",
    description: "Our designs transcend trends. We create furniture that remains beautiful and relevant for generations.",
    color: "from-pink-500 to-rose-600"
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. From design consultation to delivery, we're with you every step.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "We're committed to environmental responsibility, using sustainably sourced materials and eco-friendly processes.",
    color: "from-emerald-500 to-teal-600"
  },
];

const milestones = [
  { year: "1999", event: "Founded in Vijayawada", description: "Started as a small family workshop with a vision for quality craftsmanship." },
  { year: "2005", event: "First Showroom", description: "Opened our 10,000 sq ft flagship showroom, bringing furniture dreams to life." },
  { year: "2010", event: "Digital Innovation", description: "Launched online presence, making our furniture accessible across India." },
  { year: "2015", event: "Community Growth", description: "Reached milestone of 1,000 happy customers and expanded our artisan team." },
  { year: "2020", event: "Green Initiative", description: "Introduced sustainable furniture line with eco-friendly materials." },
  { year: "2024", event: "25 Years Strong", description: "Celebrating a quarter-century of crafting excellence and happy homes." },
];

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "50K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "4.9", label: "Avg Rating" },
];

const promises = [
  "Handcrafted with precision",
  "Premium materials only",
  "Free delivery & setup",
  "10-year warranty",
  "Easy returns",
  "Expert design advice",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* HEADER */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Since 1999</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Crafting Excellence
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              SS Furniture began as a passion project in Vijayawada, driven by a simple belief: 
              everyone deserves beautiful, well-crafted furniture that transforms their living spaces into homes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" 
                  alt="SS Furniture craftsmanship" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <p className="text-3xl lg:text-4xl font-bold">25+</p>
                  <p className="text-[10px] lg:text-xs font-medium">Years</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
                <Heart className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Our Story</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                A Legacy of <span className="text-amber-600">Fine Craftsmanship</span>
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                What started as a family operation in Vijayawada has grown into one of Andhra Pradesh&apos;s most 
                trusted furniture brands, but our values remain unchanged.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Our team of skilled artisans brings together traditional woodworking techniques 
                with modern design innovation, resulting in furniture that honors the past 
                while embracing the future.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {promises.map((promise) => (
                  <div key={promise} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{promise}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl lg:rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <Target className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Our Values</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              What We Stand For
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Four core principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl lg:rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <Globe className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Our Journey</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              25 Years in the Making
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300 lg:-translate-x-1/2" />

            <div className="space-y-6">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12 lg:pl-0"
                >
                  <div className="absolute left-0 lg:left-1/2 top-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg transform lg:-translate-x-1/2 border-4 border-white">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 lg:max-w-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold text-amber-700">{item.year}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{item.event}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Visit Us</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Our Showroom
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MapPin, title: "Address", lines: ["MG Road, Vijayawada", "Andhra Pradesh"] },
              { icon: Phone, title: "Phone", lines: ["+91 98765 43210"] },
              { icon: Mail, title: "Email", lines: ["hello@ssfurniture.com"] },
              { icon: Clock, title: "Hours", lines: ["Mon-Sat: 10AM - 8PM", "Sunday: 11AM - 6PM"] },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all"
              >
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-500">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 rounded-full mb-4">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400">Our Promise</span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h2>

            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Visit our showroom or explore our collection online. We&apos;re here to help you find the perfect pieces.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                href="/products" 
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-full hover:bg-amber-400 transition-colors"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-full border border-white/20 hover:bg-white hover:text-gray-900 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
