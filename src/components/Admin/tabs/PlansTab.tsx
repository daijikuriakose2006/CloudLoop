"use client";

import React, { useState } from "react";
import { Users, RotateCw, CalendarCheck, Plus } from "lucide-react";
import { PlanRecord } from "../types";

interface PlansTabProps {
  plans: PlanRecord[];
  onAddPlan: () => void;
}

const intervalColors: Record<string, string> = {
  Monthly: "bg-[#cca267]/15 text-[#cca267]",
  Quarterly: "bg-sky-500/15 text-sky-400",
  Yearly: "bg-emerald-500/15 text-emerald-400",
};

const statusColors: Record<string, string> = {
  Live: "bg-emerald-500/15 text-emerald-400",
  Retired: "bg-slate-500/15 text-slate-400",
  Draft: "bg-amber-500/15 text-amber-400",
};

const planAccents = ["#cca267", "#38bdf8", "#a78bfa", "#34d399", "#fb923c", "#f472b6"];

export function PlansTab({ plans, onAddPlan }: PlansTabProps) {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const stats = [
    { label: "Live Plans", value: plans.filter((p) => p.status === "Live").length.toString(), accent: "#34d399" },
    { label: "Total Subscribers", value: plans.reduce((s, p) => s + p.subscribers, 0).toLocaleString(), accent: "#cca267" },
    { label: "Total MRR", value: "₹35,90,000", accent: "#38bdf8" },
    { label: "Retired Plans", value: plans.filter((p) => p.status === "Retired").length.toString(), accent: "#f87171" },
  ];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-3xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {plans.map((plan, i) => {
          const accent = planAccents[i % planAccents.length];
          const isExpanded = expandedPlan === plan.id;
          return (
            <div
              key={plan.id}
              className="bg-[#201a16] rounded-2xl border border-[#2d2520] hover:border-[#3d332a] overflow-hidden transition-all"
            >
              {/* Accent top bar */}
              <div className="h-1.5" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-extrabold text-white">{plan.name}</div>
                    <div className="text-[10px] font-mono text-[#78716c] mt-0.5">{plan.code}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColors[plan.status]}`}>
                    {plan.status}
                  </span>
                </div>

                <div className="text-2xl font-extrabold text-white mb-1">{plan.price}</div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${intervalColors[plan.interval]}`}>
                    {plan.interval}
                  </span>
                  {plan.trialDays > 0 && (
                    <span className="text-[10px] text-[#a8a29e] flex items-center gap-1">
                      <CalendarCheck className="h-3 w-3" />
                      {plan.trialDays}d trial
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-[#a8a29e] mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-[#78716c]" />
                    <span className="font-bold text-white">{plan.subscribers.toLocaleString()}</span> subscribers
                  </span>
                </div>

                <div className="text-[10px] text-[#78716c]">MRR contribution</div>
                <div className="text-sm font-extrabold text-[#cca267]">{plan.mrr}</div>

                <button
                  onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                  className="mt-4 w-full py-1.5 rounded-lg bg-[#28211b] border border-[#3d332a] text-[10px] font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors"
                >
                  {isExpanded ? "Collapse" : "Manage plan"}
                </button>
              </div>

              {isExpanded && (
                <div className="border-t border-[#2d2520] p-5 bg-[#1a1512] space-y-3">
                  <div className="text-xs font-semibold text-[#a8a29e] mb-2">Quick actions</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-lg bg-[#cca267]/15 border border-[#cca267]/30 text-[10px] font-semibold text-[#cca267] hover:bg-[#cca267]/25 transition-colors">
                      Edit price
                    </button>
                    <button className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-colors ${
                      plan.status === "Live"
                        ? "bg-slate-500/10 border border-slate-500/30 text-slate-400 hover:bg-slate-500/20"
                        : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                    }`}>
                      {plan.status === "Live" ? "Retire plan" : "Publish plan"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add plan */}
        <button
          onClick={onAddPlan}
          className="bg-[#201a16] rounded-2xl p-5 border border-dashed border-[#3d332a] hover:border-[#cca267]/50 transition-all flex flex-col items-center justify-center gap-3 text-[#78716c] hover:text-[#cca267] min-h-[160px]"
        >
          <div className="h-10 w-10 rounded-xl bg-[#28211b] border border-[#3d332a] flex items-center justify-center">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold">New plan</span>
        </button>
      </div>
    </div>
  );
}
