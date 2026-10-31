"use client";

import React, { useState } from "react";
import { X, Send, Calculator, Check, FileText } from "lucide-react";
import { CustomerRecord, PlanItem, QuotationRecord } from "./types";

interface NewQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: CustomerRecord[];
  plans: PlanItem[];
  preSelectedPlan?: PlanItem | null;
  onSaveQuotation: (newQuote: QuotationRecord) => void;
}

export function NewQuotationModal({
  isOpen,
  onClose,
  customers,
  plans,
  preSelectedPlan,
  onSaveQuotation,
}: NewQuotationModalProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    customers[0]?.id || ""
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    preSelectedPlan?.id || plans[0]?.id || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(
    preSelectedPlan?.pricePerCycle || plans[0]?.pricePerCycle || 14999
  );
  const [discount, setDiscount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(18); // Default 18% GST in India
  const [validDays, setValidDays] = useState<number>(7);
  const [notes, setNotes] = useState<string>("");

  if (!isOpen) return null;

  // Live calculations
  const subtotal = quantity * unitPrice;
  const taxableBase = Math.max(0, subtotal - discount);
  const taxAmount = Math.round((taxableBase * taxRate) / 100);
  const total = taxableBase + taxAmount;

  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + validDays);
  const validUntilString = validUntilDate.toISOString().split("T")[0];

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    const found = plans.find((p) => p.id === planId);
    if (found) {
      setUnitPrice(found.pricePerCycle);
    }
  };

  const handleSend = (asDraft: boolean = false) => {
    const cust = customers.find((c) => c.id === selectedCustomerId) || customers[0];
    const plan = plans.find((p) => p.id === selectedPlanId) || plans[0];

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newQuote: QuotationRecord = {
      id: `quote-${Date.now()}`,
      quoteNumber: `CL-Q-2026-${randomNum}`,
      customerId: cust.id,
      customerName: cust.company,
      contactName: cust.contactName,
      planId: plan.id,
      planName: `${plan.name} (${plan.interval})`,
      quantity,
      unitPrice,
      subtotal,
      discount,
      taxRate,
      taxAmount,
      total,
      validUntil: validUntilString,
      status: asDraft ? "Draft" : "Sent",
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onSaveQuotation(newQuote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-[#383028] bg-[#1f1a16] text-white p-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#383028] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#cca267] text-[#181412] flex items-center justify-center font-bold text-sm">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Quotation Builder
              </h2>
              <p className="text-xs text-[#a8a29e]">
                Build a tailored offer with live GST auto-calculation
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

        {/* Form Body */}
        <div className="space-y-4 text-xs">
          {/* Customer select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Target Customer
              </label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company} ({c.contactName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Select Base Plan
              </label>
              <select
                value={selectedPlanId}
                onChange={(e) => handlePlanChange(e.target.value)}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (₹{p.pricePerCycle.toLocaleString("en-IN")})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity, Unit Price, Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Quantity (Seats/Licenses)
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#cca267] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Unit Price (₹)
              </label>
              <input
                type="number"
                min={0}
                value={unitPrice}
                onChange={(e) => setUnitPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#cca267] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Discount (₹)
              </label>
              <input
                type="number"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#cca267] focus:outline-none"
              />
            </div>
          </div>

          {/* Tax rate & Validity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                GST Tax Rate (Admin configured)
              </label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(parseInt(e.target.value))}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
              >
                <option value={18}>18% GST (Standard SaaS rate)</option>
                <option value={12}>12% GST</option>
                <option value={5}>5% GST</option>
                <option value={0}>0% (Export / SEZ Exempt)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
                Offer Validity
              </label>
              <select
                value={validDays}
                onChange={(e) => setValidDays(parseInt(e.target.value))}
                className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
              >
                <option value={7}>7 Days (Expires {validUntilString})</option>
                <option value={14}>14 Days</option>
                <option value={30}>30 Days</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Staff Notes / Commercial Conditions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Includes onboarding assistance, annual billing discount..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] p-3 text-xs text-white focus:border-[#cca267] focus:outline-none resize-none"
            />
          </div>

          {/* Live Summary Calculation Box */}
          <div className="p-4 rounded-xl bg-[#16120f] border border-[#2d2520] space-y-2 mt-4 font-mono">
            <div className="text-[11px] text-[#cca267] uppercase tracking-wider font-bold">
              Live Recomputed Totals
            </div>
            <div className="flex justify-between text-xs text-[#a8a29e]">
              <span>Subtotal:</span>
              <span className="text-white">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-xs text-[#a8a29e]">
              <span>Discount applied:</span>
              <span className="text-rose-400">-₹{discount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-xs text-[#a8a29e]">
              <span>Taxable base:</span>
              <span className="text-white">₹{taxableBase.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-xs text-[#a8a29e]">
              <span>GST ({taxRate}%):</span>
              <span className="text-[#cca267] font-semibold">+₹{taxAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="pt-2 border-t border-[#383028] flex justify-between text-base font-bold text-white">
              <span>Total Quotation:</span>
              <span className="text-xl text-[#cca267]">₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex justify-between items-center pt-6 border-t border-[#383028] mt-6">
          <button
            onClick={() => handleSend(true)}
            className="rounded-xl border border-[#383028] bg-[#16120f] px-4 py-2 text-xs font-semibold text-[#a8a29e] hover:text-white hover:bg-[#28211b]"
          >
            Save as Draft
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#383028] bg-[#16120f] px-4 py-2 text-xs font-semibold text-[#a8a29e] hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSend(false)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#cca267] px-5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send to customer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
