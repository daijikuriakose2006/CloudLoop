"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { revenueChartData, ageingBuckets, planMixData, financeTaxes } from "../initialData";

const barColors = ["#cca267", "#38bdf8", "#a78bfa", "#34d399", "#fb923c", "#f472b6"];
const maxBilled = Math.max(...revenueChartData.map((d) => d.billed));
const maxCollected = Math.max(...revenueChartData.map((d) => d.collected));

export function FinanceReportsTab() {
  const [range, setRange] = useState("Last 6 months");

  const kpis = [
    { label: "Billed YTD", value: "₹1.48 Cr", accent: "#cca267" },
    { label: "Collected YTD", value: "₹1.12 Cr", accent: "#34d399" },
    { label: "Outstanding", value: "₹78.42L", accent: "#fbbf24" },
    { label: "Overdue", value: "₹47,300", accent: "#f87171" },
  ];

  const totalSubscribers = planMixData.reduce((s, d) => s + d.count, 0);

  const gstSlabs = [
    { rate: "0% Zero-rated", taxable: "₹4,20,000", collected: "₹0", color: "#78716c" },
    { rate: "5% CGST+SGST", taxable: "₹1,80,000", collected: "₹9,000", color: "#a78bfa" },
    { rate: "18% CGST+SGST", taxable: "₹9,28,600", collected: "₹1,67,148", color: "#cca267" },
    { rate: "18% IGST", taxable: "₹6,80,000", collected: "₹1,22,400", color: "#38bdf8" },
  ];

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-[#201a16] rounded-xl p-1 border border-[#2d2520]">
          {["Last 6 months", "This year", "Last year"].map((r) => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${range === r ? "bg-[#cca267] text-[#1c1917]" : "text-[#a8a29e] hover:text-white"}`}>
              {r}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          <Mail className="h-3.5 w-3.5" />
          Schedule email
        </button>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-2xl font-extrabold mb-1" style={{ color: k.accent }}>{k.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue vs collections + plan mix */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="xl:col-span-2 bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Revenue vs Collections</div>
          <div className="text-xs text-[#a8a29e] mb-4">{range}</div>
          <div className="flex items-end gap-3 h-36 mb-3">
            {revenueChartData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex gap-0.5 items-end" style={{ height: "130px" }}>
                  <div className="flex-1 rounded-t-md" style={{ height: `${(d.billed / maxBilled) * 100}%`, background: `linear-gradient(to top, ${barColors[i]}, ${barColors[i]}99)` }} />
                  <div className="flex-1 rounded-t-md" style={{ height: `${(d.collected / maxBilled) * 100}%`, background: "linear-gradient(to top, #34d399, #6ee7b7)" }} />
                </div>
                <div className="text-[9px] text-[#78716c]">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-3 border-t border-[#2d2520] text-[10px]">
            <span className="flex items-center gap-1.5 text-[#a8a29e]"><span className="h-2 w-2 rounded-sm" style={{ background: barColors[0], display: "inline-block" }} />Billed</span>
            <span className="flex items-center gap-1.5 text-[#a8a29e]"><span className="h-2 w-2 rounded-sm inline-block bg-emerald-400" />Collected</span>
          </div>
        </div>

        {/* Plan mix donut */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Plan Mix</div>
          <div className="relative flex items-center justify-center mb-4">
            <svg viewBox="0 0 80 80" className="w-28 h-28 -rotate-90">
              {(() => {
                const total = planMixData.reduce((s, d) => s + d.count, 0);
                let offset = 0;
                return planMixData.map((d) => {
                  const pct = d.count / total;
                  const r = 28, cx = 40, cy = 40, circ = 2 * Math.PI * r;
                  const el = (
                    <circle key={d.name} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="14"
                      strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={-offset * circ} />
                  );
                  offset += pct;
                  return el;
                });
              })()}
            </svg>
            <div className="absolute text-center">
              <div className="text-base font-extrabold text-white">{totalSubscribers.toLocaleString()}</div>
              <div className="text-[9px] text-[#78716c]">subscribers</div>
            </div>
          </div>
          <div className="space-y-2">
            {planMixData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#a8a29e]">
                  <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-bold text-white">{d.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections bar chart (second chart) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Collections trend</div>
          <div className="text-xs text-[#a8a29e] mb-4">Monthly collected</div>
          <div className="flex items-end gap-3 h-28">
            {revenueChartData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg" style={{ height: `${(d.collected / maxCollected) * 110}px`, background: `linear-gradient(to top, ${barColors[(i + 2) % barColors.length]}, ${barColors[(i + 2) % barColors.length]}88)` }} />
                <div className="text-[9px] text-[#78716c]">{d.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice ageing */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Invoice Ageing</div>
          <div className="space-y-3">
            {ageingBuckets.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="w-20 text-[10px] text-[#a8a29e] shrink-0">{b.label}</div>
                <div className="flex-1 h-4 bg-[#2d2520] rounded-lg overflow-hidden">
                  <div className="h-full rounded-lg transition-all flex items-center justify-end pr-2" style={{ width: `${b.pct}%`, backgroundColor: b.color }}>
                    <span className="text-[8px] font-bold text-black/70">{b.pct}%</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-white w-20 text-right shrink-0">{b.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outstanding vs plan + GST table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Outstanding by plan */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Outstanding by plan</div>
          <div className="space-y-3">
            {[
              { plan: "Starter", amount: "₹28,000", pct: 15, color: "#38bdf8" },
              { plan: "Growth", amount: "₹1,12,000", pct: 60, color: "#cca267" },
              { plan: "Enterprise", amount: "₹47,300", pct: 25, color: "#a78bfa" },
            ].map((p) => (
              <div key={p.plan}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#a8a29e]">{p.plan}</span>
                  <span className="font-bold text-white">{p.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-[#2d2520]">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GST slab table */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">GST Slab Summary</div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2d2520]">
                {["Rate", "Taxable", "Collected"].map((h) => (
                  <th key={h} className="px-5 py-2.5 text-left text-[10px] font-mono uppercase text-[#78716c]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2520]">
              {gstSlabs.map((s) => (
                <tr key={s.rate} className="hover:bg-[#28211b] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full inline-block shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-[#a8a29e]">{s.rate}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-bold text-white">{s.taxable}</td>
                  <td className="px-5 py-3 font-bold text-emerald-400">{s.collected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
