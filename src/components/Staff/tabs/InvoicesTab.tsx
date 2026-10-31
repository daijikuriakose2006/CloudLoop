"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Search,
  Download,
  Calendar,
  Eye,
  X,
  Printer,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { InvoiceRecord } from "../types";

interface InvoicesTabProps {
  invoices: InvoiceRecord[];
}

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  const [filter, setFilter] = useState<"All" | "Open" | "Due this week" | "Overdue" | "Paid">("All");
  const [search, setSearch] = useState("");
  const [viewInvoice, setViewInvoice] = useState<InvoiceRecord | null>(null);

  const filtered = invoices.filter((inv) => {
    if (filter === "Due this week" && inv.status !== "Due this week") return false;
    if (filter === "Open" && inv.status !== "Open" && inv.status !== "Due this week") return false;
    if (filter === "Overdue" && inv.status !== "Overdue") return false;
    if (filter === "Paid" && inv.status !== "Paid") return false;

    const q = search.toLowerCase();
    return (
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.customerName.toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    const headers = "Invoice #,Customer,Issue Date,Due Date,Subtotal,GST Amount,Total,Status\n";
    const rows = filtered
      .map(
        (i) =>
          `"${i.invoiceNumber}","${i.customerName}","${i.issueDate}","${i.dueDate}",${i.subtotal},${i.gstAmount},${i.total},"${i.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brightloop_invoices_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Open invoices</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">128</div>
          <div className="text-xs text-[#cca267] mt-2 font-medium">₹18,42,000 receivables</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Due this week</div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight">31</div>
          <div className="text-xs text-amber-300 mt-2 font-medium">Follow-up list ready</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Overdue</div>
          <div className="text-3xl font-extrabold text-rose-400 tracking-tight">16</div>
          <div className="text-xs text-rose-300 mt-2 font-medium">Email reminders active</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Paid today</div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">9</div>
          <div className="text-xs text-emerald-300 mt-2 font-medium">₹1,45,000 collected</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#383028]">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
            <input
              type="text"
              placeholder="Search invoice #, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#1a1613] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl bg-[#1a1613] p-1 border border-[#383028] text-xs">
              {(["All", "Open", "Due this week", "Overdue", "Paid"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    filter === s
                      ? "bg-[#cca267] text-[#181412] font-bold shadow-xs"
                      : "text-[#a8a29e] hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFilter("Due this week")}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                filter === "Due this week"
                  ? "border-amber-400 bg-amber-500/20 text-amber-300"
                  : "border-[#383028] bg-[#1a1613] text-[#e8e4dc] hover:text-white"
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>Due this week calls</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#383028] bg-[#1a1613] px-3.5 py-2 text-xs font-semibold text-[#e8e4dc] hover:text-white hover:bg-[#28211b] transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                <th className="py-3">Invoice #</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Issue Date</th>
                <th className="py-3">Due Date</th>
                <th className="py-3">Amount (INR)</th>
                <th className="py-3">GST Split</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383028]/60">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#2c2520] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#cca267]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 font-bold text-white">
                    {inv.customerName}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {inv.issueDate}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 font-mono font-bold text-white">
                    ₹{inv.total.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    ₹{inv.gstAmount.toLocaleString("en-IN")} (18%)
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        inv.status === "Paid"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : inv.status === "Overdue"
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setViewInvoice(inv)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#383028] bg-[#1a1613] px-3 py-1 text-xs font-semibold text-[#cca267] hover:bg-[#28211b] hover:text-white transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Customer copy</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Document Preview Modal */}
      {viewInvoice && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl border border-[#383028] bg-[#faf7f2] text-[#1c1917] p-8 shadow-2xl animate-in zoom-in-95">
            {/* Invoice Top Header */}
            <div className="flex items-start justify-between pb-6 border-b border-[#ded8cc]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-lg bg-[#cca267] text-[#1c1917] flex items-center justify-center font-black text-xs">
                    C
                  </div>
                  <span className="text-xl font-extrabold text-[#1c1917]">
                    Brightloop Software
                  </span>
                </div>
                <div className="text-xs text-[#78716c]">
                  Tax Invoice · GSTIN: 27AABCB9012K1Z8
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-sm font-bold text-[#cca267] block">
                  {viewInvoice.invoiceNumber}
                </span>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-1 ${
                    viewInvoice.status === "Paid"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {viewInvoice.status}
                </span>
              </div>
            </div>

            {/* Bill To & Dates */}
            <div className="grid grid-cols-2 gap-4 py-6 border-b border-[#ded8cc] text-xs">
              <div>
                <span className="text-[#a8a29e] uppercase font-mono block mb-1">
                  Billed To
                </span>
                <div className="font-bold text-sm text-[#1c1917]">
                  {viewInvoice.customerName}
                </div>
                <div className="text-[#78716c] mt-0.5">Verified Corporate Account</div>
              </div>

              <div className="text-right">
                <div className="mb-2">
                  <span className="text-[#a8a29e] uppercase font-mono block">
                    Issue Date
                  </span>
                  <span className="font-mono font-medium">{viewInvoice.issueDate}</span>
                </div>
                <div>
                  <span className="text-[#a8a29e] uppercase font-mono block">
                    Payment Due
                  </span>
                  <span className="font-mono font-bold text-rose-700">{viewInvoice.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="py-6 border-b border-[#ded8cc]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#ded8cc] text-[11px] font-mono uppercase text-[#78716c]">
                    <th className="pb-2 text-left">Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Rate</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ded8cc]/50 font-mono">
                  {viewInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-3 text-left font-sans font-semibold text-[#1c1917]">
                        {it.description}
                      </td>
                      <td className="py-3 text-center">{it.qty}</td>
                      <td className="py-3 text-right">₹{it.rate.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-right font-bold text-[#1c1917]">
                        ₹{it.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total GST calculations */}
              <div className="mt-4 pt-4 border-t border-[#ded8cc] space-y-1.5 text-xs text-right">
                <div className="flex justify-between text-[#78716c]">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{viewInvoice.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#78716c]">
                  <span>CGST (9%) + SGST (9%):</span>
                  <span className="font-mono">₹{viewInvoice.gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1c1917] pt-2 border-t border-[#ded8cc]">
                  <span>Total Due:</span>
                  <span className="font-mono text-xl">₹{viewInvoice.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex justify-between items-center">
              <span className="text-[11px] text-[#a8a29e]">
                Generated by Brightloop Billing Engine
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#ded8cc] bg-white px-3.5 py-2 text-xs font-semibold text-[#1c1917] hover:bg-[#f4efe4]"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print invoice</span>
                </button>
                <button
                  onClick={() => setViewInvoice(null)}
                  className="rounded-xl bg-[#2e2620] px-4 py-2 text-xs font-bold text-white hover:bg-[#3d332a]"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
