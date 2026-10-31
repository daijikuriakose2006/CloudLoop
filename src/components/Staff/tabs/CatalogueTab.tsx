"use client";

import React, { useState } from "react";
import {
  Layers,
  Search,
  Plus,
  Lock,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { ProductItem, PlanItem } from "../types";

interface CatalogueTabProps {
  products: ProductItem[];
  plans: PlanItem[];
  onSelectPlanForQuotation: (plan: PlanItem) => void;
}

export function CatalogueTab({
  products,
  plans,
  onSelectPlanForQuotation,
}: CatalogueTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Core API", "Infrastructure", "Analytics", "Add-ons"];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Category filters & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-[#231e1a] p-1.5 border border-[#383028]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#cca267] text-[#181412] font-bold shadow-xs"
                  : "text-[#a8a29e] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-[#a8a29e]" />
          <input
            type="text"
            placeholder="Search catalogue items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#383028] bg-[#231e1a] pl-9 pr-3 py-2 text-xs text-white placeholder-[#78716c] focus:border-[#cca267] focus:outline-none"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-[#383028] bg-[#231e1a] p-6 text-white shadow-md flex flex-col justify-between hover:border-[#cca267]/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-[#cca267]/15 border border-[#cca267]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#cca267] uppercase">
                  {p.category}
                </span>
                <span className="text-xs text-[#a8a29e] font-mono">
                  {p.variantCount} variants
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                {p.name}
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="space-y-2 mb-6">
                {p.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#e8e4dc]">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#383028] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#78716c] uppercase font-mono block">
                  Starting at
                </span>
                <span className="text-lg font-extrabold text-white font-mono">
                  ₹{p.startingPrice.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-[#a8a29e]">/mo</span>
                </span>
              </div>

              <button
                onClick={() => {
                  const matchingPlan = plans.find((pl) => pl.productId === p.id) || plans[0];
                  onSelectPlanForQuotation(matchingPlan);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#cca267] px-3.5 py-2 text-xs font-bold text-[#181412] hover:bg-[#d6af76] transition-all shadow-sm"
              >
                <span>Add to quotation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#383028] bg-[#1a1613] p-4 flex items-center gap-2.5 text-xs text-[#a8a29e]">
        <Lock className="h-4 w-4 text-[#cca267] shrink-0" />
        <span>
          Read-only catalogue. Custom package creation and pricing adjustments stay with Admin roles.
        </span>
      </div>
    </div>
  );
}
