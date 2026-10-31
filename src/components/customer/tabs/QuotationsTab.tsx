"use client";

import React from "react";
import { MyQuotation } from "../types";

interface QuotationsTabProps {
  quotations: MyQuotation[];
}

const statusColors: Record<string, string> = {
  Draft: "bg-slate-500/15 text-slate-400",
  Sent: "bg-sky-500/15 text-sky-400",
  Accepted: "bg-emerald-500/15 text-emerald-400",
  Rejected: "bg-rose-500/15 text-rose-400",
  Expired: "bg-amber-500/15 text-amber-400",
};

export function QuotationsTab({ quotations }: QuotationsTabProps) {
  const stats = [
    { label: "Awaiting reply", value: quotations.filter((q) => q.status === "Sent").length.toString(), accent: "#38bdf8" },
    { label: "Accepted", value: quotations.filter((q) => q.status === "Accepted").length.toString(), accent: "#34d399" },
    { label: "Total quoted", value: `₹${(
      quotations.reduce((sum, q) => sum + parseInt(q.total.replace(/[^0-9]/g, "")), 0)
    ).toLocaleString("en-IN")}`, accent: "#cca267" },
    { label: "Expired", value: quotations.filter((q) => q.status === "Expired").length.toString(), accent: "#f87171" },
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

      {/* Quotation table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">
          My Quotations
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Quote #", "Plan", "Total", "Valid Until", "Created", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {quotations.map((q) => (
              <tr key={q.id} className="hover:bg-[#28211b] transition-colors cursor-pointer">
                <td className="px-5 py-3.5 font-mono font-bold text-[#cca267]">{q.quoteNumber}</td>
                <td className="px-5 py-3.5 font-semibold text-white">{q.plan}</td>
                <td className="px-5 py-3.5 font-bold text-white">{q.total}</td>
                <td className="px-5 py-3.5 font-mono text-[#78716c]">{q.validUntil}</td>
                <td className="px-5 py-3.5 font-mono text-[#78716c]">{q.createdAt}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[q.status]}`}>
                    {q.status}
                  </span>
                </td>
              </tr>
            ))}
            {quotations.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-[#78716c] text-xs">
                  No quotations yet. Contact us or browse the catalogue to request one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-[#28211b] border border-[#3d332a] px-4 py-3 text-[10px] text-[#a8a29e]">
        Quotations are prepared by the Brightloop team. To request a new one, visit the <strong className="text-[#cca267]">Catalogue</strong> tab and click <em>Request a quotation</em> on any plan.
      </div>
    </div>
  );
}
