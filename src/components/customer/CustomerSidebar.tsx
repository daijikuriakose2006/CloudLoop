"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  RotateCw,
  ShoppingBag,
  FileText,
  FileSpreadsheet,
  CreditCard,
  User,
  HeadphonesIcon,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { CustomerTab } from "./types";

interface CustomerSidebarProps {
  currentTab: CustomerTab;
  onTabChange: (tab: CustomerTab) => void;
  openTicketsCount: number;
  pendingInvoicesCount: number;
}

export function CustomerSidebar({
  currentTab,
  onTabChange,
  openTicketsCount,
  pendingInvoicesCount,
}: CustomerSidebarProps) {
  const navItems: Array<{
    id: CustomerTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "subscription", label: "My Subscription", icon: RotateCw },
    { id: "catalogue", label: "Catalogue", icon: ShoppingBag },
    {
      id: "quotations",
      label: "Quotations",
      icon: FileText,
    },
    {
      id: "invoices",
      label: "My Invoices",
      icon: FileSpreadsheet,
      badge: pendingInvoicesCount,
      badgeColor: "bg-amber-500/20 text-amber-400",
    },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
    {
      id: "support",
      label: "Support",
      icon: HeadphonesIcon,
      badge: openTicketsCount,
      badgeColor: "bg-sky-500/20 text-sky-400",
    },
  ];

  return (
    <aside className="w-60 bg-[#181412] text-[#e8e4dc] flex flex-col justify-between border-r border-[#2d2520] shrink-0 select-none min-h-screen">
      <div>
        {/* Brand */}
        <div className="p-5 border-b border-[#2d2520]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cca267] text-[#181412] font-black text-sm shadow-sm group-hover:bg-[#d6af76] transition-colors">
              C
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block leading-none">
                Brightloop
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#a8a29e] uppercase mt-0.5 block">
                My Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-0.5">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-mono tracking-wider uppercase text-[#78716c]">
            Account
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#28211b] text-white shadow-sm border border-[#3d332a]"
                    : "text-[#a8a29e] hover:bg-[#201a16] hover:text-[#e8e4dc]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#cca267]" : "text-[#78716c]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 ? (
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full ${item.badgeColor || "bg-slate-800 text-slate-300"}`}>
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="h-3.5 w-3.5 text-[#cca267]" />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile + logout */}
      <div className="p-4 border-t border-[#2d2520]">
        <div className="p-3 rounded-xl bg-[#201a16] border border-[#2d2520] mb-2 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#cca267]/20 border border-[#cca267]/40 flex items-center justify-center text-xs font-bold text-[#cca267]">
            PN
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">Priya Nair</div>
            <div className="text-[10px] text-[#a8a29e] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Customer · Growth</span>
            </div>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#a8a29e] hover:text-white hover:bg-[#201a16] rounded-lg transition-colors"
        >
          <LogOut className="h-3.5 w-3.5 text-[#78716c]" />
          <span>Sign out</span>
        </Link>
      </div>
    </aside>
  );
}
