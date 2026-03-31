"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, Clock, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="py-8 px-6 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6"
          >
            <div className="w-16 h-16 bg-[#C9A96E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#C9A96E]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] font-serif mb-3">
              Privacy Policy
            </h1>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Last updated: March 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-black/5 p-8 md:p-10"
          >
            <div className="prose prose-gray max-w-none">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-black/5">
                <Lock className="w-5 h-5 text-[#C9A96E]" />
                <h2 className="text-lg font-semibold text-[#1A1A1A] m-0">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
                <p>
                  At SS Furniture, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
                </p>

                <h3 className="text-base font-semibold text-[#1A1A1A] mt-8 mb-4">
                  Personal Information
                </h3>
                <p>
                  We collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Register an account on our website</li>
                  <li>Place an order or make a purchase</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for support</li>
                  <li>Participate in promotions or surveys</li>
                </ul>

                <p>This information may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, phone number, and postal address</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                </ul>

                <div className="flex items-center gap-3 mb-6 pt-6 pb-6 border-t border-b border-black/5">
                  <Eye className="w-5 h-5 text-[#C9A96E]" />
                  <h2 className="text-lg font-semibold text-[#1A1A1A] m-0">
                    How We Use Your Information
                  </h2>
                </div>

                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <div className="flex items-center gap-3 mb-6 pt-6 pb-6 border-t border-b border-black/5">
                  <FileText className="w-5 h-5 text-[#C9A96E]" />
                  <h2 className="text-lg font-semibold text-[#1A1A1A] m-0">
                    Information Sharing
                  </h2>
                </div>

                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who assist in operating our website (payment processors, shipping partners)</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>

                <div className="flex items-center gap-3 mb-6 pt-6 pb-6 border-t border-b border-black/5">
                  <Clock className="w-5 h-5 text-[#C9A96E]" />
                  <h2 className="text-lg font-semibold text-[#1A1A1A] m-0">
                    Data Retention
                  </h2>
                </div>

                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. You may request deletion of your data at any time by contacting us.
                </p>

                <div className="flex items-center gap-3 mb-6 pt-6 pb-6 border-t border-b border-black/5">
                  <Shield className="w-5 h-5 text-[#C9A96E]" />
                  <h2 className="text-lg font-semibold text-[#1A1A1A] m-0">
                    Data Security
                  </h2>
                </div>

                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>

                <div className="flex items-center gap-3 mb-6 pt-6 pb-6 border-t border-b border-black/5">
                  <Mail className="w-5 h-5 text-[#C9A96E]" />
                  <h2 className="text-lg font-semibold text-[#1A1A1A] m-0">
                    Contact Us
                  </h2>
                </div>

                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#C9A96E]" />
                    <span className="text-[#1A1A1A]">MG Road, Vijayawada, Andhra Pradesh 520010</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C9A96E]" />
                    <span className="text-[#1A1A1A]">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C9A96E]" />
                    <span className="text-[#1A1A1A]">privacy@ssfurniture.in</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-black/5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#B8956A] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
