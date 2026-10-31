import React from "react";

const steps = [
  {
    step: "01",
    title: "Import customers and plans",
    description:
      "Bring in products, variants, plans and customers, or seed 5,000 customers to test at scale.",
  },
  {
    step: "02",
    title: "Set roles and rules",
    description:
      "Admin and Staff roles, taxes, discounts and quotation rules are enforced in the API and PostgreSQL.",
  },
  {
    step: "03",
    title: "Quote, subscribe, invoice",
    description:
      "Run from quotation to recurring invoice, payment and renewal with automatic overdue flags.",
  },
  {
    step: "04",
    title: "Watch revenue live",
    description:
      "Dashboards backed by Redis caching rebuild in under two seconds and log every money-related change.",
  },
];

export function StepsSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How Brightloop Gets
            <br />
            You Billing in Four Steps
          </h2>
        </div>

        {/* 4 Steps with horizontal connector line */}
        <div className="relative">
          {/* Subtle horizontal connecting line */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-[1px] bg-slate-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-6 lg:pt-10">
            {steps.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-4xl sm:text-5xl font-extrabold text-[#7dd3fc] tracking-tight mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
