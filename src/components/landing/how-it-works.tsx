import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How Brightloop works
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            One Next.js app on Vercel holds the secrets and touches the data; the
            browser never talks to PostgreSQL or Redis directly.
          </p>
        </div>

        {/* 3 Alternating Items */}
        <div className="space-y-24">
          {/* Row 1: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 relative group">
              <div className="relative h-[280px] sm:h-[360px] w-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-cyan-950/20 group-hover:border-cyan-500/30 transition-all">
                <Image
                  src="/images/feature-desk-1.jpg"
                  alt="Security enforced in both layers"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080e]/40 via-transparent to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-8 h-1 bg-cyan-400 rounded-full mb-5" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Security enforced in both layers
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Self-registration always creates a Customer; Staff accounts are invited
                by an Admin. Roles travel in the signed JWT and row-level security
                restricts each customer to their own rows.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>role check on every route</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>row-level security in PostgreSQL</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>customer sees own data only</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2: Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="w-8 h-1 bg-cyan-400 rounded-full mb-5" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Billing runs on schedule, safely
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Vercel Cron calls a secret-protected job at 20:30 UTC. It takes a Redis
                lock, creates due invoices in batches, marks overdue accounts and
                emails reminders, with a GitHub Actions retry behind it.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>batches of 500 invoices</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>unique (subscription, period) index</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>automatic overdue and renewal flags</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 relative group">
              <div className="relative h-[280px] sm:h-[360px] w-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-cyan-950/20 group-hover:border-cyan-500/30 transition-all">
                <Image
                  src="/images/feature-desk-2.jpg"
                  alt="Billing runs on schedule, safely"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080e]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Row 3: Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 relative group">
              <div className="relative h-[280px] sm:h-[360px] w-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-cyan-950/20 group-hover:border-cyan-500/30 transition-all">
                <Image
                  src="/images/feature-desk-1.jpg"
                  alt="Dashboards that stay fast"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080e]/40 via-transparent to-transparent" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-8 h-1 bg-cyan-400 rounded-full mb-5" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Dashboards that stay fast
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                The API verifies the token, checks the Redis revoked-token list, applies
                rate limits and validates the body with Zod before writing to
                PostgreSQL inside a transaction.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>server-side pagination</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>indexed foreign keys</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="h-4 w-4 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400 shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span>sub-2-second dashboard load</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
