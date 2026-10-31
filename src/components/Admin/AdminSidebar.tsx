"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  CalendarCheck,
  FileText,
  RotateCw,
  FileSpreadsheet,
  CreditCard,
  Receipt,
  BarChart3,
  Shield,
  ClipboardList,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { AdminTab } from "./types";

interface AdminSidebarProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  overdueCount: number;
  pendingQuotationsCount: number;
}

export function AdminSidebar({ currentTab, onTabChange, overdueCount, pendingQuotationsCount }: AdminSidebarProps) {
  const navItems: Array<{
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
    group: string;
  }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
    { id: "customers", label: "Customers", icon: Users, group: "Master Data" },
    { id: "catalogue", label: "Catalogue", icon: ShoppingBag, group: "Master Data" },
    { id: "plans", label: "Plans", icon: CalendarCheck, group: "Master Data" },
    { id: "quotations", label: "Quotations", icon: FileText, badge: pendingQuotationsCount, badgeColor: "bg-amber-500/20 text-amber-400", group: "Operations" },
    { id: "subscriptions", label: "Subscriptions", icon: RotateCw, group: "Operations" },
    { id: "invoices", label: "Invoices", icon: FileSpreadsheet, badge: overdueCount, badgeColor: "bg-rose-500/20 text-rose-400", group: "Operations" },
    { id: "payments", label: "Payments", icon: CreditCard, group: "Operations" },
    { id: "taxes", label: "Taxes", icon: Receipt, group: "Operations" },
    { id: "reports", label: "Reports", icon: BarChart3, group: "Insights" },
    { id: "users", label: "Users & Roles", icon: Shield, group: "Admin" },
    { id: "audit", label: "Audit Log", icon: ClipboardList, group: "Admin" },
    { id: "settings", label: "Settings", icon: Settings, group: "Admin" },
  ];

  const groups = Array.from(new Set(navItems.map((i) => i.group)));

  return (
    <aside className="w-64 bg-[#181412] text-[#e8e4dc] flex flex-col justify-between border-r border-[#2d2520] shrink-0 select-none min-h-screen">
      <div>
        {/* Brand */}
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
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-4">
          {groups.map((group) => (
            <div key={group}>
              <div className="px-3 pt-1 pb-1.5 text-[10px] font-mono tracking-wider uppercase text-[#78716c]">
                {group}
              </div>
              <div className="space-y-0.5">
                {navItems.filter((i) => i.group === group).map((item) => {
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
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-[#2d2520]">
        <div className="p-3 rounded-xl bg-[#201a16] border border-[#2d2520] mb-2 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#cca267]/20 border border-[#cca267]/40 flex items-center justify-center text-xs font-bold text-[#cca267]">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">admin@brightloop.io</div>
            <div className="text-[10px] text-[#a8a29e] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Admin</span>
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
