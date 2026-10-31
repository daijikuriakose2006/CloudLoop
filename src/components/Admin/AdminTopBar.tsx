"use client";

import React from "react";
import { Search, Bell, RefreshCw, Plus, Download } from "lucide-react";
import { AdminTab } from "./types";

const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
  dashboard: { title: "Good morning, Admin", subtitle: "Live command centre — revenue, health and collections." },
  customers: { title: "Customers", subtitle: "The whole customer book with billing contact, city, plan and MRR." },
  catalogue: { title: "Catalogue", subtitle: "Products and variants that plans are assembled from." },
  plans: { title: "Plans", subtitle: "Monthly, quarterly and yearly packaging with price and subscriber count." },
  quotations: { title: "Quotations", subtitle: "Every priced offer in the business." },
  subscriptions: { title: "Subscriptions", subtitle: "Recurring contracts with next billing date and auto-renew flag." },
  invoices: { title: "Invoices", subtitle: "One invoice per billing period — numbered BL-2026-XXXXXX." },
  payments: { title: "Payments", subtitle: "Gateway and manual payments with method, reference and settlement status." },
  taxes: { title: "Taxes", subtitle: "The rate table every quotation and checkout pulls from automatically." },
  reports: { title: "Reports", subtitle: "Revenue vs collections, plan mix, invoice ageing and GST slabs." },
  users: { title: "Users & Roles", subtitle: "Team members, their role and account status." },
  audit: { title: "Audit Log", subtitle: "Append-only trail of every money-related change." },
  settings: { title: "Settings", subtitle: "Workspace defaults that flow into every invoice, email and reminder." },
};

interface AdminTopBarProps {
  currentTab: AdminTab;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
  onSecondaryAction?: () => void;
  secondaryLabel?: string;
}

export function AdminTopBar({
  currentTab,
  searchQuery,
  onSearchChange,
  onPrimaryAction,
  primaryLabel,
  onSecondaryAction,
  secondaryLabel,
}: AdminTopBarProps) {
  const { title, subtitle } = tabTitles[currentTab];

  return (
    <header className="bg-[#1a1512] border-b border-[#2d2520] px-6 py-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-extrabold text-white tracking-tight leading-tight">{title}</h1>
          <p className="text-xs text-[#a8a29e] mt-0.5 max-w-xl">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="h-8 w-8 rounded-lg bg-[#28211b] border border-[#3d332a] flex items-center justify-center text-[#a8a29e] hover:text-white hover:bg-[#332a22] transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <button className="h-8 w-8 rounded-lg bg-[#28211b] border border-[#3d332a] flex items-center justify-center text-[#a8a29e] hover:text-white hover:bg-[#332a22] transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>

          {secondaryLabel && (
            <button
              onClick={onSecondaryAction}
              className="h-8 px-3 rounded-lg bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              {secondaryLabel}
            </button>
          )}

          {primaryLabel && (
            <button
              onClick={onPrimaryAction}
              className="h-8 px-4 rounded-lg bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              {primaryLabel}
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#78716c]" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-8 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
      </div>
    </header>
  );
}
