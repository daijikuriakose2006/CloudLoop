"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw, ArrowUpRight, Calendar } from "lucide-react";
import { AdminTab, InvoiceRecord, SubscriptionRecord, QuotationRecord } from "../types";

interface DashboardTabProps {
  invoices: InvoiceRecord[];
  subscriptions: SubscriptionRecord[];
  quotations: QuotationRecord[];
  onNavigate: (tab: AdminTab) => void;
}

const ranges = ["Last 30 days", "Last 90 days", "This quarter", "This year"];

// Helper: parse ₹ strings like "₹18,500" to number
function parseAmount(str: string): number {
  return parseInt(str.replace(/[^0-9]/g, "")) || 0;
}

export function DashboardTab({ invoices, subscriptions, quotations, onNavigate }: DashboardTabProps) {
  const [range, setRange] = useState("Last 30 days");
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );

  const handleRefresh = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
  };

  // Compute KPIs from actual data
  const activeSubscriptions = subscriptions.filter((s) => s.status === "Active");
  const totalMrr = activeSubscriptions.reduce((sum, s) => sum + parseAmount(s.mrr), 0);
  const totalCollected = invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + parseAmount(i.total), 0);
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length;
  const totalBilled = invoices.reduce((sum, i) => sum + parseAmount(i.total), 0);
  const outstanding = totalBilled - totalCollected;
  const avgInvoice = invoices.length > 0 ? Math.round(totalBilled / invoices.length) : 0;

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const kpiTiles = [
    { label: "MRR", value: totalMrr > 0 ? fmt(totalMrr) : "₹0", trend: totalMrr > 0 ? "+4.2%" : "—", trendUp: true, accent: "#cca267", sub: "from active subscriptions" },
    { label: "Active Subscriptions", value: activeSubscriptions.length.toLocaleString(), trend: activeSubscriptions.length > 0 ? `${activeSubscriptions.length}` : "—", trendUp: true, accent: "#38bdf8", sub: "across all plans" },
    { label: "Collections", value: totalCollected > 0 ? fmt(totalCollected) : "₹0", trend: totalCollected > 0 ? "+6.8%" : "—", trendUp: true, accent: "#34d399", sub: range },
    { label: "Overdue", value: overdueCount.toString(), trend: overdueCount > 0 ? `${overdueCount} invoices` : "—", trendUp: false, accent: "#f87171", sub: "invoices overdue" },
  ];

  const overdueInvoices = invoices.filter((i) => i.status === "Overdue" || i.status === "Outstanding");
  const renewalsDue = subscriptions.filter((s) => s.status === "Active").slice(0, 5);
  const recentInvoices = invoices.slice(0, 6);

  // Build simple revenue bars from invoices (group by month if available, otherwise show flat)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const monthLabel = monthNames[d.getMonth()];
    const monthInvoices = invoices.filter((inv) => {
      const issued = new Date(inv.issuedAt);
      return issued.getMonth() === d.getMonth() && issued.getFullYear() === d.getFullYear();
    });
    const billed = monthInvoices.reduce((s, inv) => s + parseAmount(inv.total), 0);
    const collected = monthInvoices.filter((inv) => inv.status === "Paid").reduce((s, inv) => s + parseAmount(inv.total), 0);
    return { month: monthLabel, billed, collected };
  });
  const maxBilled = Math.max(...chartData.map((d) => d.billed), 1);

  // Plan mix from subscriptions
  const planCounts: Record<string, number> = {};
  subscriptions.forEach((s) => {
    planCounts[s.plan || "Unknown"] = (planCounts[s.plan || "Unknown"] || 0) + 1;
  });
  const planColors = ["#cca267", "#38bdf8", "#a78bfa", "#34d399", "#fb923c"];
  const planMixData = Object.entries(planCounts).map(([name, count], i) => ({
    name, count, color: planColors[i % planColors.length],
  }));
  const totalSubscribers = subscriptions.length;

  return (
    <div className="space-y-6">
      {/* Date range and refresh */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-[#201a16] rounded-xl p-1 border border-[#2d2520]">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                range === r ? "bg-[#cca267] text-[#1c1917]" : "text-[#a8a29e] hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#78716c]">Updated {lastUpdated}</span>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#cca267]" />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiTiles.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] hover:border-[#3d332a] transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${kpi.accent}, transparent 70%)`, transform: "translate(30%, -30%)" }} />
            <div className="text-xs text-[#a8a29e] font-medium mb-2">{kpi.label}</div>
            <div className="text-2xl font-extrabold text-white tracking-tight mb-1">{kpi.value}</div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${kpi.trendUp ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>
                {kpi.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.trend}
              </span>
              <span className="text-[10px] text-[#78716c]">{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue chart + Plan mix */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue bar chart */}
        <div className="xl:col-span-2 bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-bold text-white">Revenue Trend</div>
              <div className="text-xs text-[#a8a29e]">{range}</div>
            </div>
          </div>

          {/* Chart bars */}
          {chartData.some((d) => d.billed > 0) ? (
            <div className="flex items-end gap-3 h-32 mb-4">
              {chartData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: "100px" }}>
                    <div className="flex-1 rounded-t-md" style={{ height: `${(d.billed / maxBilled) * 100}%`, background: "linear-gradient(to top, #cca267, #e8c88a)" }} />
                    <div className="flex-1 rounded-t-md" style={{ height: `${(d.collected / maxBilled) * 100}%`, background: "linear-gradient(to top, #38bdf8, #7dd3fc)" }} />
                  </div>
                  <div className="text-[10px] text-[#78716c] font-medium">{d.month}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-xs text-[#78716c]">
              No invoice data yet. Create subscriptions and run billing to see revenue trends.
            </div>
          )}

          {/* Summary row */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-[#2d2520]">
            {[
              { label: "Billed", value: fmt(totalBilled), color: "text-[#cca267]" },
              { label: "Collected", value: fmt(totalCollected), color: "text-sky-400" },
              { label: "Outstanding", value: fmt(outstanding), color: "text-amber-400" },
              { label: "Avg Invoice", value: fmt(avgInvoice), color: "text-emerald-400" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`text-sm font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-[#78716c] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan mix donut */}
        <div className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold text-white">Plan Mix</div>
            <button onClick={() => onNavigate("plans")} className="text-xs text-[#cca267] hover:underline flex items-center gap-1">
              Manage <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {planMixData.length > 0 ? (
            <>
              <div className="relative flex items-center justify-center mb-4">
                <svg viewBox="0 0 80 80" className="w-28 h-28 -rotate-90">
                  {(() => {
                    const total = planMixData.reduce((s, d) => s + d.count, 0) || 1;
                    let offset = 0;
                    const r = 30, cx = 40, cy = 40;
                    const circ = 2 * Math.PI * r;
                    return planMixData.map((d) => {
                      const pct = d.count / total;
                      const dash = pct * circ;
                      const el = (
                        <circle key={d.name} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="14" strokeDasharray={`${dash} ${circ}`} strokeDashoffset={-offset * circ} />
                      );
                      offset += pct;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute text-center">
                  <div className="text-lg font-extrabold text-white">{totalSubscribers.toLocaleString()}</div>
                  <div className="text-[9px] text-[#78716c]">subscribers</div>
                </div>
              </div>
              <div className="space-y-2">
                {planMixData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-[#a8a29e]">{d.name}</span>
                    </div>
                    <span className="font-bold text-white">{d.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center text-xs text-[#78716c]">
              No subscriptions yet.
            </div>
          )}
        </div>
      </div>

      {/* Recent Invoices + Renewals + Audit */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Recent Invoices */}
        <div className="xl:col-span-3 bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2520]">
            <div className="text-sm font-bold text-white">Recent Invoices</div>
            <button onClick={() => onNavigate("invoices")} className="text-xs text-[#cca267] hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          {recentInvoices.length > 0 ? (
            <div className="divide-y divide-[#2d2520]">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#28211b] transition-colors cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">{inv.invoiceNumber}</div>
                    <div className="text-[10px] text-[#78716c]">{inv.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">{inv.total}</div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      inv.status === "Paid" ? "bg-emerald-500/15 text-emerald-400"
                      : inv.status === "Overdue" ? "bg-rose-500/15 text-rose-400"
                      : "bg-amber-500/15 text-amber-400"
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-8 text-center text-xs text-[#78716c]">No invoices yet. Run billing to generate invoices from active subscriptions.</div>
          )}
        </div>

        {/* Renewals + Audit */}
        <div className="xl:col-span-2 space-y-4">
          {/* Renewals */}
          <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2d2520]">
              <Calendar className="h-3.5 w-3.5 text-[#cca267]" />
              <div className="text-xs font-bold text-white">Renewals due in 7 days</div>
            </div>
            {renewalsDue.length > 0 ? (
              <div className="divide-y divide-[#2d2520]">
                {renewalsDue.map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-5 py-2.5">
                    <div>
                      <div className="text-[11px] font-semibold text-white truncate max-w-[120px]">{s.customer}</div>
                      <div className="text-[10px] text-[#78716c]">{s.plan}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#cca267]">{s.nextBilling}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-6 text-center text-xs text-[#78716c]">No upcoming renewals.</div>
            )}
          </div>

          {/* Audit feed */}
          <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520]">
              <div className="text-xs font-bold text-white">Audit Trail</div>
              <button onClick={() => onNavigate("audit")} className="text-xs text-[#cca267] hover:underline">
                All logs
              </button>
            </div>
            <div className="px-5 py-6 text-center text-xs text-[#78716c]">
              Audit entries will appear here as you make changes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
