import React from "react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 overflow-hidden">
      {/* Background Laptop Mockup with Dark Overlay and Grid */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-35 pointer-events-none select-none">
        <div className="relative w-full max-w-5xl h-[520px] sm:h-[620px] overflow-hidden rounded-3xl">
          <Image
            src="/images/hero-laptop.jpg"
            alt="Brightloop Billing and Revenue Dashboard"
            fill
            priority
            className="object-cover object-center filter contrast-125"
          />
          {/* Radial dark gradient mask */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#06080e]/80 to-[#06080e]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/60 to-transparent" />
        </div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-grid-cyan opacity-40 pointer-events-none" />

      {/* Ambient Top Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-64 w-[36rem] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-950/40 px-4 py-1.5 text-xs sm:text-sm font-mono text-sky-300 backdrop-blur-sm mb-8 shadow-[0_0_15px_-3px_rgba(56,189,248,0.2)]">
          Subscription billing by Brightloop Software
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Billing that runs itself,
          <br />
          revenue you can see
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-10 text-center">
          Brightloop turns products and plans into recurring invoices,
          tracks payments and shows live revenue to admins, staff
          and customers, with access control enforced in the API and
          the database.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-white px-7 py-3 text-sm sm:text-base font-semibold text-[#0a0e1a] shadow-lg shadow-white/10 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Log in to dashboard
          </Link>
          <Link
            href="/login?mode=signup"
            className="rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm sm:text-base font-medium text-slate-200 hover:border-slate-500 hover:text-white hover:bg-slate-800 transition-all active:scale-95"
          >
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}
