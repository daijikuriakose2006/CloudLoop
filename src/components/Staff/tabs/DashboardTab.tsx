"use client";

import React, { useState } from "react";
import {
  FileText,
  Users,
  RotateCw,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Send,
  MessageSquare,
  Search,
  Bell,
} from "lucide-react";
import {
  TaskItem,
  QuotationRecord,
  CatalogueRequest,
  CustomerRecord,
} from "../types";

interface DashboardTabProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  quotations: QuotationRecord[];
  requests: CatalogueRequest[];
  customers: CustomerRecord[];
  onOpenNewQuotation: () => void;
  onOpenAddCustomer: () => void;
  onSelectCustomer: (customer: CustomerRecord) => void;
  onReplyRequest: (request: CatalogueRequest) => void;
}

export function DashboardTab({
  tasks,
  onToggleTask,
  quotations,
  requests,
  customers,
  onOpenNewQuotation,
  onOpenAddCustomer,
  onSelectCustomer,
  onReplyRequest,
}: DashboardTabProps) {
  const [taskFilter, setTaskFilter] = useState<"all" | "open" | "done">("open");
  const [customerSearch, setCustomerSearch] = useState("");
  const [remindersSent, setRemindersSent] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === "open") return !t.completed;
    if (taskFilter === "done") return t.completed;
    return true;
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.company.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.contactName.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.plan.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleSendReminders = () => {
    setRemindersSent(true);
    setTimeout(() => setRemindersSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-2">
            <span>Open quotations</span>
            <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-300">
              ₹8,42,000
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            16
          </div>
          <div className="flex items-center justify-between text-xs text-[#a8a29e]">
            <span>Expiring in 7 days: <strong className="text-amber-400">4</strong></span>
            <span className="text-emerald-400 font-semibold">+12% vs lw</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-2">
            <span>Active customers</span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-300">
              3 new this week
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            42
          </div>
          <div className="flex items-center justify-between text-xs text-[#a8a29e]">
            <span>Missing GST: <strong className="text-rose-400">2</strong></span>
            <span className="text-[#cca267]">98% verified</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-2">
            <span>Pending renewals</span>
            <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-amber-300">
              5 due today
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            28
          </div>
          <div className="flex items-center justify-between text-xs text-[#a8a29e]">
            <span>Renewal pool: <strong className="text-white">₹1,84,500</strong></span>
            <span className="text-emerald-400">Auto-renew on</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between text-xs text-[#a8a29e] mb-2">
            <span>Monthly conversion</span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-300">
              +4.2%
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight mb-2">
            37%
          </div>
          <div className="flex items-center justify-between text-xs text-[#a8a29e]">
            <span>Target 35%</span>
            <span className="text-emerald-400 font-semibold">Exceeded</span>
          </div>
        </div>
      </div>

      {/* Middle Row: My Tasks + Quotations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: My Tasks Card */}
        <div className="lg:col-span-5 rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#383028] mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#cca267]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                My tasks
              </h2>
            </div>
            {/* Filter tabs */}
            <div className="flex items-center rounded-lg bg-[#181412] p-1 border border-[#383028] text-xs">
              {(["all", "open", "done"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTaskFilter(mode)}
                  className={`px-2.5 py-0.5 rounded capitalize font-medium transition-colors ${
                    taskFilter === mode
                      ? "bg-[#cca267] text-[#181412] font-bold"
                      : "text-[#a8a29e] hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredTasks.map((t) => (
              <label
                key={t.id}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  t.completed
                    ? "border-[#2d2520] bg-[#1a1613]/60 opacity-60 line-through text-[#78716c]"
                    : "border-[#383028] bg-[#1d1815] hover:border-[#cca267]/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => onToggleTask(t.id)}
                  className="mt-1 h-4 w-4 rounded border-[#383028] accent-[#cca267]"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[#e8e4dc]">
                    {t.title}
                  </div>
                  <div className="text-[11px] text-[#a8a29e] mt-0.5">
                    {t.subtitle}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Clock className="h-3 w-3" />
                      {t.dueDate}
                    </span>
                    <span className="rounded bg-[#2e2620] px-1.5 py-0.5 text-[#cca267]">
                      {t.tag}
                    </span>
                  </div>
                </div>
              </label>
            ))}

            {filteredTasks.length === 0 && (
              <div className="py-8 text-center text-xs text-[#a8a29e]">
                No tasks matching this filter.
              </div>
            )}
          </div>
        </div>

        {/* Right: Quotations Table Card */}
        <div className="lg:col-span-7 rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#383028] mb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Quotations (Newest Offers)
              </h2>
              <p className="text-xs text-[#a8a29e]">
                Active offers currently in client review
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSendReminders}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#cca267]/40 bg-[#cca267]/10 px-3 py-1.5 text-xs font-bold text-[#cca267] hover:bg-[#cca267]/20 transition-all active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send reminders</span>
              </button>
            </div>
          </div>

          {remindersSent && (
            <div className="mb-3 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 animate-in fade-in">
              Follow-up email reminders sent to 4 expiring quotations!
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Plan</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Valid Until</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#383028]/60">
                {quotations.slice(0, 4).map((q) => (
                  <tr key={q.id} className="hover:bg-[#2c2520] transition-colors">
                    <td className="py-2.5 font-bold text-[#e8e4dc]">
                      {q.customerName}
                    </td>
                    <td className="py-2.5 text-[#a8a29e]">{q.planName}</td>
                    <td className="py-2.5 font-mono font-semibold text-white">
                      ₹{q.total.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          q.status === "Accepted"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : q.status === "Sent"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-[#a8a29e]">
                      {q.validUntil}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Catalogue Requests + Live Customer Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Catalogue Requests Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#383028] mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-sky-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                New Catalogue Enquiries
              </h2>
            </div>
            <span className="text-xs text-[#a8a29e]">
              Customer custom quotes
            </span>
          </div>

          <div className="space-y-3">
            {requests.slice(0, 2).map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-xl border border-[#383028] bg-[#1d1815] flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">
                      {r.customerName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                      {r.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#cca267] font-medium mb-1">
                    {r.planName} · ({r.budgetBand})
                  </div>
                  <p className="text-xs text-[#a8a29e] line-clamp-2">
                    {r.requirementText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2d2520] text-xs">
                  <span className="text-[10px] text-[#78716c]">
                    Received: {r.receivedDate}
                  </span>
                  <button
                    onClick={() => onReplyRequest(r)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#cca267] hover:underline"
                  >
                    <span>Reply shortcut</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Customer live search table */}
        <div className="lg:col-span-6 rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#383028] mb-4">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Customer Live Lookup
              </h2>
              <p className="text-xs text-[#a8a29e]">
                Search customer records and plans live
              </p>
            </div>
            <div className="relative w-44">
              <Search className="pointer-events-none absolute left-2.5 top-2 h-3 w-3 text-[#a8a29e]" />
              <input
                type="text"
                placeholder="Filter company..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full rounded-lg border border-[#383028] bg-[#181412] pl-8 pr-2.5 py-1 text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Contact</th>
                  <th className="pb-2">Plan</th>
                  <th className="pb-2 text-right">GST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#383028]/60">
                {filteredCustomers.slice(0, 4).map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCustomer(c)}
                    className="hover:bg-[#2c2520] transition-colors cursor-pointer"
                  >
                    <td className="py-2.5 font-bold text-[#e8e4dc]">
                      {c.company}
                    </td>
                    <td className="py-2.5 text-[#a8a29e]">{c.contactName}</td>
                    <td className="py-2.5 text-[#cca267]">{c.plan}</td>
                    <td className="py-2.5 text-right font-mono">
                      {c.hasGst ? (
                        <span className="text-emerald-400">Verified</span>
                      ) : (
                        <span className="text-rose-400">Missing</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
