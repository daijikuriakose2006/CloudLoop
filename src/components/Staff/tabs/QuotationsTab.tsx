"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Download,
  Send,
  CheckCircle2,
  XCircle,
  Eye,
  Check,
  Search,
  X,
} from "lucide-react";
import { QuotationRecord } from "../types";

interface QuotationsTabProps {
  quotations: QuotationRecord[];
  onOpenNewQuotation: () => void;
  onConvertQuotation: (id: string) => void;
}

export function QuotationsTab({
  quotations,
  onOpenNewQuotation,
  onConvertQuotation,
}: QuotationsTabProps) {
  const [filter, setFilter] = useState<"All" | "Sent" | "Accepted" | "Rejected" | "Draft">("All");
  const [search, setSearch] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<QuotationRecord | null>(null);

  const filtered = quotations.filter((q) => {
    if (filter !== "All" && q.status !== filter) return false;
    const query = search.toLowerCase();
    return (
      q.quoteNumber.toLowerCase().includes(query) ||
      q.customerName.toLowerCase().includes(query) ||
      q.planName.toLowerCase().includes(query)
    );
  });

  const handleExportCSV = () => {
    const headers = "Quote Number,Customer,Plan,Quantity,Unit Price,Discount,GST %,Total,Valid Until,Status\n";
    const rows = filtered
      .map(
        (q) =>
          `"${q.quoteNumber}","${q.customerName}","${q.planName}",${q.quantity},${q.unitPrice},${q.discount},${q.taxRate},${q.total},"${q.validUntil}","${q.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brightloop_quotations_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Open offers</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">16</div>
          <div className="text-xs text-amber-400 mt-2 font-medium">4 expiring this week</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Sent this week</div>
          <div className="text-3xl font-extrabold text-[#cca267] tracking-tight">9</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">+3 vs last week</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Total pipeline</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">₹14.8L</div>
          <div className="text-xs text-[#a8a29e] mt-2">Weighted: ₹9.4L</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Win rate</div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">64%</div>
          <div className="text-xs text-emerald-300 mt-2 font-medium">+6% above benchmark</div>
        </div>
      </div>

      {/* Main Quotations Card */}
      <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#383028]">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
            <input
              type="text"
              placeholder="Search quote #, customer, plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#1a1613] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status filters */}
            <div className="flex items-center rounded-xl bg-[#1a1613] p-1 border border-[#383028] text-xs">
              {(["All", "Sent", "Accepted", "Rejected", "Draft"] as const).map((s) => (
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
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#383028] bg-[#1a1613] px-3 py-2 text-xs font-semibold text-[#e8e4dc] hover:text-white hover:bg-[#28211b] transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenNewQuotation}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#cca267] px-3.5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>New quotation</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                <th className="py-3">Quote #</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Plan</th>
                <th className="py-3">Total (INR)</th>
                <th className="py-3">Valid Until</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383028]/60">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-[#2c2520] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#cca267]">
                    {q.quoteNumber}
                  </td>
                  <td className="py-3.5 font-bold text-white">
                    {q.customerName}
                  </td>
                  <td className="py-3.5 text-[#e8e4dc]">{q.planName}</td>
                  <td className="py-3.5 font-mono font-bold text-white">
                    ₹{q.total.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {q.validUntil}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        q.status === "Accepted"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : q.status === "Sent"
                          ? "bg-amber-500/20 text-amber-300"
                          : q.status === "Draft"
                          ? "bg-slate-700 text-slate-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    <button
                      onClick={() => setSelectedQuote(q)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#383028] bg-[#1a1613] px-2.5 py-1 text-[11px] font-semibold text-[#a8a29e] hover:text-white hover:border-[#cca267]"
                    >
                      <Eye className="h-3 w-3" />
                      <span>View</span>
                    </button>
                    {q.status === "Sent" && (
                      <button
                        onClick={() => onConvertQuotation(q.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white px-2.5 py-1 text-[11px] font-bold shadow-xs transition-colors"
                        title="Mark accepted on customer behalf"
                      >
                        <Check className="h-3 w-3 stroke-[2.5]" />
                        <span>Convert</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Breakdown Detail Drawer */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-lg bg-[#1f1a16] border-l border-[#383028] text-white p-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#383028] mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#cca267] font-bold">
                      {selectedQuote.quoteNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedQuote.status === "Accepted"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {selectedQuote.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedQuote.customerName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="rounded-lg p-1.5 text-[#a8a29e] hover:text-white hover:bg-[#2e2620]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Line items & calculations breakdown */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#16120f] border border-[#2d2520] space-y-2">
                  <div className="text-xs text-[#a8a29e] uppercase font-mono tracking-wider">
                    Offer Details
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Plan:</span>
                    <span className="font-semibold text-white">{selectedQuote.planName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Quantity:</span>
                    <span className="font-mono text-white">{selectedQuote.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Unit Price:</span>
                    <span className="font-mono text-white">₹{selectedQuote.unitPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Valid Until:</span>
                    <span className="font-mono text-amber-400 font-semibold">{selectedQuote.validUntil}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#16120f] border border-[#2d2520] space-y-2.5">
                  <div className="text-xs text-[#a8a29e] uppercase font-mono tracking-wider">
                    Financial Summary (GST Auto-Calculated)
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Subtotal:</span>
                    <span className="font-mono text-white">₹{selectedQuote.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Discount:</span>
                    <span className="font-mono text-rose-400">-₹{selectedQuote.discount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">Taxable Base:</span>
                    <span className="font-mono text-white">₹{(selectedQuote.subtotal - selectedQuote.discount).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#a8a29e]">GST ({selectedQuote.taxRate}%):</span>
                    <span className="font-mono text-[#cca267] font-semibold">+₹{selectedQuote.taxAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="pt-2 border-t border-[#383028] flex justify-between text-sm font-bold">
                    <span className="text-white">Total Offer:</span>
                    <span className="font-mono text-xl text-white">₹{selectedQuote.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {selectedQuote.notes && (
                  <div className="p-4 rounded-xl bg-[#16120f] border border-[#2d2520]">
                    <div className="text-xs text-[#a8a29e] uppercase font-mono tracking-wider mb-1">
                      Staff Notes
                    </div>
                    <p className="text-xs text-[#e8e4dc] leading-relaxed">
                      {selectedQuote.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#383028] flex gap-3">
              {selectedQuote.status === "Sent" && (
                <button
                  onClick={() => {
                    onConvertQuotation(selectedQuote.id);
                    setSelectedQuote(null);
                  }}
                  className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="h-4 w-4" />
                  <span>Convert & Accept on Client Behalf</span>
                </button>
              )}
              <button
                onClick={() => setSelectedQuote(null)}
                className="w-full rounded-xl bg-[#2e2620] py-2.5 text-xs font-bold text-white hover:bg-[#3d332a] transition-all"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
