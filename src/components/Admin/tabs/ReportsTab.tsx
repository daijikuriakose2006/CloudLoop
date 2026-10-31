"use client";

import React, { useState } from "react";
import { Calendar, Mail } from "lucide-react";
import { revenueChartData, planMixData } from "../initialData";

export function ReportsTab() {
  const [range, setRange] = useState("Last 6 months");

  const agingBuckets = [
    { label: "0–30 days", outstanding: "₹84,200", count: 12, color: "#34d399" },
    { label: "31–60 days", outstanding: "₹56,800", count: 8, color: "#fbbf24" },
    { label: "61–90 days", outstanding: "₹32,100", count: 5, color: "#fb923c" },
    { label: "90+ days", outstanding: "₹18,400", count: 3, color: "#f87171" },
  ];

  const gstSlabs = [
    { rate: "0% (Zero-rated)", taxable: "₹4,20,000", collected: "₹0" },
    { rate: "5% CGST+SGST", taxable: "₹1,80,000", collected: "₹9,000" },
    { rate: "9% CGST+SGST (18%)", taxable: "₹18,40,000", collected: "₹3,31,200" },
    { rate: "18% IGST", taxable: "₹6,80,000", collected: "₹1,22,400" },
  ];

  const maxVal = Math.max(...revenueChartData.map((d) => Math.max(d.billed, d.collected)));

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

      {/* Revenue and Collections charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Revenue chart */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Revenue</div>
          <div className="text-xs text-[#a8a29e] mb-4">Monthly billed</div>
          <div className="flex items-end gap-2 h-36">
            {revenueChartData.map((d, i) => {
              const accents = ["#cca267", "#38bdf8", "#a78bfa", "#34d399", "#fb923c", "#f472b6"];
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg transition-all hover:opacity-90"
                    style={{ height: `${(d.billed / maxVal) * 130}px`, background: `linear-gradient(to top, ${accents[i]}, ${accents[i]}80)` }}
                  />
                  <div className="text-[9px] text-[#78716c]">{d.month}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-center text-xs font-extrabold text-[#cca267]">₹76.40 Cr <span className="text-[#78716c] font-normal text-[10px]">billed YTD</span></div>
        </div>

        {/* Collections chart */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Collections</div>
          <div className="text-xs text-[#a8a29e] mb-4">Monthly collected</div>
          <div className="flex items-end gap-2 h-36">
            {revenueChartData.map((d, i) => {
              const accents = ["#34d399", "#38bdf8", "#cca267", "#a78bfa", "#fb923c", "#f87171"];
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg"
                    style={{ height: `${(d.collected / maxVal) * 130}px`, background: `linear-gradient(to top, ${accents[i]}, ${accents[i]}80)` }}
                  />
                  <div className="text-[9px] text-[#78716c]">{d.month}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-center text-xs font-extrabold text-sky-400">₹71.52 Cr <span className="text-[#78716c] font-normal text-[10px]">collected YTD</span></div>
        </div>
      </div>

      {/* Plan mix + Invoice ageing */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Plan mix donut */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Plan Mix (Active Subscriptions)</div>
          <div className="flex items-center gap-8">
            <div className="relative">
              <svg viewBox="0 0 80 80" className="w-28 h-28 -rotate-90">
                {(() => {
                  const total = planMixData.reduce((s, d) => s + d.count, 0);
                  let offset = 0;
                  const r = 28, cx = 40, cy = 40;
                  const circ = 2 * Math.PI * r;
                  return planMixData.map((d) => {
                    const pct = d.count / total;
                    const dash = pct * circ;
                    const el = (
                      <circle key={d.name} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="14"
                        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={-offset * circ} />
                    );
                    offset += pct;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-sm font-extrabold text-white">78.41</div>
                <div className="text-[9px] text-[#78716c]">% Growth</div>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {planMixData.map((d) => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#a8a29e] flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-bold text-white">{d.count.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#2d2520]">
                    <div className="h-full rounded-full" style={{ width: `${(d.count / 3500) * 100}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice ageing */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-4">Invoice Ageing</div>
          <div className="space-y-3">
            {agingBuckets.map((b) => (
              <div key={b.label} className="flex items-center gap-4">
                <div className="w-20 text-[10px] text-[#a8a29e] shrink-0">{b.label}</div>
                <div className="flex-1 h-5 bg-[#2d2520] rounded-lg overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all"
                    style={{ width: `${(parseInt(b.outstanding.replace(/[^\d]/g, "")) / 100000) * 100}%`, backgroundColor: b.color }}
                  />
                </div>
                <div className="text-xs font-bold text-white w-20 text-right">{b.outstanding}</div>
                <div className="text-[10px] text-[#78716c] w-12 text-right">{b.count} inv</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GST slab table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] text-xs font-bold text-white">GST Slab Summary</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Rate", "Taxable Value", "Tax Collected"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {gstSlabs.map((s) => (
              <tr key={s.rate} className="hover:bg-[#28211b] transition-colors">
                <td className="px-5 py-3 font-semibold text-[#cca267]">{s.rate}</td>
                <td className="px-5 py-3 font-bold text-white">{s.taxable}</td>
                <td className="px-5 py-3 font-bold text-emerald-400">{s.collected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
