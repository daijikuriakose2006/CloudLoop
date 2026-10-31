import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The nightly invoice run processed all 5,000 subscriptions in under five minutes with zero duplicates.",
    initials: "FL",
    name: "Freya Lindqvist",
    role: "Finance Lead, embedded analytics startup",
  },
  {
    quote:
      "Row-level security meant our customer portal passed its access-control tests on the first review.",
    initials: "MD",
    name: "Marcus Devane",
    role: "CTO, workflow software team",
  },
  {
    quote:
      "Dashboards open in well under two seconds even with 40,000 seeded invoices behind them.",
    initials: "PR",
    name: "Priya Raghavan",
    role: "Head of Finance, B2B SaaS company",
  },
  {
    quote:
      "The audit trail on every money-related change made our first external review painless.",
    initials: "TB",
    name: "Tomas Brozek",
    role: "Operations Manager, small software studio",
  },
  {
    quote:
      "We shipped a live billing product on free tiers and never paid for infrastructure.",
    initials: "AT",
    name: "Aiko Tanaka",
    role: "Founder, subscription tools startup",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What Finance Leads Say
          </h2>
        </div>

        {/* Layout: Left Cyan Card + Right Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Rating Card */}
          <div className="lg:col-span-3 rounded-2xl bg-[#7dd3fc] p-8 text-[#090d16] flex flex-col justify-end min-h-[260px] lg:min-h-full shadow-xl">
            <div>
              <div className="text-6xl font-black tracking-tight mb-2">4.8</div>
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-500 stroke-amber-500" />
                ))}
              </div>
              <div className="text-sm font-semibold text-slate-900/80">67 reviews</div>
            </div>
          </div>

          {/* Right Quote Cards Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border border-slate-800/90 bg-[#0e1322] p-7 text-white shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all ${
                  index === 4 ? "sm:col-span-2 md:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Cyan Quote Mark */}
                  <div className="text-2xl font-serif text-cyan-400 font-black mb-3 select-none">
                    ““
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6 font-normal">
                    {item.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <div className="h-8 w-8 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-xs font-bold text-cyan-300 shrink-0">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
