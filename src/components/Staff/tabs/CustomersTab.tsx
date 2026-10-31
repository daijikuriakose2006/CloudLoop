"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Download,
  CheckCircle,
  AlertTriangle,
  Copy,
  Check,
  Building,
  Mail,
  Phone,
  CreditCard,
  X,
} from "lucide-react";
import { CustomerRecord } from "../types";

interface CustomersTabProps {
  customers: CustomerRecord[];
  onOpenAddCustomer: () => void;
  selectedCustomer: CustomerRecord | null;
  onSelectCustomer: (customer: CustomerRecord | null) => void;
}

export function CustomersTab({
  customers,
  onOpenAddCustomer,
  selectedCustomer,
  onSelectCustomer,
}: CustomersTabProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "missing_gst" | "trial">("all");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const filtered = customers.filter((c) => {
    if (filter === "active" && c.status !== "Active") return false;
    if (filter === "missing_gst" && c.hasGst) return false;
    if (filter === "trial" && c.status !== "Trial") return false;

    const q = search.toLowerCase();
    return (
      c.company.toLowerCase().includes(q) ||
      c.contactName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.gstNumber.toLowerCase().includes(q) ||
      c.plan.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = "Company,Contact,Email,Phone,GST,Status,Plan,MRR\n";
    const rows = filtered
      .map(
        (c) =>
          `"${c.company}","${c.contactName}","${c.email}","${c.phone}","${c.gstNumber}","${c.status}","${c.plan}",${c.mrr}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brightloop_customers_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">My accounts</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">42</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">96% retention rate</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">New this week</div>
          <div className="text-3xl font-extrabold text-[#cca267] tracking-tight">7</div>
          <div className="text-xs text-[#a8a29e] mt-2">+2 from self-serve</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Missing GST</div>
          <div className="text-3xl font-extrabold text-rose-400 tracking-tight">3</div>
          <div className="text-xs text-rose-300 mt-2">Blocks tax invoicing</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Trials ending</div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight">5</div>
          <div className="text-xs text-amber-300 mt-2">Expiring within 48h</div>
        </div>
      </div>

      {/* Main Customers Card */}
      <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#383028]">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
            <input
              type="text"
              placeholder="Search company, contact, GST, plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#1a1613] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          {/* Filter Pills + Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl bg-[#1a1613] p-1 border border-[#383028] text-xs">
              {(
                [
                  { id: "all", label: "All" },
                  { id: "active", label: "Active" },
                  { id: "missing_gst", label: "Missing GST" },
                  { id: "trial", label: "Trials" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    filter === f.id
                      ? "bg-[#cca267] text-[#181412] font-bold shadow-xs"
                      : "text-[#a8a29e] hover:text-white"
                  }`}
                >
                  {f.label}
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
              onClick={onOpenAddCustomer}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#cca267] px-3.5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Add customer</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                <th className="py-3">Company</th>
                <th className="py-3">Contact</th>
                <th className="py-3">Email</th>
                <th className="py-3">GST Number</th>
                <th className="py-3">Plan</th>
                <th className="py-3">MRR</th>
                <th className="py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383028]/60">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onSelectCustomer(c)}
                  className="hover:bg-[#2c2520] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 font-bold text-white group-hover:text-[#cca267] transition-colors">
                    {c.company}
                  </td>
                  <td className="py-3.5 text-[#e8e4dc]">{c.contactName}</td>
                  <td className="py-3.5 text-[#a8a29e] font-mono">{c.email}</td>
                  <td className="py-3.5 font-mono">
                    {c.hasGst ? (
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>{c.gstNumber}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Missing GST</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-[#cca267] font-semibold">{c.plan}</td>
                  <td className="py-3.5 font-mono font-bold text-white">
                    ₹{c.mrr.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        c.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : c.status === "Trial"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-md bg-[#1f1a16] border-l border-[#383028] text-white p-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#383028] mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedCustomer.company}
                  </h3>
                  <p className="text-xs text-[#cca267] font-medium">
                    {selectedCustomer.plan} (MRR: ₹{selectedCustomer.mrr.toLocaleString("en-IN")})
                  </p>
                </div>
                <button
                  onClick={() => onSelectCustomer(null)}
                  className="rounded-lg p-1.5 text-[#a8a29e] hover:text-white hover:bg-[#2e2620]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Stored Fields List */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-1">
                    <span>Contact Name</span>
                    <button
                      onClick={() => handleCopy(selectedCustomer.contactName, "contact")}
                      className="text-[#cca267] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {copiedField === "contact" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedField === "contact" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {selectedCustomer.contactName}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-1">
                    <span>Email Address</span>
                    <button
                      onClick={() => handleCopy(selectedCustomer.email, "email")}
                      className="text-[#cca267] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {copiedField === "email" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedField === "email" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-white font-mono">
                    {selectedCustomer.email}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-1">
                    <span>Phone</span>
                    <button
                      onClick={() => handleCopy(selectedCustomer.phone, "phone")}
                      className="text-[#cca267] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {copiedField === "phone" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedField === "phone" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-white font-mono">
                    {selectedCustomer.phone}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-1">
                    <span>GST Verification Status</span>
                    {selectedCustomer.hasGst && (
                      <button
                        onClick={() => handleCopy(selectedCustomer.gstNumber, "gst")}
                        className="text-[#cca267] hover:underline flex items-center gap-1 text-[11px]"
                      >
                        {copiedField === "gst" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedField === "gst" ? "Copied" : "Copy"}</span>
                      </button>
                    )}
                  </div>
                  {selectedCustomer.hasGst ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                      <CheckCircle className="h-4 w-4" />
                      <span>{selectedCustomer.gstNumber}</span>
                    </div>
                  ) : (
                    <div className="text-rose-400 text-xs font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Missing GST (Required for legal tax invoices)</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520]">
                  <div className="text-xs text-[#a8a29e] mb-1">Billing Address</div>
                  <div className="text-xs text-[#e8e4dc] leading-relaxed">
                    {selectedCustomer.address}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#383028] flex gap-3">
              <button
                onClick={() => onSelectCustomer(null)}
                className="w-full rounded-xl bg-[#2e2620] py-2.5 text-xs font-bold text-white hover:bg-[#3d332a] transition-all"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
