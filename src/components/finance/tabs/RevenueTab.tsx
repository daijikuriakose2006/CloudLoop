"use client";

import React from "react";
import { revenueChartData, revenueRecords } from "../initialData";

const maxBar = Math.max(...revenueChartData.map((d) => d.billed));
const barColors = ["#38bdf8", "#cca267", "#a78bfa", "#34d399", "#fb923c", "#f87171"];

export function RevenueTab() {
  const kpis = [
    { label: "YTD Billed", value: "₹84,86,400", sub: "Jan–Oct 2026", accent: "#cca267" },
    { label: "YTD Collected", value: "₹2.88 Cr", sub: "Across all accounts", accent: "#34d399" },
    { label: "Oct Billed", value: "₹22,14,600", sub: "Month total", accent: "#38bdf8" },
    { label: "Oct Collected", value: "₹47,30,000", sub: "Settlement this month", accent: "#a78bfa" },
  ];

  return (
    <div className="space-y-5">
      {/* KPI tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${k.accent}, transparent 70%)`, transform: "translate(30%,-30%)" }} />
            <div className="text-[10px] text-[#a8a29e] uppercase font-mono mb-1">{k.label}</div>
            <div className="text-2xl font-extrabold text-white mb-0.5" style={{ color: k.accent }}>{k.value}</div>
            <div className="text-[10px] text-[#78716c]">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-bold text-white">Revenue trend</div>
            <div className="text-xs text-[#a8a29e]">Monthly billed vs collected</div>
          </div>
        </div>
        <div className="flex items-end gap-3 h-40 mb-3">
          {revenueChartData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex gap-0.5 items-end" style={{ height: "150px" }}>
                <div className="flex-1 rounded-t-md" style={{ height: `${(d.billed / maxBar) * 100}%`, background: `linear-gradient(to top, ${barColors[i]}, ${barColors[i]}99)` }} />
                <div className="flex-1 rounded-t-md" style={{ height: `${(d.collected / maxBar) * 100}%`, background: "linear-gradient(to top, #34d399, #6ee7b7)" }} />
              </div>
              <div className="text-[9px] text-[#78716c]">{d.month}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-[#2d2520]">
          {[
            { label: "Total billed", value: "₹78.42L", color: "text-[#cca267]" },
            { label: "Total collected", value: "₹71.14L", color: "text-emerald-400" },
            { label: "Outstanding", value: "₹7.28L", color: "text-amber-400" },
            { label: "Avg collection rate", value: "90.7%", color: "text-sky-400" },
          ].map((s) => (
            <div key={s.label}>
              <div className={`text-sm font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-[#78716c]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AR records table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">
          AR Records — by period
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Period", "Billed", "Collected", "Outstanding", "Collection Rate"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {revenueRecords.map((r) => (
              <tr key={r.period} className="hover:bg-[#28211b] transition-colors">
                <td className="px-5 py-3 font-semibold text-white">{r.period}</td>
                <td className="px-5 py-3 font-bold text-[#cca267]">{r.billed}</td>
                <td className="px-5 py-3 font-bold text-emerald-400">{r.collected}</td>
                <td className="px-5 py-3 text-amber-400 font-semibold">{r.outstanding}</td>
                <td className="px-5 py-3">
                  <span className="text-xs font-extrabold text-sky-400">{r.collectionRate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
