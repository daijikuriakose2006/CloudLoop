"use client";

import React from "react";
import { Bell, RefreshCw } from "lucide-react";
import { CustomerTab } from "./types";

const tabMeta: Record<CustomerTab, { title: string; subtitle: string }> = {
  dashboard: { title: "Hello, Priya 👋", subtitle: "An overview of your account, subscription and recent activity." },
  subscription: { title: "My Subscription", subtitle: "Your active plan, seats used and next renewal date." },
  catalogue: { title: "Catalogue", subtitle: "Explore products and plans available to you." },
  quotations: { title: "Quotations", subtitle: "Priced offers sent to you by the Brightloop team." },
  invoices: { title: "My Invoices", subtitle: "Every invoice for your subscription — download any time." },
  payments: { title: "Payments", subtitle: "Your payment history and receipts." },
  profile: { title: "Profile", subtitle: "Your account details and billing contact information." },
  support: { title: "Support", subtitle: "Raise a request or check the status of open tickets." },
};

interface CustomerTopBarProps {
  currentTab: CustomerTab;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
}

export function CustomerTopBar({ currentTab, onPrimaryAction, primaryLabel }: CustomerTopBarProps) {
  const { title, subtitle } = tabMeta[currentTab];

  return (
    <header className="bg-[#1a1512] border-b border-[#2d2520] px-6 py-4 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-lg font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-xs text-[#a8a29e] mt-0.5 max-w-xl">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="h-8 w-8 rounded-lg bg-[#28211b] border border-[#3d332a] flex items-center justify-center text-[#a8a29e] hover:text-white hover:bg-[#332a22] transition-colors">
          <Bell className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 rounded-lg bg-[#28211b] border border-[#3d332a] flex items-center justify-center text-[#a8a29e] hover:text-white hover:bg-[#332a22] transition-colors">
          <RefreshCw className="h-4 w-4" />
        </button>
        {primaryLabel && (
          <button
            onClick={onPrimaryAction}
            className="h-8 px-4 rounded-lg bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
          >
            {primaryLabel}
          </button>
        )}
      </div>
    </header>
  );
}
