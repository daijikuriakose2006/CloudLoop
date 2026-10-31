"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle, XCircle, Percent, Download, ArrowUpRight } from "lucide-react";
import { QuotationRecord } from "../types";

interface QuotationsTabProps {
  quotations: QuotationRecord[];
  onAddQuotation: () => void;
}

const statusColors: Record<string, string> = {
  Draft: "bg-slate-500/15 text-slate-400",
  Sent: "bg-sky-500/15 text-sky-400",
  Accepted: "bg-emerald-500/15 text-emerald-400",
  Rejected: "bg-rose-500/15 text-rose-400",
  Expired: "bg-amber-500/15 text-amber-400",
};

export function QuotationsTab({ quotations, onAddQuotation }: QuotationsTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const accepted = quotations.filter((q) => q.status === "Accepted");
  const winRate = quotations.length > 0
    ? Math.round((accepted.length / quotations.filter((q) => ["Accepted", "Rejected"].includes(q.status)).length) * 100) || 0
    : 0;

  const stats = [
    { label: "Awaiting Reply", value: quotations.filter((q) => q.status === "Sent").length.toString(), accent: "#38bdf8" },
    { label: "Accepted This Month", value: accepted.length.toString(), accent: "#34d399" },
    { label: "Rejected", value: quotations.filter((q) => q.status === "Rejected").length.toString(), accent: "#f87171" },
    { label: "Win Rate", value: `${winRate}%`, accent: "#cca267" },
  ];

  const filtered = quotations.filter((q) => {
    const q2 = search.toLowerCase();
    const matchSearch = !search || q.quoteNumber.toLowerCase().includes(q2) || q.customer.toLowerCase().includes(q2) || q.owner.toLowerCase().includes(q2);
    const matchStatus = statusFilter === "All" || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-3xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by quote number, customer or owner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 max-w-xs pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
        <div className="flex gap-1.5">
          {["All", "Draft", "Sent", "Accepted", "Rejected", "Expired"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? "bg-[#cca267] text-[#1c1917]" : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Quote #", "Customer", "Owner", "Plan", "Total", "Valid Until", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {filtered.map((q) => (
              <tr key={q.id} className="hover:bg-[#28211b] transition-colors cursor-pointer">
                <td className="px-4 py-3 font-mono font-bold text-[#cca267]">{q.quoteNumber}</td>
                <td className="px-4 py-3 font-semibold text-white">{q.customer}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{q.owner}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{q.plan}</td>
                <td className="px-4 py-3 font-bold text-white">{q.total}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{q.validUntil}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[q.status]}`}>{q.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
