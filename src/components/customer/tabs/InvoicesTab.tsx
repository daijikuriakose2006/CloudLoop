"use client";

import React, { useState } from "react";
import { Download, X } from "lucide-react";
import { MyInvoice } from "../types";

interface InvoicesTabProps {
  invoices: MyInvoice[];
}

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-400",
  Outstanding: "bg-amber-500/15 text-amber-400",
  Overdue: "bg-rose-500/15 text-rose-400",
};

export function InvoicesTab({ invoices }: InvoicesTabProps) {
  const [selected, setSelected] = useState<MyInvoice | null>(null);

  const totalBilled = invoices.reduce((s, i) => s + parseInt(i.total.replace(/[^0-9]/g, "")), 0);
  const lastInvoice = invoices[0];
  const nextDue = invoices.find((i) => i.status !== "Paid");

  const stats = [
    { label: "Last invoice", value: lastInvoice?.total || "—", accent: "#cca267" },
    { label: "Total billed (lifetime)", value: `₹${totalBilled.toLocaleString("en-IN")}`, accent: "#38bdf8" },
    { label: "Next due", value: nextDue?.dueDate || "None", accent: nextDue ? "#f87171" : "#34d399" },
  ];

  return (
    <div className="space-y-5">
      {/* Stat tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-2xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Invoice table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
          <div className="text-xs font-bold text-white">All Invoices</div>
          <span className="text-[10px] text-[#78716c]">Click a row to preview the full invoice</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520]">
              {["Invoice #", "Period", "Amount", "GST", "Total", "Issued", "Due", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="hover:bg-[#28211b] transition-colors cursor-pointer"
                onClick={() => setSelected(inv)}
              >
                <td className="px-4 py-3 font-mono font-bold text-[#cca267]">{inv.invoiceNumber}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{inv.period}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{inv.amount}</td>
                <td className="px-4 py-3 text-[#78716c]">{inv.tax}</td>
                <td className="px-4 py-3 font-bold text-white">{inv.total}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{inv.issuedAt}</td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{inv.dueDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-[#78716c] hover:text-[#cca267] transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice detail panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#1a1512] border-l border-[#2d2520] shadow-2xl z-50 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2520]">
            <div>
              <div className="text-sm font-extrabold text-white">Brightloop Software Pvt Ltd</div>
              <div className="text-[10px] text-[#78716c]">Tax Invoice</div>
            </div>
            <button onClick={() => setSelected(null)} className="text-[#78716c] hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-[#cca267]">{selected.invoiceNumber}</div>
                <div className="text-[10px] text-[#78716c]">Issued: {selected.issuedAt}</div>
                <div className="text-[10px] text-[#78716c]">Due: {selected.dueDate}</div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[selected.status]}`}>
                {selected.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#201a16] rounded-xl p-3 border border-[#2d2520]">
                <div className="text-[9px] text-[#78716c] uppercase font-mono mb-1">From</div>
                <div className="text-xs font-bold text-white">Brightloop Software</div>
                <div className="text-[10px] text-[#a8a29e]">GSTIN: 27AABCB1234F1ZS</div>
                <div className="text-[10px] text-[#78716c]">Mumbai, MH</div>
              </div>
              <div className="bg-[#201a16] rounded-xl p-3 border border-[#2d2520]">
                <div className="text-[9px] text-[#78716c] uppercase font-mono mb-1">Bill To</div>
                <div className="text-xs font-bold text-white">Sunrise Textiles</div>
                <div className="text-[10px] text-[#a8a29e]">GSTIN: 33AABCS1234D1ZV</div>
                <div className="text-[10px] text-[#78716c]">Coimbatore, TN</div>
              </div>
            </div>

            <div className="bg-[#201a16] rounded-xl p-4 border border-[#2d2520]">
              <div className="text-[10px] text-[#78716c] uppercase font-mono mb-3">Line Items</div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#a8a29e]">Growth plan · {selected.period}</span>
                <span className="text-white font-semibold">{selected.amount}</span>
              </div>
              <div className="flex justify-between text-xs mb-2 pt-2 border-t border-[#2d2520]">
                <span className="text-[#a8a29e]">CGST 9%</span>
                <span className="text-white">₹625</span>
              </div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#a8a29e]">SGST 9%</span>
                <span className="text-white">₹626</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[#2d2520] font-extrabold">
                <span className="text-white">Total</span>
                <span className="text-[#cca267]">{selected.total}</span>
              </div>
              <div className="flex justify-between text-xs pt-2">
                <span className="text-emerald-400">Paid</span>
                <span className="text-emerald-400">{selected.status === "Paid" ? selected.total : "—"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a8a29e]">Balance due</span>
                <span className="font-bold text-white">{selected.status === "Paid" ? "₹0" : selected.total}</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors flex items-center justify-center gap-2">
              <Download className="h-3.5 w-3.5" />
              Download Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
