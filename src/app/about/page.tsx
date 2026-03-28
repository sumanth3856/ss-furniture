"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Heart, Leaf } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";

const values = [
  {
    icon: Award,
    title: "Exceptional Quality",
    description: "Every piece undergoes rigorous quality checks. We source only the finest materials and partner with master craftsmen.",
  },
  {
    icon: Heart,
    title: "Timeless Design",
    description: "Our designs transcend trends. We create furniture that remains beautiful and relevant for generations.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. From design consultation to delivery, we're with you every step.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "We're committed to environmental responsibility, using sustainably sourced materials and eco-friendly processes.",
  },
];

const timeline = [
  { year: "1999", event: "Founded in a small workshop in Vijayawada" },
  { year: "2005", event: "Expanded to a 10,000 sq ft showroom" },
  { year: "2010", event: "Launched our first online store" },
  { year: "2015", event: "Reached 1,000 happy customers" },
  { year: "2020", event: "Introduced sustainable furniture line" },
  { year: "2024", event: "Celebrating 25 years of excellence" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-8 px-6 bg-gradient-to-b from-[#FAFAFA] to-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mt-6"
          >
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
              Our Story
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Crafting Excellence Since 1999
            </h1>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              SS Furniture began as a passion project in Vijayawada, driven by a simple belief: 
              everyone deserves beautiful, well-crafted furniture that transforms their living spaces into homes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
                  alt="SS Furniture Workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#1A1A1A] p-5 rounded-xl shadow-xl">
                <span className="text-3xl font-bold text-[#C9A96E]">25+</span>
                <p className="text-xs text-white/80">Years of Craft</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
                A Legacy of <span className="text-[#C9A96E]">Fine Craftsmanship</span>
              </h2>
              <p className="text-base text-[#6B6B6B] mb-4 leading-relaxed">
                What started as a family operation in Vijayawada has grown into one of Andhra Pradesh's most 
                trusted furniture brands, but our values remain unchanged. Every piece we 
                create carries the same dedication to quality that defined our earliest work.
              </p>
              <p className="text-base text-[#6B6B6B] mb-6 leading-relaxed">
                Our team of skilled artisans brings together traditional woodworking techniques 
                with modern design innovation, resulting in furniture that honors the past 
                while embracing the future.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#1A1A1A]">5K+</span>
                  <p className="text-xs text-[#6B6B6B]">Happy Customers</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#1A1A1A]">500+</span>
                  <p className="text-xs text-[#6B6B6B]">Products</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#1A1A1A]">1</span>
                  <p className="text-xs text-[#6B6B6B]">Showroom</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Values"
            title="What We Stand For"
            subtitle="Four core principles that guide everything we do"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 rounded-xl bg-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors duration-500 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 flex items-center justify-center mb-3 group-hover:bg-[#C9A96E]/30 transition-colors">
                    <Icon className="w-5 h-5 text-[#C9A96E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1 group-hover:text-white transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] group-hover:text-white/70 transition-colors">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Journey"
            title="25 Years in the Making"
          />

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C9A96E]/30 hidden md:block" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="inline-block px-3 py-1 bg-[#C9A96E] text-white text-sm font-bold rounded-full">
                      {item.year}
                    </span>
                    <p className="mt-3 text-base text-[#6B6B6B]">
                      {item.event}
                    </p>
                  </div>
                  <div className="hidden md:flex w-3 h-3 rounded-full bg-[#C9A96E] border-4 border-white shadow-lg z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-white mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-base text-white/70 mb-6 max-w-xl mx-auto">
              Experience our furniture in person at our Vijayawada showroom. 
              Our design consultants are ready to help you find the perfect pieces.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact"
                className="px-6 py-3 bg-[#C9A96E] text-[#1A1A1A] font-medium rounded-full hover:bg-[#D4B87A] transition-colors duration-300"
              >
                Schedule a Visit
              </a>
              <a
                href="/products"
                className="px-6 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
              >
                Shop Online
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
