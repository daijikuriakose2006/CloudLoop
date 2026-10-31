"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Inbox,
  RotateCw,
  FileSpreadsheet,
  CreditCard,
  Layers,
  CalendarCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { StaffTab } from "./types";

interface StaffSidebarProps {
  currentTab: StaffTab;
  onTabChange: (tab: StaffTab) => void;
  openQuotationsCount: number;
  newRequestsCount: number;
  overdueInvoicesCount: number;
}

export function StaffSidebar({
  currentTab,
  onTabChange,
  openQuotationsCount,
  newRequestsCount,
  overdueInvoicesCount,
}: StaffSidebarProps) {
  const navItems: Array<{
    id: StaffTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "customers", label: "Customers", icon: Users },
    {
      id: "quotations",
      label: "Quotations",
      icon: FileText,
      badge: openQuotationsCount,
      badgeColor: "bg-[#cca267]/20 text-[#cca267]",
    },
    {
      id: "requests",
      label: "Requests",
      icon: Inbox,
      badge: newRequestsCount,
      badgeColor: "bg-sky-500/20 text-sky-400",
    },
    { id: "subscriptions", label: "Subscriptions", icon: RotateCw },
    {
      id: "invoices",
      label: "Invoices",
      icon: FileSpreadsheet,
      badge: overdueInvoicesCount,
      badgeColor: "bg-rose-500/20 text-rose-400",
    },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "catalogue", label: "Catalogue", icon: Layers },
    { id: "plans", label: "Plans", icon: CalendarCheck },
  ];

  return (
    <aside className="w-64 bg-[#181412] text-[#e8e4dc] flex flex-col justify-between border-r border-[#2d2520] shrink-0 select-none min-h-screen">
      <div>
        {/* Top Brand Logo */}
        <div className="p-5 border-b border-[#2d2520] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cca267] text-[#181412] font-black text-sm shadow-sm group-hover:bg-[#d6af76] transition-colors">
              C
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block leading-none">
                Brightloop
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#a8a29e] uppercase mt-0.5 block">
                Staff Desk
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 pt-2 pb-1 text-[10px] font-mono tracking-wider uppercase text-[#78716c]">
            Customer Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#28211b] text-white shadow-sm border border-[#3d332a]"
                    : "text-[#a8a29e] hover:bg-[#201a16] hover:text-[#e8e4dc]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-[#cca267]" : "text-[#78716c]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 ? (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full ${
                      item.badgeColor || "bg-slate-800 text-slate-300"
                    }`}
                  >
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

      {/* Bottom Profile and Logout */}
      <div className="p-4 border-t border-[#2d2520]">
        <div className="p-3 rounded-xl bg-[#201a16] border border-[#2d2520] mb-2 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#cca267]/20 border border-[#cca267]/40 flex items-center justify-center text-xs font-bold text-[#cca267]">
            ST
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">
              staff@brightloop.io
            </div>
            <div className="text-[10px] text-[#a8a29e] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Staff Account</span>
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[#a8a29e] hover:text-white hover:bg-[#201a16] rounded-lg transition-colors"
        >
          <LogOut className="h-3.5 w-3.5 text-[#78716c]" />
          <span>Sign out of desk</span>
        </Link>
      </div>
    </aside>
  );
}
