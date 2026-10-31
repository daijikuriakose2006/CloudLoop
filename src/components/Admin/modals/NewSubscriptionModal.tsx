"use client";

import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { searchCustomers, Customer } from "@/lib/api/customers";
import { searchPlans, Plan } from "@/lib/api/plans";

interface NewSubscriptionModalProps {
  onClose: () => void;
  onSubmit: (data: {
    customerId: string;
    planId: string;
    startDate: string;
    trialDays: number;
  }) => void;
}

export function NewSubscriptionModal({ onClose, onSubmit }: NewSubscriptionModalProps) {
  // Customer search
  const [customerQuery, setCustomerQuery] = useState("");
  const [customerResults, setCustomerResults] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // Plan search
  const [planQuery, setPlanQuery] = useState("");
  const [planResults, setPlanResults] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);

  // Form fields
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [trialDays, setTrialDays] = useState(0);
  const [error, setError] = useState("");

  // Customer search effect
  useEffect(() => {
    if (customerQuery.length < 2) { setCustomerResults([]); return; }
    const timer = setTimeout(async () => {
      const results = await searchCustomers(customerQuery);
      setCustomerResults(results);
      setShowCustomerDropdown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [customerQuery]);

  // Plan search effect
  useEffect(() => {
    if (planQuery.length < 1) { setPlanResults([]); return; }
    const timer = setTimeout(async () => {
      const results = await searchPlans(planQuery);
      setPlanResults(results);
      setShowPlanDropdown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [planQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) { setError("Please select a customer."); return; }
    if (!selectedPlan) { setError("Please select a plan."); return; }
    if (!startDate) { setError("Please choose a start date."); return; }
    setError("");
    onSubmit({
      customerId: selectedCustomer.id,
      planId: selectedPlan.id,
      startDate,
      trialDays,
    });
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1512] border border-[#2d2520] rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2520]">
          <div>
            <div className="text-sm font-extrabold text-white">New Subscription</div>
            <div className="text-[10px] text-[#78716c]">Pick a customer, choose a plan, set the start date and trial period.</div>
          </div>
          <button onClick={onClose} className="text-[#78716c] hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">{error}</div>
          )}

          {/* Customer search */}
          <div className="relative">
            <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
              Customer <span className="text-rose-400">*</span>
            </label>
            {selectedCustomer ? (
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#28211b] border border-[#cca267]">
                <div>
                  <span className="text-xs font-semibold text-white">{selectedCustomer.name}</span>
                  <span className="text-[10px] text-[#78716c] ml-2">{selectedCustomer.email}</span>
                </div>
                <button type="button" onClick={() => { setSelectedCustomer(null); setCustomerQuery(""); }} className="text-[#78716c] hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#78716c]" />
                <input
                  type="text"
                  value={customerQuery}
                  onChange={(e) => setCustomerQuery(e.target.value)}
                  onFocus={() => customerResults.length > 0 && setShowCustomerDropdown(true)}
                  placeholder="Search by customer name or email..."
                  className={`${inputClass} pl-8`}
                  autoFocus
                />
              </div>
            )}
            {showCustomerDropdown && customerResults.length > 0 && !selectedCustomer && (
              <div className="absolute z-10 mt-1 w-full bg-[#201a16] border border-[#3d332a] rounded-xl shadow-xl max-h-40 overflow-y-auto">
                {customerResults.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => { setSelectedCustomer(c); setShowCustomerDropdown(false); setCustomerQuery(c.name); }}
                    className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#28211b] transition-colors border-b border-[#2d2520] last:border-0"
                  >
                    <span className="font-semibold text-white">{c.name}</span>
                    <span className="text-[10px] text-[#78716c] ml-2">{c.email}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plan search */}
          <div className="relative">
            <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
              Plan <span className="text-rose-400">*</span>
            </label>
            {selectedPlan ? (
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#28211b] border border-[#cca267]">
                <div>
                  <span className="text-xs font-semibold text-white">{selectedPlan.name}</span>
                  <span className="text-[10px] text-[#78716c] ml-2">₹{Number(selectedPlan.price).toLocaleString("en-IN")} / {selectedPlan.billingPeriod}</span>
                </div>
                <button type="button" onClick={() => { setSelectedPlan(null); setPlanQuery(""); }} className="text-[#78716c] hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#78716c]" />
                <input
                  type="text"
                  value={planQuery}
                  onChange={(e) => setPlanQuery(e.target.value)}
                  onFocus={() => planResults.length > 0 && setShowPlanDropdown(true)}
                  placeholder="Search by plan name..."
                  className={`${inputClass} pl-8`}
                />
              </div>
            )}
            {showPlanDropdown && planResults.length > 0 && !selectedPlan && (
              <div className="absolute z-10 mt-1 w-full bg-[#201a16] border border-[#3d332a] rounded-xl shadow-xl max-h-40 overflow-y-auto">
                {planResults.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setSelectedPlan(p); setShowPlanDropdown(false); setPlanQuery(p.name); }}
                    className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#28211b] transition-colors border-b border-[#2d2520] last:border-0"
                  >
                    <span className="font-semibold text-white">{p.name}</span>
                    <span className="text-[10px] text-[#78716c] ml-2">₹{Number(p.price).toLocaleString("en-IN")} / {p.billingPeriod}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Start date + trial days */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Start date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Trial days
              </label>
              <input
                type="number"
                min="0"
                max="90"
                value={trialDays}
                onChange={(e) => setTrialDays(parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Summary */}
          {selectedCustomer && selectedPlan && (
            <div className="rounded-xl bg-[#28211b] border border-[#3d332a] p-4 space-y-1.5">
              <div className="text-[10px] text-[#78716c] uppercase font-mono mb-2">Summary</div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a8a29e]">Customer</span>
                <span className="text-white font-semibold">{selectedCustomer.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a8a29e]">Plan</span>
                <span className="text-white font-semibold">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a8a29e]">Price</span>
                <span className="text-[#cca267] font-bold">₹{Number(selectedPlan.price).toLocaleString("en-IN")} / {selectedPlan.billingPeriod.toLowerCase()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#a8a29e]">Start</span>
                <span className="text-white font-semibold">{startDate}</span>
              </div>
              {trialDays > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-[#a8a29e]">Trial</span>
                  <span className="text-sky-400 font-semibold">{trialDays} days</span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs font-semibold text-[#a8a29e] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#cca267] text-xs font-bold text-[#1c1917] hover:bg-[#d6af76] transition-colors"
            >
              Create subscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
