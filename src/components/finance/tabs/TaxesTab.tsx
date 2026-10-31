"use client";

import React from "react";
import { financeTaxes } from "../initialData";

export function TaxesTab() {
  const totalCollected = financeTaxes.reduce((s, t) => {
    const v = parseInt(t.collected.replace(/[^0-9]/g, "")) || 0;
    return s + v;
  }, 0);

  const totalTaxable = financeTaxes.reduce((s, t) => {
    const v = parseInt(t.taxableValue.replace(/[^0-9]/g, "")) || 0;
    return s + v;
  }, 0);

  const activeTaxes = financeTaxes.filter((t) => t.status === "Active").length;
  const draftTaxes = financeTaxes.filter((t) => t.status === "Draft").length;

  const stats = [
    { label: "Active rates", value: activeTaxes.toString(), accent: "#34d399" },
    { label: "Total taxable value", value: `₹${totalTaxable.toLocaleString("en-IN")}`, accent: "#cca267" },
    { label: "Total GST collected", value: `₹${totalCollected.toLocaleString("en-IN")}`, accent: "#38bdf8" },
    { label: "Draft rates", value: draftTaxes.toString(), accent: "#a78bfa" },
  ];

  return (
    <div className="space-y-5">
      {/* Stat tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tax records table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512] text-xs font-bold text-white">All Records</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Tax Name", "Scope", "Rate", "Taxable Value", "GST Collected", "Invoices", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {financeTaxes.map((t) => (
              <tr key={t.id} className="hover:bg-[#28211b] transition-colors">
                <td className="px-5 py-3.5 font-bold text-white">{t.name}</td>
                <td className="px-5 py-3.5 text-[#a8a29e]">{t.scope}</td>
                <td className="px-5 py-3.5 font-extrabold text-[#cca267]">{t.rate}</td>
                <td className="px-5 py-3.5 font-bold text-white">{t.taxableValue}</td>
                <td className="px-5 py-3.5 font-bold text-emerald-400">{t.collected}</td>
                <td className="px-5 py-3.5 text-[#a8a29e]">{t.invoiceCount}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/15 text-slate-400"}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* GST total row */}
        <div className="border-t border-[#2d2520] px-5 py-3 bg-[#1a1512] flex items-center justify-between">
          <span className="text-xs font-bold text-[#a8a29e]">Total (all slabs)</span>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-[10px] text-[#78716c] mb-0.5">Taxable value</div>
              <div className="text-sm font-extrabold text-[#cca267]">₹{totalTaxable.toLocaleString("en-IN")}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#78716c] mb-0.5">GST collected</div>
              <div className="text-sm font-extrabold text-emerald-400">₹{totalCollected.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual bar breakdown */}
      <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
        <div className="text-sm font-bold text-white mb-4">GST collected by slab</div>
        <div className="space-y-3">
          {financeTaxes.map((t, i) => {
            const collected = parseInt(t.collected.replace(/[^0-9]/g, "")) || 0;
            const pct = totalCollected > 0 ? Math.round((collected / totalCollected) * 100) : 0;
            const colors = ["#cca267", "#34d399", "#38bdf8", "#a78bfa"];
            return (
              <div key={t.id}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#a8a29e]">{t.name} ({t.scope})</span>
                  <span className="font-bold text-white">{t.collected}</span>
                </div>
                <div className="h-2 rounded-full bg-[#2d2520] overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: colors[i % colors.length] }} />
                </div>
                <div className="text-[9px] text-[#78716c] mt-0.5">{pct}% of total collected</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
