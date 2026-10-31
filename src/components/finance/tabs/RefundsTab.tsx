"use client";

import React from "react";
import { financeRefunds } from "../initialData";

const statusColors: Record<string, string> = {
  Approved: "bg-emerald-500/15 text-emerald-400",
  Pending: "bg-amber-500/15 text-amber-400",
  Rejected: "bg-rose-500/15 text-rose-400",
};

export function RefundsTab() {
  const totalRefunded = financeRefunds
    .filter((r) => r.status === "Approved")
    .reduce((s, r) => s + parseInt(r.amount.replace(/[^0-9]/g, "")), 0);

  const stats = [
    { label: "Total refunded", value: `₹${totalRefunded.toLocaleString("en-IN")}`, accent: "#cca267" },
    { label: "Approved", value: financeRefunds.filter((r) => r.status === "Approved").length.toString(), accent: "#34d399" },
    { label: "Pending", value: financeRefunds.filter((r) => r.status === "Pending").length.toString(), accent: "#fbbf24" },
    { label: "Refund rate", value: "0.2%", accent: "#a78bfa" },
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

      {/* Refund records */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">All Records</div>

        <div className="divide-y divide-[#2d2520]">
          {financeRefunds.map((r) => (
            <div key={r.id} className="p-5 hover:bg-[#28211b] transition-colors">
              <div className="flex items-start justify-between mb-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xs font-extrabold text-rose-400 shrink-0">
                    ↩
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{r.refundNumber}</div>
                    <div className="text-[10px] font-mono text-[#78716c]">{r.invoiceNumber} · {r.customer}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-extrabold text-[#cca267]">{r.amount}</div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </div>
              </div>
              <div className="ml-12">
                <p className="text-[10px] text-[#a8a29e] leading-relaxed mb-1">{r.reason}</p>
                <div className="text-[9px] text-[#78716c] font-mono">{r.issuedAt}</div>
              </div>
            </div>
          ))}

          {financeRefunds.length === 0 && (
            <div className="text-center py-10 text-[#78716c] text-xs">No refund records.</div>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-[#28211b] border border-[#3d332a] px-4 py-3 text-[10px] text-[#a8a29e] leading-relaxed">
        <strong className="text-[#cca267]">Read-only:</strong> Refunds and credit notes are approved by Admin. This view shows the current status and amounts for audit purposes.
      </div>
    </div>
  );
}
