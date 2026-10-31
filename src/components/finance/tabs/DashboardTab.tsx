"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { revenueChartData, ageingBuckets, planMixData, financeInvoices, financePayments, financeTaxes } from "../initialData";
import { FinanceTab } from "../types";

interface DashboardTabProps {
  onNavigate: (tab: FinanceTab) => void;
}

const kpis = [
  { label: "Total Billed", value: "₹22,14,800", trend: "+6.8%", up: true, accent: "#cca267" },
  { label: "Collected", value: "₹16,42,800", trend: "+4.2%", up: true, accent: "#34d399" },
  { label: "Outstanding", value: "₹1,88,400", trend: "-2.1%", up: false, accent: "#fbbf24" },
  { label: "Overdue", value: "₹47,300", trend: "+12%", up: false, accent: "#f87171" },
];

const maxBar = Math.max(...revenueChartData.map((d) => d.billed));
const barColors = ["#cca267", "#38bdf8", "#a78bfa", "#34d399", "#fb923c", "#f472b6"];

export function DashboardTab({ onNavigate }: DashboardTabProps) {
  const recentInvoices = financeInvoices.slice(0, 5);
  const recentPayments = financePayments.slice(0, 5);
  const taxSummary = financeTaxes;

  return (
    <div className="space-y-5">
      {/* KPI tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${k.accent}, transparent 70%)`, transform: "translate(30%,-30%)" }} />
            <div className="text-[10px] text-[#a8a29e] uppercase font-mono mb-1">{k.label}</div>
            <div className="text-2xl font-extrabold text-white mb-1">{k.value}</div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 w-fit ${k.up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>
              {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {k.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Collections chart + Bill ageing */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Collections bar chart */}
        <div className="xl:col-span-2 bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-bold text-white">Collections</div>
              <div className="text-xs text-[#a8a29e]">Revenue billed vs collected by month</div>
            </div>
          </div>
          <div className="flex items-end gap-3 h-32 mb-3">
            {revenueChartData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex gap-0.5 items-end" style={{ height: "120px" }}>
                  <div className="flex-1 rounded-t-md" style={{ height: `${(d.billed / maxBar) * 100}%`, background: `linear-gradient(to top, ${barColors[i]}, ${barColors[i]}aa)` }} />
                  <div className="flex-1 rounded-t-md" style={{ height: `${(d.collected / maxBar) * 100}%`, background: "linear-gradient(to top, #34d399, #6ee7b7)" }} />
                </div>
                <div className="text-[9px] text-[#78716c]">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-3 border-t border-[#2d2520] text-[10px]">
            <span className="flex items-center gap-1.5 text-[#a8a29e]"><span className="h-2 w-2 rounded-sm inline-block" style={{ background: barColors[0] }} />Billed</span>
            <span className="flex items-center gap-1.5 text-[#a8a29e]"><span className="h-2 w-2 rounded-sm inline-block bg-emerald-400" />Collected</span>
            <span className="ml-auto font-bold text-white">Total: ₹78.42L billed · ₹71.14L collected</span>
          </div>
        </div>

        {/* Bill ageing */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="text-sm font-bold text-white mb-1">Bill Ageing</div>
          <div className="text-xs text-[#a8a29e] mb-4">Outstanding by days past issue</div>
          <div className="space-y-3">
            {ageingBuckets.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#a8a29e]">{b.label}</span>
                  <span className="font-bold text-white">{b.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-[#2d2520] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
                </div>
                <div className="text-[9px] text-[#78716c] mt-0.5">{b.count} invoices</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payments ledger + Tax summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Payments ledger */}
        <div className="xl:col-span-2 bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
            <div className="text-xs font-bold text-white">Payments Ledger</div>
            <button onClick={() => onNavigate("payments")} className="text-xs text-[#cca267] hover:underline">View all</button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#2d2520]">
                {["Receipt #", "Customer", "Invoice", "Amount", "Method", "Status"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-mono uppercase text-[#78716c]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2d2520]">
              {recentPayments.map((p) => (
                <tr key={p.id} className="hover:bg-[#28211b] transition-colors">
                  <td className="px-4 py-2.5 font-mono font-bold text-[#cca267] text-[10px]">{p.receiptNumber}</td>
                  <td className="px-4 py-2.5 font-semibold text-white text-[10px]">{p.customer}</td>
                  <td className="px-4 py-2.5 font-mono text-[#78716c] text-[10px]">{p.invoiceNumber}</td>
                  <td className="px-4 py-2.5 font-bold text-white">{p.amount}</td>
                  <td className="px-4 py-2.5 text-[#a8a29e] text-[10px]">{p.method}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.status === "Settled" ? "bg-emerald-500/15 text-emerald-400" : p.status === "Pending" ? "bg-amber-500/15 text-amber-400" : "bg-rose-500/15 text-rose-400"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax summary */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
            <div className="text-xs font-bold text-white">Tax Summary</div>
            <button onClick={() => onNavigate("taxes")} className="text-xs text-[#cca267] hover:underline">Detail</button>
          </div>
          <div className="divide-y divide-[#2d2520]">
            {taxSummary.map((t) => (
              <div key={t.id} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{t.name}</span>
                  <span className="text-[10px] font-mono font-bold text-[#cca267]">{t.rate}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#78716c]">
                  <span>Taxable: {t.taxableValue}</span>
                  <span className="text-emerald-400 font-semibold">Collected: {t.collected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
