"use client";

import React, { useState } from "react";
import { Save, RotateCcw, Clock, CreditCard, Tag } from "lucide-react";
import { adminSettings } from "../initialData";

export function SettingsTab() {
  const [form, setForm] = useState({ ...adminSettings });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setForm({ ...adminSettings });
    setSaved(false);
  };

  const kpiTiles = [
    { label: "Workspace", value: form.workspaceName, icon: Tag, accent: "#cca267" },
    { label: "Billing Run", value: form.billingRunTime, icon: Clock, accent: "#38bdf8" },
    { label: "Invoice Prefix", value: form.invoicePrefix, icon: CreditCard, accent: "#a78bfa" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Quick glance tiles */}
      <div className="grid grid-cols-3 gap-4">
        {kpiTiles.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className="bg-[#201a16] rounded-2xl p-4 border border-[#2d2520] flex items-center gap-3"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${t.accent}20`, border: `1px solid ${t.accent}40` }}
              >
                <Icon className="h-5 w-5" style={{ color: t.accent }} />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">{t.value}</div>
                <div className="text-[10px] text-[#a8a29e]">{t.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings form — two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Left: General */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
            <div className="text-xs font-bold text-white">General</div>
          </div>
          <div className="p-5 space-y-4">
            {[
              { key: "workspaceName", label: "Workspace name" },
              { key: "supportEmail", label: "Support email" },
              { key: "companyName", label: "Registered company name" },
              { key: "gstin", label: "GSTIN" },
              { key: "address", label: "Registered address" },
              { key: "currency", label: "Currency" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                  {label}
                </label>
                {key === "address" ? (
                  <textarea
                  value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={(form as Record<string, unknown>)[key] as string}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Billing & Invoice */}
        <div className="bg-[#201a16] rounded-2xl border border-[#2d2520] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#2d2520] bg-[#1a1512]">
            <div className="text-xs font-bold text-white">Billing & Invoicing</div>
          </div>
          <div className="p-5 space-y-4">
            {[
              { key: "invoiceDueWindow", label: "Invoice due window (days)" },
              { key: "invoicePrefix", label: "Invoice prefix" },
              { key: "billingRunTime", label: "Billing run time (24h UTC)" },
              { key: "reminderDays", label: "Reminder days (comma-separated)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                  {label}
                </label>
                <input
                  type="text"
                  value={(form as Record<string, unknown>)[key] as string}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors"
                />
              </div>
            ))}

            {/* Auto dunning toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#78716c] uppercase font-mono mb-0.5">
                  Automatic dunning
                </div>
                <div className="text-[10px] text-[#a8a29e]">
                  Send reminders before and after due dates
                </div>
              </div>
              <button
                onClick={() => handleChange("autoDunning", !form.autoDunning)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.autoDunning ? "bg-[#cca267]" : "bg-[#3d332a]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    form.autoDunning ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Footer note */}
            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Invoice footer note
              </label>
              <textarea
                value={form.footerNote}
                onChange={(e) => handleChange("footerNote", e.target.value)}
                rows={3}
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
          onClick={handleReset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
        {saved && (
          <span className="text-xs text-emerald-400 font-semibold">
            ✓ Settings saved successfully.
          </span>
        )}
      </div>

      {/* Currency note */}
      <div className="rounded-xl bg-[#28211b] border border-[#3d332a] px-4 py-3 text-[10px] text-[#a8a29e] leading-relaxed">
        <strong className="text-[#cca267]">Note:</strong> Currency changes are forward-only — past invoices keep their original snapshot value. The registered company name and invoice prefix appear on every invoice document.
      </div>
    </div>
  );
}
