"use client";

import React, { useState } from "react";
import { ClipboardList, Zap, Bot, Flag } from "lucide-react";
import { AuditEntry } from "../types";

interface AuditTabProps {
  auditLog: AuditEntry[];
}

export function AuditTab({ auditLog }: AuditTabProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const stats = [
    { label: "Events Today", value: "184", accent: "#cca267", icon: ClipboardList },
    { label: "Admin Actions", value: "23", accent: "#38bdf8", icon: Zap },
    { label: "Automated Events", value: "146", accent: "#34d399", icon: Bot },
    { label: "Flagged", value: "2", accent: "#f87171", icon: Flag },
  ];

  const filtered = auditLog.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      a.actor.toLowerCase().includes(q) ||
      a.action.toLowerCase().includes(q) ||
      a.entity.toLowerCase().includes(q);
    const matchType =
      typeFilter === "All" ||
      (typeFilter === "Human" && a.type === "human") ||
      (typeFilter === "Automated" && a.type === "automated") ||
      (typeFilter === "Flagged" && a.type === "flagged");
    return matchSearch && matchType;
  });

  const typeConfig: Record<string, { label: string; dot: string; badge: string }> = {
    human: { label: "Human", dot: "bg-[#cca267]", badge: "bg-[#cca267]/15 text-[#cca267]" },
    automated: { label: "Automated", dot: "bg-sky-400", badge: "bg-sky-500/15 text-sky-400" },
    flagged: { label: "Flagged", dot: "bg-rose-400", badge: "bg-rose-500/15 text-rose-400" },
  };

  return (
    <div className="space-y-5">
      {/* Stat tiles */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#201a16] rounded-2xl p-4 border border-[#2d2520] flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${s.accent}20`, border: `1px solid ${s.accent}40` }}
              >
                <Icon className="h-5 w-5" style={{ color: s.accent }} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-[10px] text-[#a8a29e]">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search actor, action or entity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 max-w-xs pl-3 pr-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-[#e8e4dc] placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
        />
        <div className="flex gap-1.5">
          {["All", "Human", "Automated", "Flagged"].map((f) => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === f
                  ? "bg-[#cca267] text-[#1c1917]"
                  : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Log table — append-only, no edit/delete */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
          <ClipboardList className="h-3.5 w-3.5 text-[#cca267]" />
          <div className="text-xs font-bold text-white">Audit Trail</div>
          <span className="ml-auto text-[10px] text-[#78716c] font-mono">Read-only · Rows cannot be edited or deleted</span>
        </div>

        <div className="divide-y divide-[#2d2520]">
          {filtered.map((entry) => {
            const cfg = typeConfig[entry.type];
            return (
              <div
                key={entry.id}
                className="flex items-start gap-4 px-5 py-3.5 hover:bg-[#28211b] transition-colors"
              >
                {/* type dot */}
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                  <div className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-xs font-bold text-white">{entry.actor}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-xs text-[#a8a29e] leading-snug">{entry.action}</div>
                  <div className="text-[10px] text-[#78716c] mt-0.5 font-mono">
                    {entry.entity} · {entry.entityId}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[#78716c] shrink-0 pt-0.5">
                  {entry.timestamp}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-[#78716c] text-xs">
              No audit entries match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
