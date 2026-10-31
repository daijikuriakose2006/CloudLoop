"use client";

import React from "react";
import { ArrowUpRight, RotateCw, Download, CreditCard } from "lucide-react";
import { MySubscription, MyInvoice, MyPayment } from "../types";

interface DashboardTabProps {
  subscription: MySubscription;
  invoices: MyInvoice[];
  payments: MyPayment[];
  onNavigate: (tab: string) => void;
}

export function DashboardTab({ subscription, invoices, payments, onNavigate }: DashboardTabProps) {
  const lastInvoice = invoices[0];
  const recentInvoices = invoices.slice(0, 4);
  const recentPayments = payments.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero KPI tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current plan cost */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #cca267, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="text-[10px] text-[#a8a29e] uppercase font-mono mb-1">Monthly billing</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{subscription.price}</div>
          <div className="text-xs text-[#cca267] font-semibold mt-1">{subscription.plan} plan</div>
        </div>

        {/* Seats */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="text-[10px] text-[#a8a29e] uppercase font-mono mb-1">Seats used</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{subscription.usedSeats}<span className="text-base text-[#78716c] font-normal"> / {subscription.seats}</span></div>
          <div className="mt-2 h-1.5 rounded-full bg-[#2d2520] overflow-hidden">
            <div className="h-full rounded-full bg-sky-400" style={{ width: `${(subscription.usedSeats / subscription.seats) * 100}%` }} />
          </div>
        </div>

        {/* Next renewal */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #34d399, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="text-[10px] text-[#a8a29e] uppercase font-mono mb-1">Next renewal</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{subscription.nextBilling.split("-").slice(1).join(" ")}</div>
          <div className="text-xs text-emerald-400 font-semibold mt-1">{subscription.autoRenew ? "Auto-renew on" : "Manual renewal"}</div>
        </div>
      </div>

      {/* Active subscription card */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-white">Active Subscription</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400">Active</span>
            </div>
            <div className="text-[10px] font-mono text-[#78716c]">{subscription.subscriptionNumber}</div>
          </div>
          <button onClick={() => onNavigate("subscription")} className="flex items-center gap-1 text-xs text-[#cca267] hover:underline">
            Manage <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { label: "Plan", value: subscription.plan },
            { label: "Started", value: subscription.startDate },
            { label: "Next billing", value: subscription.nextBilling },
            { label: "Auto-renew", value: subscription.autoRenew ? "Enabled" : "Disabled" },
          ].map((s) => (
            <div key={s.label} className="bg-[#1a1512] rounded-xl p-3 border border-[#2d2520]">
              <div className="text-[10px] text-[#78716c] mb-0.5 uppercase font-mono">{s.label}</div>
              <div className="text-xs font-bold text-white">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {subscription.features.slice(0, 4).map((f) => (
            <span key={f} className="text-[10px] px-2.5 py-1 rounded-full bg-[#28211b] border border-[#3d332a] text-[#a8a29e]">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Recent invoices + payments */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Recent invoices */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520]">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <RotateCw className="h-3.5 w-3.5 text-[#cca267]" />
              Recent Invoices
            </div>
            <button onClick={() => onNavigate("invoices")} className="text-xs text-[#cca267] hover:underline flex items-center gap-1">
              All invoices <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="divide-y divide-[#2d2520]">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#28211b] transition-colors">
                <div>
                  <div className="text-xs font-bold text-white">{inv.invoiceNumber}</div>
                  <div className="text-[10px] text-[#78716c]">{inv.period} · Due {inv.dueDate}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white">{inv.total}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${inv.status === "Paid" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                    {inv.status}
                  </span>
                  <button className="text-[#78716c] hover:text-[#cca267]">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520]">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <CreditCard className="h-3.5 w-3.5 text-[#cca267]" />
              Recent Payments
            </div>
            <button onClick={() => onNavigate("payments")} className="text-xs text-[#cca267] hover:underline flex items-center gap-1">
              All payments <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="divide-y divide-[#2d2520]">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#28211b] transition-colors">
                <div>
                  <div className="text-xs font-bold text-white">{p.receiptNumber}</div>
                  <div className="text-[10px] text-[#78716c]">{p.method} · {p.paidAt}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white">{p.amount}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
