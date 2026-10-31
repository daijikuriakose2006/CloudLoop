"use client";

import React, { useState } from "react";
import { CheckCircle2, Calendar, Users, Zap } from "lucide-react";
import { MySubscription } from "../types";

interface SubscriptionTabProps {
  subscription: MySubscription;
}

export function SubscriptionTab({ subscription }: SubscriptionTabProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const kpis = [
    { label: "Plan cost", value: subscription.price, accent: "#cca267" },
    { label: "Seats used", value: `${subscription.usedSeats} / ${subscription.seats}`, accent: "#38bdf8" },
    { label: "Billing cycle", value: "Monthly", accent: "#a78bfa" },
    { label: "Status", value: subscription.status, accent: "#34d399" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 rounded-2xl" style={{ background: `radial-gradient(circle at 70% 30%, ${k.accent}, transparent)` }} />
            <div className="text-2xl font-extrabold text-white mb-1" style={{ color: k.accent }}>{k.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Subscription detail card */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2d2520] bg-[#1a1512] flex items-center justify-between">
          <div>
            <div className="text-sm font-extrabold text-white">{subscription.plan} Plan</div>
            <div className="text-[10px] font-mono text-[#78716c]">{subscription.subscriptionNumber}</div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400">
            {subscription.status}
          </span>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Plan info */}
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-[#78716c] uppercase font-mono mb-3">Plan details</div>
              <div className="space-y-2.5">
                {[
                  { icon: Calendar, label: "Started", value: subscription.startDate },
                  { icon: Calendar, label: "Next billing date", value: subscription.nextBilling },
                  { icon: Users, label: "Seats included", value: `${subscription.seats} seats` },
                  { icon: Users, label: "Seats used", value: `${subscription.usedSeats} of ${subscription.seats}` },
                  { icon: Zap, label: "Auto-renew", value: subscription.autoRenew ? "Enabled" : "Disabled" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 text-xs">
                    <Icon className="h-3.5 w-3.5 text-[#78716c] shrink-0" />
                    <span className="text-[#a8a29e] flex-1">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat usage bar */}
            <div>
              <div className="flex justify-between text-xs text-[#78716c] mb-1.5">
                <span>Seat usage</span>
                <span className="font-mono">{Math.round((subscription.usedSeats / subscription.seats) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#2d2520] overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-400 transition-all"
                  style={{ width: `${(subscription.usedSeats / subscription.seats) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono mb-3">What's included</div>
            <ul className="space-y-2.5">
              {subscription.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-xs text-[#a8a29e]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-[#2d2520] px-5 py-4 flex gap-3">
          <button className="px-4 py-2 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors">
            Upgrade plan
          </button>
          <button
            onClick={() => setShowCancelConfirm(!showCancelConfirm)}
            className="px-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors"
          >
            Cancel subscription
          </button>
        </div>

        {showCancelConfirm && (
          <div className="border-t border-[#2d2520] px-5 py-4 bg-rose-500/5">
            <div className="text-xs text-rose-400 font-semibold mb-2">Are you sure you want to cancel?</div>
            <p className="text-[10px] text-[#a8a29e] mb-3">
              Your access continues until {subscription.nextBilling}. Past invoices remain accessible and payable. This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowCancelConfirm(false)} className="px-3 py-1.5 rounded-lg bg-[#28211b] border border-[#3d332a] text-xs text-[#a8a29e] hover:text-white transition-colors">
                Keep subscription
              </button>
              <button onClick={() => setShowCancelConfirm(false)} className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-xs font-semibold text-rose-400 hover:bg-rose-500/30 transition-colors">
                Yes, cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
