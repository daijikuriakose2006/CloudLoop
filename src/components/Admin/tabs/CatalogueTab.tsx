"use client";

import React, { useState } from "react";
import { ShoppingBag, Layers, GitBranch, PowerOff, Plus, X } from "lucide-react";
import { ProductRecord } from "../types";

interface CatalogueTabProps {
  products: ProductRecord[];
  onAddProduct: () => void;
}

const categoryColors: Record<string, string> = {
  Platform: "bg-[#cca267]/15 text-[#cca267]",
  Analytics: "bg-sky-500/15 text-sky-400",
  Portal: "bg-purple-500/15 text-purple-400",
  Integration: "bg-emerald-500/15 text-emerald-400",
  Compliance: "bg-rose-500/15 text-rose-400",
};

export function CatalogueTab({ products, onAddProduct }: CatalogueTabProps) {
  const [deactivated, setDeactivated] = useState<string[]>([]);

  const stats = [
    { label: "Total Products", value: products.length.toString(), accent: "#cca267" },
    { label: "Active", value: products.filter((p) => p.status === "Active").length.toString(), accent: "#34d399" },
    { label: "Total Variants", value: products.reduce((sum, p) => sum + p.variants, 0).toString(), accent: "#38bdf8" },
    { label: "Inactive", value: products.filter((p) => p.status === "Inactive").length.toString(), accent: "#f87171" },
  ];

  const toggleDeactivate = (id: string) => {
    setDeactivated((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#201a16] rounded-2xl p-5 border border-[#2d2520] text-center">
            <div className="text-3xl font-extrabold text-white mb-1" style={{ color: s.accent }}>{s.value}</div>
            <div className="text-[10px] text-[#78716c] uppercase font-mono tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((p) => {
          const isDeactivated = deactivated.includes(p.id) || p.status === "Inactive";
          return (
            <div
              key={p.id}
              className={`bg-[#201a16] rounded-2xl p-5 border transition-all ${isDeactivated ? "border-[#2d2520] opacity-60" : "border-[#2d2520] hover:border-[#3d332a]"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-bold text-white">{p.name}</div>
                  <div className="text-[10px] font-mono text-[#78716c] mt-0.5">{p.sku}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isDeactivated ? "bg-slate-500/15 text-slate-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                  {isDeactivated ? "Inactive" : "Active"}
                </span>
              </div>

              <p className="text-[10px] text-[#78716c] mb-4 leading-relaxed">{p.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${categoryColors[p.category] || "bg-slate-500/15 text-slate-400"}`}>
                  {p.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#a8a29e]">
                  <Layers className="h-3 w-3" /> {p.plans} plans
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#a8a29e]">
                  <GitBranch className="h-3 w-3" /> {p.variants} variants
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-1.5 rounded-lg bg-[#28211b] border border-[#3d332a] text-[10px] font-semibold text-[#e8e4dc] hover:bg-[#332a22] transition-colors">
                  Manage variants
                </button>
                <button
                  onClick={() => toggleDeactivate(p.id)}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold transition-colors flex items-center gap-1 ${
                    isDeactivated
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                  }`}
                >
                  <PowerOff className="h-3 w-3" />
                  {isDeactivated ? "Activate" : "Deactivate"}
                </button>
              </div>
            </div>
          );
        })}

        {/* Add product card */}
        <button
          onClick={onAddProduct}
          className="bg-[#201a16] rounded-2xl p-5 border border-dashed border-[#3d332a] hover:border-[#cca267]/50 transition-all flex flex-col items-center justify-center gap-3 text-[#78716c] hover:text-[#cca267] min-h-[160px]"
        >
          <div className="h-10 w-10 rounded-xl bg-[#28211b] border border-[#3d332a] flex items-center justify-center">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold">New product</span>
        </button>
      </div>
    </div>
  );
}
