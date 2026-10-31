"use client";

import React, { useState } from "react";
import { X, CreditCard, Check, AlertCircle } from "lucide-react";
import { InvoiceRecord, PaymentRecord } from "./types";

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: InvoiceRecord[];
  onSavePayment: (newPayment: PaymentRecord) => void;
}

export function RecordPaymentModal({
  isOpen,
  onClose,
  invoices,
  onSavePayment,
}: RecordPaymentModalProps) {
  const openInvoices = invoices.filter((i) => i.status !== "Paid");
  const defaultInvoice = openInvoices[0] || invoices[0];

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(
    defaultInvoice?.id || ""
  );
  const [method, setMethod] = useState<"Bank Transfer" | "Cheque" | "UPI" | "Manual">(
    "Bank Transfer"
  );
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const currentInvoice =
    invoices.find((i) => i.id === selectedInvoiceId) || defaultInvoice;

  const [amount, setAmount] = useState<number>(currentInvoice?.total || 0);

  if (!isOpen) return null;

  const handleInvoiceChange = (id: string) => {
    setSelectedInvoiceId(id);
    const found = invoices.find((i) => i.id === id);
    if (found) {
      setAmount(found.total);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInvoice) return;

    if (amount <= 0) {
      setError("Payment amount must be greater than zero.");
      return;
    }

    if (amount > currentInvoice.total) {
      setError(
        `Amount cannot exceed the invoice balance of ₹${currentInvoice.total.toLocaleString("en-IN")}.`
      );
      return;
    }

    if (!reference.trim()) {
      setError("Please provide a bank UTR / cheque reference number.");
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      receiptNumber: `REC-2026-${randomNum}`,
      invoiceNumber: currentInvoice.invoiceNumber,
      customerName: currentInvoice.customerName,
      method,
      amount,
      paidAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "Confirmed",
      referenceNumber: reference.trim(),
    };

    onSavePayment(newPayment);
    onClose();
    setReference("");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-[#383028] bg-[#1f1a16] text-white p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-[#383028] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#cca267] text-[#181412] flex items-center justify-center font-bold text-sm">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Record Manual Payment</h2>
              <p className="text-xs text-[#a8a29e]">
                Amount cannot exceed invoice balance. Generates customer receipt.
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
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Select Invoice
            </label>
            <select
              value={selectedInvoiceId}
              onChange={(e) => handleInvoiceChange(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
            >
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} - {inv.customerName} (₹{inv.total.toLocaleString("en-IN")}) [
                  {inv.status}]
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[#a8a29e]">
                Payment Amount (INR)
              </label>
              {currentInvoice && (
                <span className="text-[11px] text-[#cca267] font-mono font-medium">
                  Max: ₹{currentInvoice.total.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            <input
              type="number"
              min={1}
              max={currentInvoice?.total || 9999999}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white font-mono focus:border-[#cca267] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Payment Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white focus:border-[#cca267] focus:outline-none"
            >
              <option value="Bank Transfer">Bank Transfer (NEFT / RTGS / IMPS)</option>
              <option value="UPI">UPI Direct</option>
              <option value="Cheque">Bank Cheque</option>
              <option value="Manual">Manual Settlement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a8a29e] mb-1.5">
              Bank Reference / UTR Number <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. UTR389201948102 or CHQ-004812"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full rounded-xl border border-[#383028] bg-[#16120f] px-3.5 py-2.5 text-xs text-white font-mono placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
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
              Confirm & Generate Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
