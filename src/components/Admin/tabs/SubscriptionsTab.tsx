"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { SubscriptionRecord } from "../types";

interface SubscriptionsTabProps {
  subscriptions: SubscriptionRecord[];
  onAddSubscription: () => void;
}

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Paused: "bg-amber-500/15 text-amber-400",
  Cancelling: "bg-rose-500/15 text-rose-400",
  Cancelled: "bg-slate-500/15 text-slate-400",
};

export function SubscriptionsTab({ subscriptions, onAddSubscription }: SubscriptionsTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const stats = [
    { label: "Active", value: subscriptions.filter((s) => s.status === "Active").length.toString(), accent: "#34d399" },
    { label: "Paused", value: subscriptions.filter((s) => s.status === "Paused").length.toString(), accent: "#fbbf24" },
    { label: "Cancelling", value: subscriptions.filter((s) => s.status === "Cancelling").length.toString(), accent: "#f87171" },
    { label: "Churn (MoM)", value: "1.4%", accent: "#a78bfa" },
  ];

  const filtered = subscriptions.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !search || s.subscriptionNumber.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q) || s.plan.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-3xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by subscription ID, customer or plan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 max-w-xs pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
        <div className="flex gap-1.5">
          {["All", "Active", "Paused", "Cancelling", "Cancelled"].map((s) => (
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
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Subscription #", "Customer", "Plan", "MRR", "Start Date", "Next Billing", "Auto-Renew", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#28211b] transition-colors cursor-pointer">
                <td className="px-4 py-3 font-mono font-bold text-[#cca267]">{s.subscriptionNumber}</td>
                <td className="px-4 py-3 font-semibold text-white">{s.customer}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{s.plan}</td>
                <td className="px-4 py-3 font-bold text-white">{s.mrr}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{s.startDate}</td>
                <td className="px-4 py-3 font-mono text-[#a8a29e]">{s.nextBilling}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.autoRenew ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
                    {s.autoRenew ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[s.status]}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
