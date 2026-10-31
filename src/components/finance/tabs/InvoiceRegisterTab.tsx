"use client";

import React, { useState } from "react";
import { Download, X } from "lucide-react";
import { financeInvoices } from "../initialData";
import { FinanceInvoice } from "../types";

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-400",
  Outstanding: "bg-amber-500/15 text-amber-400",
  Overdue: "bg-rose-500/15 text-rose-400",
  Draft: "bg-slate-500/15 text-slate-400",
};

export function InvoiceRegisterTab() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<FinanceInvoice | null>(null);

  const total = financeInvoices.length;
  const paid = financeInvoices.filter((i) => i.status === "Paid").length;
  const outstanding = financeInvoices.filter((i) => i.status === "Outstanding").length;
  const overdue = financeInvoices.filter((i) => i.status === "Overdue").length;

  const stats = [
    { label: "Total invoices", value: total.toString(), accent: "#cca267" },
    { label: "Paid", value: paid.toString(), accent: "#34d399" },
    { label: "Outstanding", value: outstanding.toString(), accent: "#fbbf24" },
    { label: "Overdue", value: overdue.toString(), accent: "#f87171" },
  ];

  const filtered = financeInvoices.filter((inv) => {
    const q = search.toLowerCase();
    const matchSearch = !search || inv.invoiceNumber.toLowerCase().includes(q) || inv.customer.toLowerCase().includes(q) || inv.plan.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

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

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search invoice, customer or plan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 max-w-xs pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
        <div className="flex gap-1.5">
          {["All", "Paid", "Outstanding", "Overdue", "Draft"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? "bg-[#cca267] text-[#1c1917]" : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"}`}>
              {s}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Invoice #", "Customer", "Plan", "Amount", "Tax", "Total", "Issued", "Due", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {filtered.map((inv) => (
              <tr key={inv.id} className="hover:bg-[#28211b] transition-colors cursor-pointer" onClick={() => setSelected(inv)}>
                <td className="px-4 py-3 font-mono font-bold text-[#cca267]">{inv.invoiceNumber}</td>
                <td className="px-4 py-3 font-semibold text-white">{inv.customer}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{inv.plan}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{inv.amount}</td>
                <td className="px-4 py-3 text-[#78716c]">{inv.tax}</td>
                <td className="px-4 py-3 font-bold text-white">{inv.total}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{inv.issuedAt}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{inv.dueDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[inv.status]}`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-y-0 right-0 w-88 bg-[#1a1512] border-l border-[#2d2520] shadow-2xl z-50 flex flex-col overflow-y-auto" style={{ width: "360px" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2520]">
            <div className="text-sm font-extrabold text-white">Invoice Detail</div>
            <button onClick={() => setSelected(null)} className="text-[#78716c] hover:text-white"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-[#cca267]">{selected.invoiceNumber}</div>
                <div className="text-[10px] text-[#78716c]">Issued: {selected.issuedAt} · Due: {selected.dueDate}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[selected.status]}`}>{selected.status}</span>
            </div>
            <div className="bg-[#201a16] rounded-xl p-4 border border-[#2d2520] space-y-2">
              {[
                ["Customer", selected.customer],
                ["Plan", selected.plan],
                ["Amount", selected.amount],
                ["Tax", selected.tax],
                ["Total", selected.total],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-[#78716c]">{k}</span>
                  <span className="font-semibold text-white">{v}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors flex items-center justify-center gap-2">
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
