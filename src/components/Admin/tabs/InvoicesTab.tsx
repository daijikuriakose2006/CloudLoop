"use client";

import React, { useState } from "react";
import { Download, Play, X } from "lucide-react";
import { InvoiceRecord } from "../types";

interface InvoicesTabProps {
  invoices: InvoiceRecord[];
}

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-400",
  Outstanding: "bg-amber-500/15 text-amber-400",
  Overdue: "bg-rose-500/15 text-rose-400",
  Draft: "bg-slate-500/15 text-slate-400",
};

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [showBillingConfirm, setShowBillingConfirm] = useState(false);

  const stats = [
    { label: "Billed This Month", value: "₹24,88,800", accent: "#cca267" },
    { label: "Paid", value: "₹22,14,800", accent: "#34d399" },
    { label: "Outstanding", value: "₹1,84,200", accent: "#fbbf24" },
    { label: "Overdue", value: "₹89,600", accent: "#f87171" },
  ];

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    const matchSearch = !search || inv.invoiceNumber.toLowerCase().includes(q) || inv.customer.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search invoice number or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 max-w-xs pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
        <div className="flex gap-1.5">
          {["All", "Paid", "Outstanding", "Overdue", "Draft"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? "bg-[#cca267] text-[#1c1917]" : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => setShowBillingConfirm(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25 transition-colors">
          <Play className="h-3.5 w-3.5" /> Run billing
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
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
              <tr key={inv.id} className="hover:bg-[#28211b] transition-colors cursor-pointer" onClick={() => setSelectedInvoice(inv)}>
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

      {/* Invoice detail panel */}
      {selectedInvoice && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#1a1512] border-l border-[#2d2520] shadow-2xl z-50 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2520]">
            <div>
              <div className="text-sm font-extrabold text-white">Brightloop Software</div>
              <div className="text-[10px] text-[#78716c]">Tax Invoice</div>
            </div>
            <button onClick={() => setSelectedInvoice(null)} className="text-[#78716c] hover:text-white"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-[#cca267]">{selectedInvoice.invoiceNumber}</div>
                <div className="text-[10px] text-[#78716c]">Issued: {selectedInvoice.issuedAt}</div>
                <div className="text-[10px] text-[#78716c]">Due: {selectedInvoice.dueDate}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[selectedInvoice.status]}`}>{selectedInvoice.status}</span>
            </div>

            <div className="bg-[#201a16] rounded-xl p-4 border border-[#2d2520] space-y-2">
              <div className="text-[10px] text-[#78716c] uppercase font-mono">Bill To</div>
              <div className="text-sm font-bold text-white">{selectedInvoice.customer}</div>
            </div>

            <div className="bg-[#201a16] rounded-xl p-4 border border-[#2d2520]">
              <div className="text-[10px] text-[#78716c] uppercase font-mono mb-3">Line Items</div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#a8a29e]">{selectedInvoice.plan} subscription</span>
                <span className="text-white font-semibold">{selectedInvoice.amount}</span>
              </div>
              <div className="flex justify-between text-xs mb-2 border-t border-[#2d2520] pt-2">
                <span className="text-[#a8a29e]">GST (18%)</span>
                <span className="text-white">{selectedInvoice.tax}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-[#2d2520] pt-2 font-extrabold">
                <span className="text-white">Total</span>
                <span className="text-[#cca267]">{selectedInvoice.total}</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors flex items-center justify-center gap-2">
              <Download className="h-3.5 w-3.5" />
              Download Invoice
            </button>
          </div>
        </div>
      )}

      {/* Billing confirm dialog */}
      {showBillingConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a1512] border border-[#2d2520] rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="text-sm font-bold text-white mb-2">Run Billing Now?</div>
            <p className="text-xs text-[#a8a29e] mb-5">This will generate invoices for all active subscriptions due today. Duplicate protection is enabled — already-invoiced periods are skipped.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowBillingConfirm(false)} className="flex-1 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors">Cancel</button>
              <button onClick={() => setShowBillingConfirm(false)} className="flex-1 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-white hover:bg-emerald-400 transition-colors">Confirm & Run</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
