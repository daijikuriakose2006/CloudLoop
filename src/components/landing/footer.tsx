import React from "react";
import Link from "next/link";
import { Phone, Target } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080e] pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Left Column: Brand & Info */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xl font-bold text-white tracking-tight mb-3">
                Brightloop
              </div>
              <p className="text-sm text-slate-300 max-w-sm leading-relaxed mb-6">
                Subscription billing and revenue management
                <br />
                by Brightloop Software.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="tel:4155550142"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-slate-400" />
                <span>(415) 555-0142</span>
              </a>
            </div>
          </div>

          {/* Right Column: Navigation Links */}
          <div className="md:col-span-5 md:flex md:justify-end">
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/login?mode=signup" className="hover:text-white transition-colors">
                  Sign up
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Pills / Badges row */}
        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs mb-8">
          <div className="flex items-center gap-1.5 text-slate-500 mr-1">
            <Target className="h-3.5 w-3.5" />
          </div>
          <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-slate-300 hover:border-slate-700 transition-colors">
            Subscription Management
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-slate-300 hover:border-slate-700 transition-colors">
            Invoicing & Payments
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-slate-300 hover:border-slate-700 transition-colors">
            Roles & Access Control
          </span>
          <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-slate-300 hover:border-slate-700 transition-colors">
            Reports & Audit Trail
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500 pt-4">
          © 2026 Brightloop
        </div>
      </div>
    </footer>
  );
}
