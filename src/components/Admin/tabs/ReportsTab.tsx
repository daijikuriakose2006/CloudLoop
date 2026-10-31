"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";

export function ReportsTab() {
  const [range, setRange] = useState("Last 6 months");

  return (
    <div className="space-y-5">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-[#201a16] rounded-xl p-1 border border-[#2d2520]">
          {["Last 6 months", "This year", "Last year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${range === r ? "bg-[#cca267] text-[#1c1917]" : "text-[#a8a29e] hover:text-white"}`}
            >
              {r}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          <Mail className="h-3.5 w-3.5" />
          Schedule email
        </button>
      </div>

      {/* Empty state placeholders */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Revenue</div>
          <div className="text-xs text-[#a8a29e] mb-4">Monthly billed — {range}</div>
          <div className="h-36 flex items-center justify-center text-xs text-[#78716c]">
            Revenue data will appear here once invoices are generated from subscriptions.
          </div>
        </div>

        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Collections</div>
          <div className="text-xs text-[#a8a29e] mb-4">Monthly collected — {range}</div>
          <div className="h-36 flex items-center justify-center text-xs text-[#78716c]">
            Collection data will appear here once payments are recorded against invoices.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Plan Mix (Active Subscriptions)</div>
          <div className="h-32 flex items-center justify-center text-xs text-[#78716c]">
            Plan distribution chart will populate once subscriptions exist.
          </div>
        </div>

        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Invoice Ageing</div>
          <div className="h-32 flex items-center justify-center text-xs text-[#78716c]">
            Ageing buckets will compute once outstanding invoices exist.
          </div>
        </div>
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] text-xs font-bold text-white">GST Slab Summary</div>
        <div className="px-5 py-8 text-center text-xs text-[#78716c]">
          GST slab data will compute from invoices once billing runs have been executed.
        </div>
      </div>
    </div>
  );
}
