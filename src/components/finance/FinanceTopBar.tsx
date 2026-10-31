"use client";

import React, { useState } from "react";
import { RefreshCw, Download } from "lucide-react";
import { FinanceTab } from "./types";


const tabMeta: Record<FinanceTab, { title: string; subtitle: string }> = {
  dashboard: { title: "Finance view", subtitle: "Full read-only view of revenue, collections, billing and tax across every account." },
  revenue: { title: "Revenue", subtitle: "Billed, collected and outstanding by period. Trend graphs and per-account AR." },
  invoices: { title: "Invoice Register", subtitle: "Every invoice in the business — filter, export, and drill into the PDF." },
  payments: { title: "Payments", subtitle: "Collected payments by method, reference and settlement status." },
  taxes: { title: "Taxes", subtitle: "Tax rates in use, taxable values billed and GST collected by slab." },
  discounts: { title: "Discounts", subtitle: "Active and expired discount codes with redemption counts and savings totals." },
  reports: { title: "Finance Reports", subtitle: "Revenue vs collections, plan mix, ageing and GST slabs — download or schedule." },
  refunds: { title: "Refunds", subtitle: "Approved and pending credit notes and refund records." },
};

interface FinanceTopBarProps {
  currentTab: FinanceTab;
  onExport?: () => void;
  onSchedule?: () => void;
}

export function FinanceTopBar({ currentTab, onExport, onSchedule }: FinanceTopBarProps) {
  const { title, subtitle } = tabMeta[currentTab];
  const [lastUpdated] = useState(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));

  return (
    <header className="bg-[#1a1512] border-b border-[#2d2520] px-6 py-4 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-lg font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-xs text-[#a8a29e] mt-0.5 max-w-2xl">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-[#78716c] font-mono hidden sm:block">As of {lastUpdated}</span>
        <button className="h-8 w-8 rounded-lg bg-[#28211b] border border-[#3d332a] flex items-center justify-center text-[#a8a29e] hover:text-white hover:bg-[#332a22] transition-colors">
          <RefreshCw className="h-4 w-4" />
        </button>
        {onSchedule && (
          <button onClick={onSchedule} className="h-8 px-3 rounded-lg bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
            Schedule email
          </button>
        )}
        <button onClick={onExport} className="h-8 px-4 rounded-lg bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors flex items-center gap-1.5">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>
    </header>
  );
}
