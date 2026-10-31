"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Does Brightloop really run at zero infrastructure cost?",
    answer:
      "Yes. Brightloop is architected to operate comfortably within the generous free tiers of Vercel Hobby, Supabase PostgreSQL, and Upstash Redis. Aggressive Redis caching and efficient PostgreSQL indexing ensure high throughput without surpassing free thresholds.",
  },
  {
    question: "How is role-based access control enforced?",
    answer:
      "Security is enforced in two complementary layers: every Next.js API route validates the signed JWT token and role claims (Admin, Staff, Customer), while PostgreSQL Row-Level Security (RLS) policies guarantee that tenant data remains isolated even at the direct database layer.",
  },
  {
    question: "What happens if a billing job fails partway through?",
    answer:
      "The nightly billing run utilizes a Redis distributed lock and idempotent database transactions protected by unique composite indexes (subscription_id, billing_period). If a step fails, the job can be safely retried without generating duplicate invoices or corrupting state.",
  },
  {
    question: "How fast is the dashboard with large data sets?",
    answer:
      "All primary dashboard aggregations and revenue charts are cached in Redis with a 60-second TTL and backed by server-side pagination and indexed foreign keys in PostgreSQL. Even with 5,000 customers and 40,000 seeded invoices, dashboards consistently load in under 2 seconds.",
  },
  {
    question: "What is out of scope for this build?",
    answer:
      "Direct international multi-currency conversions and complex custom enterprise tax engines are kept out of the core template to ensure lightweight maintainability, though clean extension hooks and interfaces are provided for Razorpay, Stripe, and custom tax adapters.",
  },
  {
    question: "How do you keep the team's code healthy?",
    answer:
      "We adhere to strict TypeScript strict-mode typing, Zod schema validation on all API requests and environment variables, Prisma schema migrations, ESLint rules, and end-to-end integration test suites covering auth, billing runs, and access controls.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 relative border-t border-slate-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Title */}
          <div className="lg:col-span-5">
            <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Frequently
              <br />
              Asked Questions
            </h2>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 divide-y divide-slate-800/80">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left py-2 text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors group"
                  >
                    <span className="pr-4 group-hover:text-cyan-300 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-3 text-sm text-slate-400 leading-relaxed animate-in fade-in-50 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
