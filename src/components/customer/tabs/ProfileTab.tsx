"use client";

import React, { useState } from "react";
import { Save, RotateCcw, Tag, Calendar, ShieldCheck } from "lucide-react";
import { CustomerProfile, MySubscription } from "../types";

interface ProfileTabProps {
  profile: CustomerProfile;
  subscription: MySubscription;
}

export function ProfileTab({ profile, subscription }: ProfileTabProps) {
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const kpis = [
    { label: "Plan", value: subscription.plan, icon: Tag, accent: "#cca267" },
    { label: "Member since", value: new Date(subscription.startDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }), icon: Calendar, accent: "#38bdf8" },
    { label: "Account security", value: "Strong", icon: ShieldCheck, accent: "#34d399" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-[#201a16] rounded-2xl p-4 border border-[#2d2520] flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${k.accent}20`, border: `1px solid ${k.accent}40` }}
              >
                <Icon className="h-5 w-5" style={{ color: k.accent }} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">{k.value}</div>
                <div className="text-[10px] text-[#a8a29e]">{k.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile form — two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Left: Personal info */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
            <div className="text-xs font-bold text-white">Personal Information</div>
          </div>
          <div className="p-5 space-y-4">
            {[
              { key: "fullName", label: "Full name" },
              { key: "email", label: "Work email" },
              { key: "phone", label: "Phone number" },
              { key: "city", label: "City" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">{label}</label>
                <input
                  type="text"
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Billing info */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
            <div className="text-xs font-bold text-white">Billing Information</div>
          </div>
          <div className="p-5 space-y-4">
            {[
              { key: "company", label: "Company name" },
              { key: "gstin", label: "GSTIN" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">{label}</label>
                <input
                  type="text"
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">Billing address</label>
              <textarea
                value={form.billingAddress}
                onChange={(e) => handleChange("billingAddress", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save / Reset */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
        >
          <Save className="h-3.5 w-3.5" />
          {saved ? "Saved!" : "Save changes"}
        </button>
        <button
          onClick={() => { setForm({ ...profile }); setSaved(false); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
        {saved && (
          <span className="text-xs text-emerald-400 font-semibold">✓ Profile updated successfully.</span>
        )}
      </div>

      <div className="rounded-xl bg-[#28211b] border border-[#3d332a] px-4 py-3 text-[10px] text-[#a8a29e] leading-relaxed">
        <strong className="text-[#cca267]">Note:</strong> Changes to GSTIN and billing address take effect on the next invoice. Past invoices retain the details at time of issue.
      </div>
    </div>
  );
}
