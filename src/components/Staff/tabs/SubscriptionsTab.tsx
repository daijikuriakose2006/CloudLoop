"use client";

import React, { useState } from "react";
import {
  RotateCw,
  Search,
  Download,
  Pause,
  Play,
  Calendar,
  X,
  ShieldAlert,
} from "lucide-react";
import { SubscriptionRecord } from "../types";

interface SubscriptionsTabProps {
  subscriptions: SubscriptionRecord[];
  onTogglePauseSubscription: (id: string) => void;
}

export function SubscriptionsTab({
  subscriptions,
  onTogglePauseSubscription,
}: SubscriptionsTabProps) {
  const [filter, setFilter] = useState<"All" | "Active" | "Due today" | "Paused" | "Cancelled">("All");
  const [search, setSearch] = useState("");
  const [selectedSub, setSelectedSub] = useState<SubscriptionRecord | null>(null);

  const filtered = subscriptions.filter((s) => {
    if (filter !== "All" && s.status !== filter) return false;
    const q = search.toLowerCase();
    return (
      s.subscriptionNumber.toLowerCase().includes(q) ||
      s.customerName.toLowerCase().includes(q) ||
      s.planName.toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    const headers = "Subscription #,Customer,Plan,Interval,Next Billing,Amount,Status\n";
    const rows = filtered
      .map(
        (s) =>
          `"${s.subscriptionNumber}","${s.customerName}","${s.planName}","${s.interval}","${s.nextBillingDate}",${s.amount},"${s.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brightloop_subscriptions_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Active subscriptions</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">4,852</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">98.2% health rate</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Due today</div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight">42</div>
          <div className="text-xs text-amber-300 mt-2 font-medium">Batch invoice run scheduled</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Paused</div>
          <div className="text-3xl font-extrabold text-[#cca267] tracking-tight">27</div>
          <div className="text-xs text-[#a8a29e] mt-2">Customer requested hold</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Cancelled</div>
          <div className="text-3xl font-extrabold text-rose-400 tracking-tight">19</div>
          <div className="text-xs text-rose-300 mt-2">Low churn (&lt;1.2%)</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#383028]">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
            <input
              type="text"
              placeholder="Search subscription #, customer, plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#1a1613] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl bg-[#1a1613] p-1 border border-[#383028] text-xs">
              {(["All", "Active", "Due today", "Paused", "Cancelled"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    filter === s
                      ? "bg-[#cca267] text-[#181412] font-bold shadow-xs"
                      : "text-[#a8a29e] hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#383028] bg-[#1a1613] px-3.5 py-2 text-xs font-semibold text-[#e8e4dc] hover:text-white hover:bg-[#28211b] transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                <th className="py-3">Subscription #</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Plan</th>
                <th className="py-3">Interval</th>
                <th className="py-3">Next Billing</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383028]/60">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-[#2c2520] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#cca267]">
                    {s.subscriptionNumber}
                  </td>
                  <td className="py-3.5 font-bold text-white">
                    {s.customerName}
                  </td>
                  <td className="py-3.5 text-[#e8e4dc]">{s.planName}</td>
                  <td className="py-3.5 text-[#a8a29e]">{s.interval}</td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {s.nextBillingDate}
                  </td>
                  <td className="py-3.5 font-mono font-bold text-white">
                    ₹{s.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        s.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : s.status === "Due today"
                          ? "bg-amber-500/20 text-amber-300"
                          : s.status === "Paused"
                          ? "bg-[#cca267]/20 text-[#cca267]"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedSub(s)}
                      className="rounded-lg border border-[#383028] bg-[#1a1613] px-2.5 py-1 text-xs text-[#cca267] hover:bg-[#28211b] hover:text-white"
                    >
                      Call details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 border-t border-[#383028] mt-4 flex items-center gap-2 text-xs text-[#78716c]">
          <ShieldAlert className="h-4 w-4 text-[#cca267]" />
          <span>Refunds and plan price edits stay with Finance & Admin roles, not Staff.</span>
        </div>
      </div>

      {/* Subscription Call Details Drawer */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-md bg-[#1f1a16] border-l border-[#383028] text-white p-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#383028] mb-6">
                <div>
                  <span className="font-mono text-xs text-[#cca267] font-bold">
                    {selectedSub.subscriptionNumber}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedSub.customerName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="rounded-lg p-1.5 text-[#a8a29e] hover:text-white hover:bg-[#2e2620]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="text-xs text-[#a8a29e] mb-1">Contract Plan</div>
                  <div className="text-sm font-semibold text-white">
                    {selectedSub.planName} ({selectedSub.interval})
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="text-xs text-[#a8a29e] mb-1">Next Billing Date</div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {selectedSub.nextBillingDate}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="text-xs text-[#a8a29e] mb-1">Billing Amount</div>
                  <div className="text-lg font-mono font-bold text-white">
                    ₹{selectedSub.amount.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="text-xs text-[#a8a29e] mb-1">Subscription Status</div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      selectedSub.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : selectedSub.status === "Paused"
                        ? "bg-[#cca267]/20 text-[#cca267]"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {selectedSub.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#383028] space-y-2">
              <button
                onClick={() => {
                  onTogglePauseSubscription(selectedSub.id);
                  setSelectedSub(null);
                }}
                className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  selectedSub.status === "Paused"
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-amber-600/90 text-white hover:bg-amber-600"
                }`}
              >
                {selectedSub.status === "Paused" ? (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Resume Subscription</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Pause on Customer Request</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedSub(null)}
                className="w-full rounded-xl bg-[#2e2620] py-2.5 text-xs font-bold text-white hover:bg-[#3d332a]"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
