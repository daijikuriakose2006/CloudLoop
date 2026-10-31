"use client";

import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface AddCustomerModalProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    contactName?: string;
    phone?: string;
    city?: string;
    gstin?: string;
  }) => void;
}

export function AddCustomerModal({ onClose, onSubmit }: AddCustomerModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [gstin, setGstin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Company name is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("A valid email is required.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain an uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain a lowercase letter.");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain a special character.");
      return;
    }
    setError("");
    onSubmit({
      name: name.trim(),
      email: email.trim(),
      password,
      contactName: contactName.trim() || undefined,
      phone: phone.trim() || undefined,
      city: city.trim() || undefined,
      gstin: gstin.trim() || undefined,
    });
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-[#28211b] border border-[#3d332a] text-xs text-white placeholder-[#78716c] focus:outline-none focus:border-[#cca267] transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1512] border border-[#2d2520] rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2520]">
          <div>
            <div className="text-sm font-extrabold text-white">Add Customer</div>
            <div className="text-[10px] text-[#78716c]">Creates a customer account with login credentials.</div>
          </div>
          <button onClick={onClose} className="text-[#78716c] hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Company name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sunrise Textiles"
                className={inputClass}
                autoFocus
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="billing@company.in"
                className={inputClass}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, uppercase, lowercase, special"
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              <div className="flex gap-2 mt-1.5">
                {[
                  { label: "8+ chars", ok: password.length >= 8 },
                  { label: "A-Z", ok: /[A-Z]/.test(password) },
                  { label: "a-z", ok: /[a-z]/.test(password) },
                  { label: "Special", ok: /[^A-Za-z0-9]/.test(password) },
                ].map((r) => (
                  <span key={r.label} className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${r.ok ? "bg-emerald-500/15 text-emerald-400" : "bg-[#2d2520] text-[#78716c]"}`}>
                    {r.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Contact name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Priya Nair"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Mumbai"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#78716c] uppercase font-mono mb-1.5">
                GSTIN
              </label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder="27AABCS1234D1ZV"
                className={inputClass}
              />
            </div>
          </div>

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
              Add customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
