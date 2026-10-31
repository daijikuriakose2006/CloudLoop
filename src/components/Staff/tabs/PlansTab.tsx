"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Download,
  Users,
  Check,
  Clock,
  Printer,
  ArrowRight,
} from "lucide-react";
import { PlanItem } from "../types";

interface PlansTabProps {
  plans: PlanItem[];
  onSelectPlanForQuotation: (plan: PlanItem) => void;
}

export function PlansTab({ plans, onSelectPlanForQuotation }: PlansTabProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 500);
  };

  const totalSubscribers = plans.reduce((acc, p) => acc + p.subscriberCount, 0);

  return (
    <div className="space-y-6">
      {/* 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Active live plans</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {plans.length}
          </div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">Published by Admin</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Total subscribers on plans</div>
          <div className="text-3xl font-extrabold text-[#cca267] tracking-tight">
            {totalSubscribers.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-[#a8a29e] mt-2">Active recurring contracts</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Average trial length</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            14 days
          </div>
          <div className="text-xs text-[#a8a29e] mt-2">Auto-converts to paid invoice</div>
        </div>
      </div>

      {/* Top Header with PDF Download Button */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h2 className="text-lg font-bold text-[#1c1917]">
            Standard Enterprise Price List
          </h2>
          <p className="text-xs text-[#78716c]">
            Baseline pricing used across quotation engine and sales desks
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center gap-2 rounded-xl bg-[#231e1a] border border-[#383028] px-4 py-2 text-xs font-bold text-white hover:bg-[#312923] transition-all shadow-sm"
        >
          <Printer className="h-3.5 w-3.5 text-[#cca267]" />
          <span>{downloading ? "Preparing sheet..." : "Print Price List PDF"}</span>
        </button>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md flex flex-col justify-between hover:border-[#cca267]/50 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#cca267] font-bold uppercase tracking-wider">
                  {plan.interval} Cycle
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{plan.trialDays}d trial</span>
                </span>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className="text-3xl font-black text-white font-mono">
                  ₹{plan.pricePerCycle.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#a8a29e] ml-1">/billing cycle</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1a1613] border border-[#2d2520] mb-6 flex items-center justify-between text-xs">
                <span className="text-[#a8a29e] flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#cca267]" />
                  <span>Subscribers</span>
                </span>
                <span className="font-mono font-bold text-white">
                  {plan.subscriberCount.toLocaleString("en-IN")} customers
                </span>
              </div>

              <div className="space-y-2.5 mb-6">
                <div className="text-[11px] font-mono text-[#78716c] uppercase tracking-wider">
                  Included Features
                </div>
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#e8e4dc]">
                    <Check className="h-3.5 w-3.5 text-[#cca267] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#383028]">
              <button
                onClick={() => onSelectPlanForQuotation(plan)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#cca267] py-2.5 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
              >
                <span>Quote this plan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
