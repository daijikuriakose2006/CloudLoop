"use client";

import React, { useState } from "react";
import { X, UserPlus, Building, Mail, Phone, ShieldCheck } from "lucide-react";
import { CustomerRecord, PlanItem } from "./types";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: PlanItem[];
  onSaveCustomer: (newCustomer: CustomerRecord) => void;
}

export function AddCustomerModal({
  isOpen,
  onClose,
  plans,
  onSaveCustomer,
}: AddCustomerModalProps) {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(plans[0]?.name || "Growth Pro");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !contactName.trim() || !email.trim()) {
      setError("Company name, contact name and email are required fields.");
      return;
    }

    const hasGst = gstNumber.trim().length >= 10;
    const newCust: CustomerRecord = {
      id: `cust-${Date.now()}`,
      company: company.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim() || "+91 98000 00000",
      gstNumber: gstNumber.trim().toUpperCase(),
      hasGst,
      plan: selectedPlan,
      mrr: selectedPlan.includes("Scale") ? 49999 : selectedPlan.includes("Growth") ? 14999 : 4999,
      status: hasGst ? "Active" : "Pending GST",
      address: address.trim() || "India",
      createdAt: new Date().toISOString().split("T")[0],
    };

    onSaveCustomer(newCust);
    onClose();
    setCompany("");
    setContactName("");
    setEmail("");
    setPhone("");
    setGstNumber("");
    setAddress("");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-[#383028] bg-[#1f1a16] text-white p-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#383028] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#cca267] text-[#181412] flex items-center justify-center font-bold text-sm">
              <UserPlus className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Customer Record</h2>
              <p className="text-xs text-[#a8a29e]">
                First field is required before saving. GST required for legal tax invoices.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#a8a29e] hover:text-white hover:bg-[#2e2620]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Company Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Nexus Dynamics Technologies"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Primary Contact Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Aarav Mehta"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Work Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="aarav@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 98201 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                GSTIN Number (15 chars)
              </label>
              <input
                type="text"
                placeholder="27AABCT1234A1Z5"
                maxLength={15}
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white uppercase font-mono placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Assigned Plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} (₹{p.pricePerCycle.toLocaleString("en-IN")}/{p.interval})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Billing Address
            </label>
            <textarea
              rows={2}
              placeholder="Corporate registered office address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] p-3 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#383028] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#383028] bg-[#16120f] px-4 py-2 text-xs font-semibold text-[#a8a29e] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#cca267] px-5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
            >
              Save Customer Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
