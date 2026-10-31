"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { CatalogueProduct } from "../types";

interface CatalogueTabProps {
  products: CatalogueProduct[];
  currentPlan: string;
}

const categoryColors: Record<string, string> = {
  Platform: "#cca267",
  Analytics: "#38bdf8",
  Portal: "#a78bfa",
  Integration: "#34d399",
  Compliance: "#fb923c",
};

export function CatalogueTab({ products, currentPlan }: CatalogueTabProps) {
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="space-y-5">
      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-[#cca267] text-[#1c1917]"
                : "bg-[#28211b] border border-[#3d332a] text-[#a8a29e] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => {
          const accent = categoryColors[product.category] || "#cca267";
          return (
            <div
              key={product.id}
              className="bg-[#201a16] rounded-2xl border border-[#2d2520] hover:border-[#3d332a] overflow-hidden transition-all"
            >
              {/* Accent bar */}
              <div className="h-1.5" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-extrabold text-white">{product.name}</div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold mt-1 inline-block"
                      style={{ backgroundColor: `${accent}20`, color: accent }}
                    >
                      {product.category}
                    </span>
                  </div>
                  {/* Glowing dot */}
                  <div
                    className="h-3 w-3 rounded-full mt-1 shrink-0 shadow-lg"
                    style={{ backgroundColor: accent, boxShadow: `0 0 10px 2px ${accent}60` }}
                  />
                </div>

                <p className="text-[10px] text-[#78716c] leading-relaxed mb-4">{product.description}</p>

                {/* Plans */}
                <div className="space-y-2.5">
                  {product.plans.map((plan) => {
                    const isCurrentPlan = plan.name === currentPlan;
                    return (
                      <div
                        key={plan.name}
                        className={`rounded-xl p-3 border transition-colors ${
                          isCurrentPlan
                            ? "border-[#cca267]/50 bg-[#cca267]/8"
                            : "border-[#2d2520] bg-[#1a1512]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{plan.name}</span>
                            {isCurrentPlan && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#cca267]/20 text-[#cca267] font-semibold">
                                Current
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-semibold text-[#a8a29e]">{plan.price}</span>
                        </div>
                        <div className="space-y-1">
                          {plan.features.slice(0, 3).map((f) => (
                            <div key={f} className="flex items-center gap-1.5 text-[10px] text-[#78716c]">
                              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button className="mt-4 w-full py-2 rounded-xl bg-[#28211b] border border-[#3d332a] text-[10px] font-semibold text-[#a8a29e] hover:text-[#cca267] hover:border-[#cca267]/40 transition-all flex items-center justify-center gap-1.5">
                  <MessageSquare className="h-3 w-3" />
                  Request a quotation
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
