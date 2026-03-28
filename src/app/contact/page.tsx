"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useToast } from "@/components/Toast";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

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
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              Have a question about our products? Need design advice? 
              We're here to help you create the space of your dreams.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-black/5">
                <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-1">
                  Send Us a Message
                </h2>
                <p className="text-[#6B6B6B] mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-[#6B6B6B] max-w-md mx-auto">
                      Thank you for reaching out. We've received your message and our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                        setTouched({});
                        setErrors({});
                      }}
                      className="mt-6 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    ref={formRef}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          Full Name <span className="text-red-500" aria-hidden="true">*</span>
                          <span className="sr-only">(required)</span>
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
                            className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                              errors.name && touched.name
                                ? "border-red-500 bg-red-50"
                                : "border-black/10"
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
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          Email Address <span className="text-red-500" aria-hidden="true">*</span>
                          <span className="sr-only">(required)</span>
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
                            className={`w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                              errors.email && touched.email
                                ? "border-red-500 bg-red-50"
                                : "border-black/10"
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          Phone Number <span className="text-[#6B6B6B] font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 transition-colors bg-white cursor-pointer"
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
                      <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
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
                          className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                            errors.message && touched.message
                              ? "border-red-500 bg-red-50"
                              : "border-black/10"
                          }`}
                        />
                        {errors.message && touched.message && (
                          <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" aria-hidden="true" />
                        )}
                      </div>
                      {errors.message && touched.message ? (
                        <p id="message-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
                          {errors.message}
                        </p>
                      ) : (
                        <p id="message-hint" className="mt-1.5 text-sm text-[#6B6B6B]">
                          Minimum 10 characters
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
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
                          <Send className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#C9A96E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">Visit Us</h3>
                    <address className="not-italic text-[#6B6B6B] text-sm">
                      MG Road, Near Benz Circle<br />
                      Vijayawada, AP 520010
                    </address>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#C9A96E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">Call Us</h3>
                    <a 
                      href="tel:+919876543210" 
                      className="text-[#6B6B6B] hover:text-[#C9A96E] transition-colors text-sm"
                    >
                      +91 98765 43210
                    </a>
                    <p className="text-xs text-[#6B6B6B]">Mon-Sat, 10am-7pm IST</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#C9A96E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">Email Us</h3>
                    <a 
                      href="mailto:hello@ssfurniture.in" 
                      className="text-[#6B6B6B] hover:text-[#C9A96E] transition-colors text-sm"
                    >
                      hello@ssfurniture.in
                    </a>
                    <p className="text-xs text-[#6B6B6B]">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#C9A96E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1 text-sm">Showroom Hours</h3>
                    <p className="text-[#6B6B6B] text-sm">
                      Mon-Sat: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 px-6 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold text-[#C9A96E] mb-1">5K+</h3>
              <p className="text-white/70 text-sm">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-3xl font-bold text-[#C9A96E] mb-1">500+</h3>
              <p className="text-white/70 text-sm">Products</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-[#C9A96E] mb-1">&lt; 24h</h3>
              <p className="text-white/70 text-sm">Response Time</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
