"use client";

import React, { useState } from "react";
import {
  Inbox,
  UserCheck,
  Send,
  MessageSquare,
  Search,
  X,
  FilePlus,
  BookOpen,
} from "lucide-react";
import { CatalogueRequest } from "../types";

interface RequestsTabProps {
  requests: CatalogueRequest[];
  onAssignToMe: (id: string) => void;
  onSendReply: (id: string, replyText: string) => void;
  onOpenNewQuotation: () => void;
  onSwitchTab: (tab: any) => void;
  activeStaffEmail: string;
}

export function RequestsTab({
  requests,
  onAssignToMe,
  onSendReply,
  onOpenNewQuotation,
  onSwitchTab,
  activeStaffEmail,
}: RequestsTabProps) {
  const [filter, setFilter] = useState<"All" | "New" | "In review" | "Answered">("All");
  const [search, setSearch] = useState("");
  const [activeRequest, setActiveRequest] = useState<CatalogueRequest | null>(null);
  const [replyInput, setReplyInput] = useState("");

  const filtered = requests.filter((r) => {
    if (filter !== "All" && r.status !== filter) return false;
    const q = search.toLowerCase();
    return (
      r.requestId.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.planName.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  });

  const handleOpenModal = (r: CatalogueRequest) => {
    setActiveRequest(r);
    setReplyInput(r.lastReply || "");
  };

  const handleSend = () => {
    if (!activeRequest || !replyInput.trim()) return;
    onSendReply(activeRequest.id, replyInput);
    setActiveRequest(null);
    setReplyInput("");
  };

  return (
    <div className="space-y-6">
      {/* 4 KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">New enquiries</div>
          <div className="text-3xl font-extrabold text-sky-400 tracking-tight">5</div>
          <div className="text-xs text-sky-300 mt-2 font-medium">Awaiting first response</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">In review</div>
          <div className="text-3xl font-extrabold text-amber-400 tracking-tight">3</div>
          <div className="text-xs text-amber-300 mt-2 font-medium">Assigned to staff</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Answered</div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">18</div>
          <div className="text-xs text-emerald-300 mt-2 font-medium">Delivered to portals</div>
        </div>

        <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-5 text-white shadow-md">
          <div className="text-xs text-[#a8a29e] mb-1">Last 30 days</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">26</div>
          <div className="text-xs text-[#cca267] mt-2 font-medium">100% SLA compliance</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#383028]">
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
            <input
              type="text"
              placeholder="Search request id, customer, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#1a1613] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status pills */}
            <div className="flex items-center rounded-xl bg-[#1a1613] p-1 border border-[#383028] text-xs">
              {(["All", "New", "In review", "Answered"] as const).map((s) => (
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
              onClick={onOpenNewQuotation}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#383028] bg-[#1a1613] px-3 py-2 text-xs font-semibold text-[#e8e4dc] hover:text-white hover:bg-[#28211b] transition-all"
            >
              <FilePlus className="h-3.5 w-3.5 text-[#cca267]" />
              <span>Build a quotation</span>
            </button>

            <button
              onClick={() => onSwitchTab("catalogue")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#383028] bg-[#1a1613] px-3 py-2 text-xs font-semibold text-[#e8e4dc] hover:text-white hover:bg-[#28211b] transition-all"
            >
              <BookOpen className="h-3.5 w-3.5 text-sky-400" />
              <span>Open catalogue</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#383028] text-[11px] font-mono uppercase text-[#78716c]">
                <th className="py-3">Request ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Plan & Units</th>
                <th className="py-3">Budget Band</th>
                <th className="py-3">Received</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383028]/60">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#2c2520] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-sky-300">
                    {r.requestId}
                  </td>
                  <td className="py-3.5">
                    <div className="font-bold text-white">{r.customerName}</div>
                    <div className="text-[11px] text-[#a8a29e] font-mono">{r.email}</div>
                  </td>
                  <td className="py-3.5">
                    <div className="text-[#e8e4dc] font-semibold">{r.planName}</div>
                    <div className="text-[11px] text-[#78716c]">Units: {r.unitsRequested}</div>
                  </td>
                  <td className="py-3.5 font-mono text-[#cca267]">
                    {r.budgetBand}
                  </td>
                  <td className="py-3.5 font-mono text-[#a8a29e]">
                    {r.receivedDate}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.status === "Answered"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : r.status === "In review"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-sky-500/20 text-sky-300"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleOpenModal(r)}
                      className="rounded-lg border border-[#383028] bg-[#1a1613] px-3 py-1 text-xs font-semibold text-[#cca267] hover:bg-[#28211b] hover:text-white transition-colors"
                    >
                      Reply / Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Reply Modal */}
      {activeRequest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-[#383028] bg-[#1f1a16] p-6 text-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#383028] mb-4">
              <div>
                <span className="font-mono text-xs text-sky-400 font-bold">
                  {activeRequest.requestId}
                </span>
                <h3 className="text-base font-bold text-white">
                  Enquiry from {activeRequest.customerName}
                </h3>
              </div>
              <button
                onClick={() => setActiveRequest(null)}
                className="rounded-lg p-1.5 text-[#a8a29e] hover:text-white hover:bg-[#2e2620]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-[#16120f] border border-[#2d2520]">
                <div>
                  <span className="text-[#a8a29e] block">Email:</span>
                  <span className="font-mono text-white font-medium">{activeRequest.email}</span>
                </div>
                <div>
                  <span className="text-[#a8a29e] block">Requested Plan:</span>
                  <span className="text-[#cca267] font-semibold">{activeRequest.planName}</span>
                </div>
                <div>
                  <span className="text-[#a8a29e] block">Budget Band:</span>
                  <span className="font-mono text-white">{activeRequest.budgetBand}</span>
                </div>
                <div>
                  <span className="text-[#a8a29e] block">Assigned Owner:</span>
                  <span className="text-white font-medium">
                    {activeRequest.assignedTo || "Unassigned"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a8a29e] uppercase font-mono tracking-wider mb-1.5">
                  Customer Requirement Text
                </label>
                <div className="p-3.5 rounded-xl bg-[#16120f] border border-[#2d2520] text-xs text-[#e8e4dc] leading-relaxed">
                  {activeRequest.requirementText}
                </div>
              </div>

              {activeRequest.status === "New" && (
                <button
                  onClick={() => {
                    onAssignToMe(activeRequest.id);
                    setActiveRequest({
                      ...activeRequest,
                      status: "In review",
                      assignedTo: activeStaffEmail,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#cca267] hover:underline font-bold"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Assign to me ({activeStaffEmail})</span>
                </button>
              )}

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="font-semibold text-white">
                    Staff Reply (Appears in Customer Catalogue)
                  </label>
                  <span className="text-[11px] text-[#78716c] font-mono">
                    {replyInput.length}/500 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Type your response to the customer. Max 500 characters..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="w-full rounded-xl border border-[#383028] bg-[#16120f] p-3 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#383028]">
              <button
                onClick={() => setActiveRequest(null)}
                className="rounded-xl border border-[#383028] bg-[#1a1613] px-4 py-2 text-xs font-semibold text-[#e8e4dc] hover:bg-[#28211b]"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={!replyInput.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-[#cca267] px-5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] disabled:opacity-50 transition-all shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send reply & Mark Answered</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
