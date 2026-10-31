"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TaxRecord } from "../types";

interface TaxesTabProps {
  taxes: TaxRecord[];
  onAddTax: () => void;
}

export function TaxesTab({ taxes, onAddTax }: TaxesTabProps) {
  const [localTaxes, setLocalTaxes] = useState(taxes);

  const stats = [
    { label: "Active Rates", value: localTaxes.filter((t) => t.status === "Active").length.toString(), accent: "#34d399" },
    { label: "Scopes", value: Array.from(new Set(localTaxes.map((t) => t.scope))).length.toString(), accent: "#38bdf8" },
    { label: "Max GST Rate", value: "₹3,89,862", accent: "#cca267" },
    { label: "Draft Rates", value: localTaxes.filter((t) => t.status === "Draft").length.toString(), accent: "#a78bfa" },
  ];

  const toggleStatus = (id: string) => {
    setLocalTaxes((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "Active" ? "Draft" : "Active" } : t
      )
    );
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-3xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
          <div className="text-xs font-bold text-white">Tax Rate Table</div>
          <button
            onClick={onAddTax}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#cca267] text-[10px] font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
          >
            <Plus className="h-3 w-3" /> New tax rate
          </button>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Tax Name", "Scope", "Rate", "Status", "Action"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {localTaxes.map((t) => (
              <tr key={t.id} className="hover:bg-[#28211b] transition-colors">
                <td className="px-5 py-3 font-bold text-white">{t.name}</td>
                <td className="px-5 py-3 text-[#a8a29e]">{t.scope}</td>
                <td className="px-5 py-3 font-extrabold text-[#cca267]">{t.rate}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => toggleStatus(t.id)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                      t.status === "Active"
                        ? "bg-slate-500/10 border border-slate-500/30 text-slate-400 hover:bg-slate-500/20"
                        : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                    }`}
                  >
                    {t.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
