import React from "react";

const metrics = [
  {
    value: "<2 s",
    label: "Dashboard load, 5,000 customers",
  },
  {
    value: "5,000",
    label: "Subscriptions per billing run",
  },
  {
    value: "16",
    label: "Core PostgreSQL tables",
  },
  {
    value: "100%",
    label: "Money changes audited",
  },
];

export function MetricsBar() {
  return (
    <section className="border-y border-slate-800/80 bg-[#070a12]/80 backdrop-blur-sm py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-4 py-4 sm:py-2 ${
                index % 2 === 0 ? "border-r border-slate-800/80 lg:border-r-0" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#7dd3fc] tracking-tight mb-2">
                {item.value}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-[170px] leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
