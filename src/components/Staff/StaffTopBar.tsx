"use client";

import React from "react";
import { Search, Plus, Bell } from "lucide-react";
import { StaffTab } from "./types";

interface StaffTopBarProps {
  currentTab: StaffTab;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewQuotation: () => void;
  onOpenAddCustomer: () => void;
}

const tabTitles: Record<StaffTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Operations desk",
    subtitle:
      "An operations desk that puts the day's queue, the open pipeline and new catalogue requests on one screen.",
  },
  customers: {
    title: "Customers",
    subtitle:
      "Create and edit customer records, verify GST numbers and link a login account.",
  },
  quotations: {
    title: "Quotations",
    subtitle:
      "The quotation engine. Build an offer for a specific customer, with quantity, cost and GST pulled from the admin tax table.",
  },
  requests: {
    title: "Requests",
    subtitle:
      "Every enquiry a customer raised from the catalogue when a published plan was not enough.",
  },
  subscriptions: {
    title: "Subscriptions",
    subtitle:
      "Look up contracts, check next billing dates and pause on request.",
  },
  invoices: {
    title: "Invoices",
    subtitle: "View every Brightloop invoice and open the customer copy.",
  },
  payments: {
    title: "Payments",
    subtitle: "Record manual payments received by bank transfer or cheque.",
  },
  catalogue: {
    title: "Catalogue",
    subtitle:
      "Everything the admin published, in one browsable place for quoting.",
  },
  plans: {
    title: "Plans",
    subtitle:
      "Read-only price list of the live plans, with trial length and subscriber counts.",
  },
};

export function StaffTopBar({
  currentTab,
  searchQuery,
  onSearchChange,
  onOpenNewQuotation,
  onOpenAddCustomer,
}: StaffTopBarProps) {
  const current = tabTitles[currentTab];

  return (
    <header className="border-b border-[#ded7cb] bg-[#faf6f0] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1c1917]">
          {current.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#78716c] max-w-2xl mt-0.5 line-clamp-1">
          {current.subtitle}
        </p>
      </div>

      {/* Right Actions: Search + Quick CTAs */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search bar */}
        <div className="relative w-48 sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
          <input
            type="text"
            placeholder="Search workspace (Cmd+K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-[#ded8cc] bg-[#f4efe4] pl-9 pr-3 py-1.5 text-xs text-[#1c1917] placeholder-[#a8a29e] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
          />
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative rounded-xl border border-[#ded8cc] bg-[#f4efe4] p-2 text-[#78716c] hover:text-[#1c1917] hover:bg-white transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        {/* Action Button: Add customer */}
        <button
          onClick={onOpenAddCustomer}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#2d2520] bg-[#1f1a16] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#2e2621] active:scale-95 transition-all shadow-sm"
        >
          <Plus className="h-3.5 w-3.5 text-[#cca267]" />
          <span>Add customer</span>
        </button>

        {/* Action Button: New quotation */}
        <button
          onClick={onOpenNewQuotation}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#cca267] px-4 py-1.5 text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] active:scale-95 transition-all shadow-sm"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>New quotation</span>
        </button>
      </div>
    </header>
  );
}
