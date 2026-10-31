"use client";

import React, { useState } from "react";
import { Send, MessageSquare, Clock, CheckCircle2, X } from "lucide-react";
import { SupportTicket } from "../types";

interface SupportTabProps {
  tickets: SupportTicket[];
}

const statusColors: Record<string, string> = {
  Open: "bg-sky-500/15 text-sky-400",
  "In review": "bg-amber-500/15 text-amber-400",
  Answered: "bg-emerald-500/15 text-emerald-400",
  Closed: "bg-slate-500/15 text-slate-400",
};

export function SupportTab({ tickets: initialTickets }: SupportTabProps) {
  const [tickets, setTickets] = useState(initialTickets);
  const [showNewForm, setShowNewForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Billing");
  const [newMessage, setNewMessage] = useState("");

  const stats = [
    { label: "Open", value: tickets.filter((t) => t.status === "Open").length.toString(), accent: "#38bdf8" },
    { label: "In review", value: tickets.filter((t) => t.status === "In review").length.toString(), accent: "#fbbf24" },
    { label: "Avg response", value: "3h", accent: "#34d399" },
  ];

  const handleSubmit = () => {
    if (!newSubject.trim() || !newMessage.trim()) return;
    const ticket: SupportTicket = {
      id: `t-new-${Date.now()}`,
      subject: newSubject,
      category: newCategory,
      message: newMessage,
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTickets([ticket, ...tickets]);
    setNewSubject("");
    setNewMessage("");
    setShowNewForm(false);
  };

  return (
    <div className="space-y-5">
      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-3xl font-extrabold mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* New request form */}
      {showNewForm && (
        <div className="bg-[#201a16] rounded-2xl border border-[#cca267]/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold text-white">New Support Request</div>
            <button onClick={() => setShowNewForm(false)} className="text-[#78716c] hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">Subject</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Briefly describe your issue"
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white focus:outline-none focus:border-[#cca267] transition-colors"
                >
                  <option>Billing</option>
                  <option>Account</option>
                  <option>Subscription</option>
                  <option>Technical</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">Message</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                rows={4}
                className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Submit request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket list */}
      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <MessageSquare className="h-3.5 w-3.5 text-[#cca267]" />
            My Requests
          </div>
          {!showNewForm && (
            <button
              onClick={() => setShowNewForm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#cca267] text-[10px] font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
            >
              <Send className="h-3 w-3" />
              New request
            </button>
          )}
        </div>

        <div className="divide-y divide-[#2d2520]">
          {tickets.map((t) => {
            const isExpanded = expandedId === t.id;
            return (
              <div key={t.id} className="hover:bg-[#28211b] transition-colors">
                {/* Ticket header row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : t.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-white">{t.subject}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColors[t.status]}`}>
                        {t.status}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#28211b] border border-[#3d332a] text-[#78716c]">
                        {t.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#78716c] font-mono">Opened {t.createdAt}</div>
                  </div>
                  <div className="text-[#78716c] text-xs">
                    {isExpanded ? "▲" : "▼"}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-5 pb-4 space-y-3">
                    {/* Customer message */}
                    <div className="rounded-xl bg-[#1a1512] border border-[#2d2520] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-5 rounded-full bg-[#cca267]/20 border border-[#cca267]/40 flex items-center justify-center text-[9px] font-bold text-[#cca267]">
                          Y
                        </div>
                        <span className="text-[10px] font-semibold text-[#a8a29e]">You · {t.createdAt}</span>
                      </div>
                      <p className="text-xs text-[#e8e4dc] leading-relaxed">{t.message}</p>
                    </div>

                    {/* Staff reply if exists */}
                    {t.lastReply && (
                      <div className="rounded-xl bg-[#201a16] border border-[#cca267]/20 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-5 w-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[9px] font-bold text-emerald-400">
                            BL
                          </div>
                          <span className="text-[10px] font-semibold text-emerald-400">Brightloop Support · {t.repliedAt}</span>
                        </div>
                        <p className="text-xs text-[#e8e4dc] leading-relaxed">{t.lastReply}</p>
                      </div>
                    )}

                    {/* Status note */}
                    {t.status === "Open" || t.status === "In review" ? (
                      <div className="flex items-center gap-2 text-[10px] text-[#a8a29e]">
                        <Clock className="h-3 w-3 text-amber-400" />
                        We typically respond within 24 hours on business days.
                      </div>
                    ) : t.status === "Answered" ? (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        This request has been answered. Reply above if the issue persists.
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}

          {tickets.length === 0 && (
            <div className="text-center py-10 text-[#78716c] text-xs">
              No support requests yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
