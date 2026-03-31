"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, MessageCircle, Headphones, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useToast } from "@/components/Toast";
import { siteConfig } from "@/lib/config";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Showroom",
    lines: ["MG Road, Near Benz Circle", "Vijayawada, AP 520010"],
    link: "https://maps.google.com",
    linkText: "Get Directions"
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 98765 43210"],
    link: "tel:+919876543210",
    linkText: "Tap to Call"
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@ssfurniture.com"],
    link: `mailto:${siteConfig.contact.email}`,
    linkText: "Send Email"
  },
  {
    icon: Clock,
    title: "Showroom Hours",
    lines: ["Mon-Sat: 10:00 AM - 8:00 PM", "Sunday: 11:00 AM - 6:00 PM"],
    link: null,
    linkText: null
  },
];

const quickActions = [
  { icon: MessageCircle, label: "Live Chat", sublabel: "Available 24/7", color: "from-emerald-500 to-teal-600" },
  { icon: Phone, label: "Callback", sublabel: "Request a call", color: "from-blue-500 to-indigo-600" },
  { icon: Truck, label: "Track Order", sublabel: "Check status", color: "from-purple-500 to-pink-600" },
];

const stats = [
  { value: "< 24h", label: "Response Time" },
  { value: "4.9", label: "Avg Rating" },
  { value: "5K+", label: "Messages Handled" },
  { value: "98%", label: "Satisfaction" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (["name", "email", "message"].includes(key)) {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      showToast("Please fix the errors in the form", "error");
      const firstErrorField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement;
      firstErrorField?.focus();
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      showToast("Message sent successfully! We'll get back to you soon.", "success");
    } catch {
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* STICKY HEADER */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full mb-4">
              <Headphones className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">We&apos;re Here to Help</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
              Have a question about our products? Need design advice? 
              Our team is ready to help you create the space of your dreams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-gray-900">Send Us a Message</h2>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12"
                      role="status"
                      aria-live="polite"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                          setTouched({});
                          setErrors({});
                        }}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-gray-900/30 transition-all"
                      >
                        Send Another Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      ref={formRef}
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                      noValidate
                      key="form"
                    >
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="group">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              aria-required="true"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "name-error" : undefined}
                              placeholder="John Smith"
                              className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none focus:ring-0 ${
                                errors.name && touched.name
                                  ? "border-red-500 bg-red-50/50 focus:border-red-500"
                                  : "border-gray-100 focus:border-amber-500 bg-gray-50/50"
                              }`}
                            />
                            {errors.name && touched.name && (
                              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" aria-hidden="true" />
                            )}
                          </div>
                          {errors.name && touched.name && (
                            <p id="name-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="group">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              aria-required="true"
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? "email-error" : undefined}
                              placeholder="john@example.com"
                              className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all focus:outline-none focus:ring-0 ${
                                errors.email && touched.email
                                  ? "border-red-500 bg-red-50/50 focus:border-red-500"
                                  : "border-gray-100 focus:border-amber-500 bg-gray-50/50"
                              }`}
                            />
                            {errors.email && touched.email && (
                              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" aria-hidden="true" />
                            )}
                          </div>
                          {errors.email && touched.email && (
                            <p id="email-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                            Phone <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-amber-500 focus:outline-none focus:ring-0 bg-gray-50/50 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                            Subject
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-amber-500 focus:outline-none focus:ring-0 bg-gray-50/50 transition-all cursor-pointer"
                          >
                            <option value="">Select a topic</option>
                            <option value="general">General Inquiry</option>
                            <option value="product">Product Question</option>
                            <option value="order">Order Status</option>
                            <option value="design">Design Consultation</option>
                            <option value="feedback">Feedback</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-required="true"
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-error" : "message-hint"}
                            rows={5}
                            placeholder="Tell us how we can help you..."
                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all resize-none focus:outline-none focus:ring-0 ${
                              errors.message && touched.message
                                ? "border-red-500 bg-red-50/50 focus:border-red-500"
                                : "border-gray-100 focus:border-amber-500 bg-gray-50/50"
                            }`}
                          />
                          {errors.message && touched.message && (
                            <AlertCircle className="absolute right-3 top-4 w-5 h-5 text-red-500" aria-hidden="true" />
                          )}
                        </div>
                        {errors.message && touched.message ? (
                          <p id="message-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                            {errors.message}
                          </p>
                        ) : (
                          <p id="message-hint" className="mt-1.5 text-sm text-gray-400">
                            Minimum 10 characters
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* SIDEBAR */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* CONTACT INFO CARDS */}
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20 shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                        {info.lines.map((line, i) => (
                          <p key={i} className="text-sm text-gray-500">{line}</p>
                        ))}
                        {info.link && (
                          <a 
                            href={info.link}
                            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                          >
                            {info.linkText}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* QUICK ACTIONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl p-5"
              >
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-white">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP / VISUAL SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" 
                  alt="SS Furniture Showroom" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">SS Furniture Showroom</h3>
                      <p className="text-white/80 text-sm">MG Road, Vijayawada</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Why Visit Us</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Experience Our Furniture <span className="text-amber-600">in Person</span>
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Visit our showroom to see, touch, and experience our furniture firsthand. 
                Our design consultants are ready to help you find the perfect pieces for your home.
              </p>

              <div className="space-y-4">
                {[
                  "Explore our full collection of premium furniture",
                  "Get personalized design advice from our experts",
                  "See fabric and material samples up close",
                  "Enjoy complimentary coffee and refreshments"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/products" 
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-gray-900/30 transition-all"
              >
                Browse Collection
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-2xl">
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

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 rounded-full mb-4">
              <Headphones className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400">Need Help?</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Cannot find what you are looking for?
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
              Our team is always ready to help. Reach out and we will get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                href="tel:+919876543210"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-full hover:bg-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
              <Link 
                href="mailto:hello@ssfurniture.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
