"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Download,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { PaymentRecord, InvoiceRecord } from "../types";

interface PaymentsTabProps {
  payments: PaymentRecord[];
  invoices: InvoiceRecord[];
  onOpenRecordPayment: () => void;
}

export function PaymentsTab({
  payments,
  invoices,
  onOpenRecordPayment,
}: PaymentsTabProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Confirmed" | "Awaiting confirmation" | "Failed">("All");

  const filtered = payments.filter((p) => {
    if (filter !== "All" && p.status !== filter) return false;
    const q = search.toLowerCase();
    return (
      p.receiptNumber.toLowerCase().includes(q) ||
      p.invoiceNumber.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.method.toLowerCase().includes(q)
    );
  });

  const handleExportCSV = () => {
    const headers = "Receipt #,Invoice #,Customer,Method,Amount,Paid At,Reference #,Status\n";
    const rows = filtered
      .map(
        (p) =>
          `"${p.receiptNumber}","${p.invoiceNumber}","${p.customerName}","${p.method}",${p.amount},"${p.paidAt}","${p.referenceNumber}","${p.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brightloop_payments_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Recorded today</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">₹1.45L</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">100% matched to invoices</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Awaiting confirmation</div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight">4</div>
          <div className="text-xs text-amber-300 mt-2 font-medium">Bank cheque clearance</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Failed</div>
          <div className="text-3xl font-extrabold text-rose-400 tracking-tight">1</div>
          <div className="text-xs text-rose-300 mt-2">Invalid UTR reference</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Receipts sent</div>
          <div className="text-3xl font-extrabold text-[#cca267] tracking-tight">38</div>
          <div className="text-xs text-[#a8a29e] mt-2">Delivered to customer portal</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#383028]">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
            <input
              type="text"
              placeholder="Search receipt #, invoice #, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#1a1613] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl bg-[#1a1613] p-1 border border-[#383028] text-xs">
              {(["All", "Confirmed", "Awaiting confirmation", "Failed"] as const).map((s) => (
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
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#383028] bg-[#1a1613] px-3.5 py-2 text-xs font-semibold text-[#e8e4dc] hover:text-white hover:bg-[#28211b] transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenRecordPayment}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#cca267] px-3.5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Record payment</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                <th className="py-3">Receipt #</th>
                <th className="py-3">Invoice #</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Method</th>
                <th className="py-3">Reference / UTR</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Paid At</th>
                <th className="py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383028]/60">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#2c2520] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#cca267]">
                    {p.receiptNumber}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {p.invoiceNumber}
                  </td>
                  <td className="py-3.5 font-bold text-white">
                    {p.customerName}
                  </td>
                  <td className="py-3.5 text-[#e8e4dc]">{p.method}</td>
                  <td className="py-3.5 font-mono text-xs text-[#a8a29e]">
                    {p.referenceNumber}
                  </td>
                  <td className="py-3.5 font-mono font-bold text-white">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {p.paidAt}
                  </td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        p.status === "Confirmed"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : p.status === "Awaiting confirmation"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
