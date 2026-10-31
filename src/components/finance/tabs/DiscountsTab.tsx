"use client";

import React from "react";
import { financeDiscounts } from "../initialData";

const typeColors: Record<string, string> = {
  Percentage: "bg-[#cca267]/15 text-[#cca267]",
  Fixed: "bg-sky-500/15 text-sky-400",
};

export function DiscountsTab() {
  const active = financeDiscounts.filter((d) => d.status === "Active");
  const expired = financeDiscounts.filter((d) => d.status === "Expired");
  const totalRedemptions = financeDiscounts.reduce((s, d) => s + d.usageCount, 0);

  const totalSaved = financeDiscounts.reduce((s, d) => {
    const v = parseInt(d.totalSaved.replace(/[^0-9]/g, "")) || 0;
    return s + v;
  }, 0);

  const stats = [
    { label: "Active codes", value: active.length.toString(), accent: "#34d399" },
    { label: "Total redemptions", value: totalRedemptions.toString(), accent: "#cca267" },
    { label: "Total savings issued", value: `₹${totalSaved.toLocaleString("en-IN")}`, accent: "#38bdf8" },
    { label: "Expired codes", value: expired.length.toString(), accent: "#f87171" },
  ];

  return (
    <div className="space-y-5">
      {/* Stat tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Discounts table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">All Records</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Code", "Description", "Type", "Value", "Redemptions", "Total Saved", "Valid Until", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {financeDiscounts.map((d) => (
              <tr key={d.id} className="hover:bg-[#28211b] transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-[#cca267]">{d.code}</td>
                <td className="px-4 py-3.5 text-[#a8a29e] max-w-[180px] truncate">{d.description}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${typeColors[d.type]}`}>{d.type}</span>
                </td>
                <td className="px-4 py-3.5 font-extrabold text-white">{d.value}</td>
                <td className="px-4 py-3.5 text-center font-bold text-white">{d.usageCount}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-400">{d.totalSaved}</td>
                <td className="px-4 py-3.5 font-mono text-[#78716c]">{d.validUntil}</td>
                <td className="px-4 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${d.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Usage bar chart */}
      <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
        <div className="text-sm font-bold text-white mb-4">Redemption comparison</div>
        <div className="space-y-3">
          {financeDiscounts.map((d, i) => {
            const pct = Math.round((d.usageCount / totalRedemptions) * 100);
            const colors = ["#cca267", "#34d399", "#38bdf8", "#a78bfa"];
            return (
              <div key={d.id}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#a8a29e] font-mono">{d.code}</span>
                  <span className="font-bold text-white">{d.usageCount} uses</span>
                </div>
                <div className="h-2 rounded-full bg-[#2d2520] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors[i % colors.length] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
