"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between rounded-full border border-slate-800/80 bg-[#0a0e1a]/85 px-4 sm:px-6 py-2.5 backdrop-blur-md shadow-lg shadow-black/40 transition-all">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7dd3fc] text-[#0a0e1a] font-black text-base shadow-sm group-hover:bg-[#38bdf8] transition-colors">
            B
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
            Brightloop
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#home" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#services" className="hover:text-white transition-colors">
            Services
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right CTA Links & Phone */}
        <div className="hidden sm:flex items-center gap-4 lg:gap-6">
          <a
            href="tel:4155550142"
            className="flex items-center gap-1.5 text-xs lg:text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>(415) 555-0142</span>
          </a>

          <Link
            href="/login?mode=signup"
            className="rounded-full px-4 py-1.5 text-xs lg:text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            Sign up
          </Link>

          <Link
            href="/login"
            className="rounded-full bg-[#7dd3fc] px-4 py-1.5 text-xs lg:text-sm font-semibold text-[#0a0e1a] hover:bg-[#38bdf8] transition-all shadow-sm active:scale-95"
          >
            Log in
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/login"
            className="rounded-full bg-[#7dd3fc] px-3 py-1 text-xs font-semibold text-[#0a0e1a]"
          >
            Log in
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 rounded-2xl border border-slate-800 bg-[#0d1322] p-4 shadow-xl backdrop-blur-lg flex flex-col gap-3">
          <Link
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/50 rounded-lg"
          >
            Home
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/50 rounded-lg"
          >
            Services
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/50 rounded-lg"
          >
            Contact
          </Link>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="tel:4155550142"
              className="flex items-center gap-2 px-3 py-2 text-sm text-sky-400"
            >
              <Phone className="h-4 w-4" />
              <span>(415) 555-0142</span>
            </a>
            <Link
              href="/login?mode=signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm text-slate-200 border border-slate-700 rounded-lg"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-sm font-semibold bg-[#7dd3fc] text-[#0a0e1a] rounded-lg"
            >
              Log in to dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
