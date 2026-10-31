"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { PaymentRecord } from "../types";

interface PaymentsTabProps {
  payments: PaymentRecord[];
  onRecordPayment: () => void;
}

const statusColors: Record<string, string> = {
  Settled: "bg-emerald-500/15 text-emerald-400",
  Pending: "bg-amber-500/15 text-amber-400",
  Failed: "bg-rose-500/15 text-rose-400",
  Refunded: "bg-purple-500/15 text-purple-400",
};

const methodColors: Record<string, string> = {
  Card: "bg-sky-500/15 text-sky-400",
  UPI: "bg-emerald-500/15 text-emerald-400",
  "Bank Transfer": "bg-amber-500/15 text-amber-400",
  Manual: "bg-slate-500/15 text-slate-400",
};

export function PaymentsTab({ payments, onRecordPayment }: PaymentsTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const stats = [
    { label: "Collected Today", value: "₹1,84,200", accent: "#cca267" },
    { label: "Pending Settlement", value: "₹46,800", accent: "#fbbf24" },
    { label: "Failed", value: "8", accent: "#f87171" },
    { label: "Refunds", value: "₹67,300", accent: "#a78bfa" },
  ];

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.receiptNumber.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q) || p.reference.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

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

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by reference, customer or method..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 max-w-xs pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
        <div className="flex gap-1.5">
          {["All", "Settled", "Pending", "Failed", "Refunded"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? "bg-[#cca267] text-[#1c1917]" : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          Reconcile
        </button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Receipt #", "Customer", "Invoice", "Amount", "Method", "Reference", "Paid At", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#28211b] transition-colors cursor-pointer">
                <td className="px-4 py-3 font-mono font-bold text-[#cca267]">{p.receiptNumber}</td>
                <td className="px-4 py-3 font-semibold text-white">{p.customer}</td>
                <td className="px-4 py-3 font-mono text-[#a8a29e]">{p.invoiceNumber}</td>
                <td className="px-4 py-3 font-bold text-white">{p.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${methodColors[p.method]}`}>{p.method}</span>
                </td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{p.reference}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{p.paidAt}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[p.status]}`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
