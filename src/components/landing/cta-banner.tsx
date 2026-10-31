import React from "react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-t border-slate-900">
      {/* Background radial cyan glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Ready to automate
          <br />
          your billing lifecycle?
        </h2>

        <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed mb-10">
          Admins, finance leads, staff and customers each get their own
          workspace with data scoped to their role.
        </p>

        <Link
          href="/login"
          className="rounded-xl bg-white px-8 py-3.5 text-sm sm:text-base font-semibold text-[#0a0e1a] shadow-xl shadow-cyan-500/10 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Log in to Brightloop
        </Link>
      </div>
    </section>
  );
}
