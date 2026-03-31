"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "SS Furniture has transformed every project I've worked on. The quality is exceptional, and the attention to detail in each piece is remarkable. My clients are always thrilled with the results.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "We furnished our entire living room with SS Furniture pieces. The Milano Sofa is absolutely stunning and incredibly comfortable. The delivery team was professional and handled everything with care.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Real Estate Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "For our luxury condo projects, SS Furniture is our go-to. Their pieces add that perfect touch of elegance that our high-end buyers expect. Exceptional quality at every price point.",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Restaurant Owner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "The dining tables and chairs from SS Furniture have elevated our restaurant's ambiance significantly. Customers constantly compliment the furniture. Built to last through years of heavy use.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their spaces with SS Furniture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#FAFAFA] rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C9A96E]/20" aria-hidden="true" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">{testimonial.name}</h4>
                  <p className="text-sm text-[#6B6B6B]">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-[#C9A96E] fill-[#C9A96E]" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-[#6B6B6B] leading-relaxed text-sm">
                &quot;{testimonial.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-[#FAFAFA] rounded-full">
            <div>
              <span className="text-2xl font-bold text-[#1A1A1A]">4.9/5</span>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C9A96E] fill-[#C9A96E]" />
                ))}
              </div>
            </div>
            <div className="h-8 w-px bg-black/10" />
            <div>
              <span className="text-2xl font-bold text-[#1A1A1A]">12,500+</span>
              <p className="text-sm text-[#6B6B6B]">Happy Customers</p>
            </div>
            <div className="h-8 w-px bg-black/10" />
            <div>
              <span className="text-2xl font-bold text-[#1A1A1A]">98%</span>
              <p className="text-sm text-[#6B6B6B]">Would Recommend</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
