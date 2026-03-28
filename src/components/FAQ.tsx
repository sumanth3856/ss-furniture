"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is your delivery process?",
    answer: "We offer free white-glove delivery on all orders over $999. Our team will deliver your furniture to the room of your choice, unpack it, and assemble it for you. Delivery times vary by product availability, typically ranging from 5-14 business days.",
  },
  {
    question: "Do you offer assembly services?",
    answer: "Yes! White-glove delivery includes complete assembly in your desired room. Our trained professionals will handle everything from unpacking to final placement and removal of all packaging materials.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, contact us to arrange a return. Items must be in original condition. Refunds are processed within 5-7 business days after we receive the returned item.",
  },
  {
    question: "How long is the warranty coverage?",
    answer: "All SS Furniture pieces come with a 10-year manufacturer warranty covering defects in materials and craftsmanship. This warranty does not cover normal wear and tear or damage caused by misuse. Register your product online to activate your warranty.",
  },
  {
    question: "Can I customize my furniture?",
    answer: "Yes! We offer custom upholstery options including fabric selection, leather grades, and color choices for many of our sofas and chairs. Some pieces also offer size variations. Contact our design consultants for customization options and pricing.",
  },
  {
    question: "How do I care for my furniture?",
    answer: "Care instructions vary by material. Leather pieces should be conditioned every 6-12 months. Fabric upholstery can be spot-cleaned with mild detergent. Wood furniture should be dusted regularly and kept away from direct sunlight. Detailed care guides are included with every purchase.",
  },
  {
    question: "Do you have showrooms I can visit?",
    answer: "We have 15 showrooms across the country. Visit our Contact page for locations and hours. You can also book a private appointment with one of our design consultants for a personalized showroom experience.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and offer financing through Affirm with options for 0% APR for qualified buyers. Corporate and bulk orders can be processed with NET 30 terms upon credit approval.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQAccordionItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-black/10 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 rounded-lg"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-medium text-[#1A1A1A] pr-8">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <p className="pb-5 text-[#6B6B6B] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A96E]">
            FAQ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#6B6B6B]">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#6B6B6B] mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white font-medium rounded-full hover:bg-[#2C2C2C] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
