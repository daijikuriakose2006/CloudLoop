"use client";

import React, { useState } from "react";
import { Users, TrendingUp, AlertCircle, Clock, ChevronDown, X, Download } from "lucide-react";
import { CustomerRecord } from "../types";

interface CustomersTabProps {
  customers: CustomerRecord[];
  onAddCustomer: () => void;
}

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Trial: "bg-sky-500/15 text-sky-400",
  Overdue: "bg-rose-500/15 text-rose-400",
  Paused: "bg-amber-500/15 text-amber-400",
  Cancelled: "bg-slate-500/15 text-slate-400",
};

export function CustomersTab({ customers, onAddCustomer }: CustomersTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const statuses = ["All", "Active", "Trial", "Overdue", "Paused", "Cancelled"];

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      c.company.toLowerCase().includes(q) ||
      c.contactName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.plan.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: "Total Customers", value: customers.length.toString(), icon: Users, accent: "#cca267" },
    { label: "Active", value: customers.filter((c) => c.status === "Active").length.toString(), icon: TrendingUp, accent: "#34d399" },
    { label: "On Trial", value: customers.filter((c) => c.status === "Trial").length.toString(), icon: Clock, accent: "#38bdf8" },
    { label: "Overdue Accounts", value: customers.filter((c) => c.status === "Overdue").length.toString(), icon: AlertCircle, accent: "#f87171" },
  ];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#201a16] rounded-2xl p-4 border border-[#2d2520] flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.accent}20`, border: `1px solid ${s.accent}40` }}>
                <Icon className="h-5 w-5" style={{ color: s.accent }} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">{s.value}</div>
                <div className="text-[10px] text-[#a8a29e]">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <input
            type="text"
            placeholder="Search company, contact, email, plan, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
          />
        </div>
        <div className="flex gap-1.5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s ? "bg-[#cca267] text-[#1c1917]" : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Company", "Contact", "Email", "City", "Plan", "MRR", "Status", "Joined"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c] cursor-pointer hover:text-[#a8a29e]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-[#28211b] transition-colors cursor-pointer"
                onClick={() => setSelectedCustomer(c)}
              >
                <td className="px-4 py-3 font-semibold text-white">{c.company}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{c.contactName}</td>
                <td className="px-4 py-3 text-[#78716c] font-mono">{c.email}</td>
                <td className="px-4 py-3 text-[#a8a29e]">{c.city}</td>
                <td className="px-4 py-3 text-[#cca267] font-semibold">{c.plan}</td>
                <td className="px-4 py-3 font-bold text-white">{c.mrr}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#78716c] font-mono">{c.joinedAt}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-[#78716c] text-xs">
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selectedCustomer && (
        <div className="fixed inset-y-0 right-0 w-80 bg-[#1a1512] border-l border-[#2d2520] shadow-2xl z-50 flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2520]">
            <div className="text-sm font-bold text-white">Customer Details</div>
            <button onClick={() => setSelectedCustomer(null)} className="text-[#78716c] hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            <div className="space-y-3">
              {Object.entries({
                Company: selectedCustomer.company,
                Contact: selectedCustomer.contactName,
                Email: selectedCustomer.email,
                City: selectedCustomer.city,
                Plan: selectedCustomer.plan,
                MRR: selectedCustomer.mrr,
                Status: selectedCustomer.status,
                Joined: selectedCustomer.joinedAt,
              }).map(([k, v]) => (
                <div key={k}>
                  <div className="text-[10px] text-[#78716c] uppercase font-mono mb-0.5">{k}</div>
                  <div className="text-xs font-semibold text-white">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
