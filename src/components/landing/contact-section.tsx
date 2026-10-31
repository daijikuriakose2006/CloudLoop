"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, CheckCircle, Loader2 } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    teamSize: "",
    goal: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 border-t border-slate-900 bg-grid-cyan-dense">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080e] via-[#090d16]/90 to-[#06080e] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Cyan accent bar */}
            <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Talk to the
              <br />
              Brightloop team
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              Tell us about your team and we will walk you through the
              billing lifecycle on real data. Already have an account?{" "}
              <Link
                href="/login"
                className="text-white underline underline-offset-4 hover:text-sky-300 transition-colors"
              >
                Just log in.
              </Link>
            </p>

            {/* Phone pill button */}
            <div className="mb-4">
              <a
                href="tel:4155550142"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm sm:text-base font-semibold text-[#0a0e1a] shadow-md hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Phone className="h-4 w-4 text-slate-700" />
                <span>(415) 555-0142</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-400">
              No spam. We reply within one business day.
            </p>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-800/90 bg-[#0c101c] p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-4 animate-in zoom-in-75">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-sm text-slate-300 max-w-sm mb-6">
                    Thanks for reaching out! Our team will contact you at{" "}
                    <span className="text-cyan-300 font-medium">{formData.email}</span> within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ email: "", company: "", teamSize: "", goal: "" });
                    }}
                    className="text-xs text-sky-400 underline hover:text-sky-300"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="work-email"
                      className="block text-xs font-semibold text-slate-300 mb-2"
                    >
                      Work email
                    </label>
                    <input
                      id="work-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-[#080b13] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-semibold text-slate-300 mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-[#080b13] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="team-size"
                      className="block text-xs font-semibold text-slate-300 mb-2"
                    >
                      Team size
                    </label>
                    <div className="relative">
                      <select
                        id="team-size"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full appearance-none rounded-lg border border-slate-800 bg-[#080b13] px-3.5 py-2.5 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                      >
                        <option value="">Choose a range</option>
                        <option value="1-10">1 - 10 employees</option>
                        <option value="11-50">11 - 50 employees</option>
                        <option value="51-200">51 - 200 employees</option>
                        <option value="201+">201+ employees</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="goal"
                      className="block text-xs font-semibold text-slate-300 mb-2"
                    >
                      What do you want to solve?
                    </label>
                    <textarea
                      id="goal"
                      rows={3}
                      placeholder="e.g. recurring invoices and overdue tracking"
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-[#080b13] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full rounded-lg bg-[#7dd3fc] py-3 text-sm font-bold text-[#0a0e1a] shadow-lg shadow-sky-500/20 hover:bg-[#67e8f9] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending request...</span>
                      </>
                    ) : (
                      "Send request"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
