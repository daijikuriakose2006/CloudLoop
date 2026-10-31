"use client";

import React, { useState } from "react";
import { Shield, Clock, Users, UserX, Mail, Plus } from "lucide-react";
import { UserRecord } from "../types";

interface UsersTabProps {
  users: UserRecord[];
}

const roleColors: Record<string, string> = {
  Admin: "bg-[#cca267]/15 text-[#cca267]",
  Finance: "bg-sky-500/15 text-sky-400",
  Staff: "bg-purple-500/15 text-purple-400",
  Customer: "bg-slate-500/15 text-slate-400",
};

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400",
  Pending: "bg-amber-500/15 text-amber-400",
  Suspended: "bg-rose-500/15 text-rose-400",
};

export function UsersTab({ users }: UsersTabProps) {
  const [roleFilter, setRoleFilter] = useState("All");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Staff");

  const stats = [
    { label: "Team Members", value: users.filter((u) => u.role !== "Customer").length.toString(), icon: Shield, accent: "#cca267" },
    { label: "Pending Invites", value: users.filter((u) => u.status === "Pending").length.toString(), icon: Clock, accent: "#fbbf24" },
    { label: "Self-reg Customers", value: users.filter((u) => u.role === "Customer").length.toLocaleString(), icon: Users, accent: "#38bdf8" },
    { label: "Suspended", value: users.filter((u) => u.status === "Suspended").length.toString(), icon: UserX, accent: "#f87171" },
  ];

  const filtered = users.filter((u) => roleFilter === "All" || u.role === roleFilter);

  return (
    <div className="space-y-5">
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

      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {["All", "Admin", "Finance", "Staff", "Customer"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${roleFilter === r ? "bg-[#cca267] text-[#1c1917]" : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"}`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          Invite user
        </button>
      </div>

      <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#2d2520] bg-[#1a1512]">
              {["Name", "Email", "Role", "Status", "Last Login"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono tracking-wider uppercase text-[#78716c]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2520]">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-[#28211b] transition-colors">
                <td className="px-4 py-3 font-semibold text-white">{u.name}</td>
                <td className="px-4 py-3 font-mono text-[#a8a29e]">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleColors[u.role]}`}>{u.role}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[u.status]}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3 font-mono text-[#78716c]">{u.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1a1512] border border-[#2d2520] rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="text-sm font-bold text-white mb-4">Invite Team Member</div>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1">Work email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white focus:outline-none focus:border-[#cca267] transition-colors"
                >
                  <option>Admin</option>
                  <option>Finance</option>
                  <option>Staff</option>
                </select>
              </div>
            </div>
            <p className="text-[10px] text-[#78716c] mb-4">A 24-hour activation link will be sent to the email address.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowInviteModal(false)} className="flex-1 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors">Cancel</button>
              <button onClick={() => setShowInviteModal(false)} className="flex-1 py-2 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors">Send invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
