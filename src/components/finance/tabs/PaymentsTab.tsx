"use client";

import React from "react";
import { financePayments } from "../initialData";

const methodColors: Record<string, string> = {
  Card: "bg-sky-500/15 text-sky-400",
  UPI: "bg-emerald-500/15 text-emerald-400",
  "Bank Transfer": "bg-amber-500/15 text-amber-400",
  Manual: "bg-slate-500/15 text-slate-400",
};

export function PaymentsTab() {
  const total = financePayments.filter((p) => p.status === "Settled").reduce((s, p) => s + parseInt(p.amount.replace(/[^0-9]/g, "")), 0);
  const pending = financePayments.filter((p) => p.status === "Pending").length;

  const methodCounts = financePayments.reduce((acc, p) => { acc[p.method] = (acc[p.method] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topMethod = Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  const avgPayment = Math.round(total / (financePayments.filter((p) => p.status === "Settled").length || 1));

  const stats = [
    { label: "Total collected", value: `₹${total.toLocaleString("en-IN")}`, accent: "#cca267" },
    { label: "Avg payment size", value: `₹${avgPayment.toLocaleString("en-IN")}`, accent: "#38bdf8" },
    { label: "Pending settlements", value: pending.toString(), accent: "#fbbf24" },
    { label: "Top method", value: topMethod, accent: "#34d399" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">All Records</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Receipt #", "Customer", "Invoice", "Amount", "Method", "Reference", "Date", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {financePayments.map((p) => (
              <tr key={p.id} className="hover:bg-[#28211b] transition-colors cursor-pointer">
                <td className="px-4 py-3 font-mono font-bold text-[#cca267]">{p.receiptNumber}</td>
                <td className="px-4 py-3 font-semibold text-white">{p.customer}</td>
                <td className="px-4 py-3 font-mono text-[#a8a29e]">{p.invoiceNumber}</td>
                <td className="px-4 py-3 font-bold text-white">{p.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${methodColors[p.method]}`}>{p.method}</span>
                </td>
                <td className="px-4 py-3 font-mono text-[#78716c] text-[10px]">{p.reference}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{p.paidAt}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.status === "Settled" ? "bg-emerald-500/15 text-emerald-400" : p.status === "Pending" ? "bg-amber-500/15 text-amber-400" : "bg-rose-500/15 text-rose-400"}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
