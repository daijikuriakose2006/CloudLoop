import React from "react";

const targets = [
  {
    badge: "PERFORMANCE",
    stat: "<2 s",
    statLabel: "dashboard load",
    title: "Dashboards under two seconds",
    description:
      "Seeded with 5,000 customers and 40,000 invoices, every dashboard screen loads in under 2 s thanks to Redis caching and indexed queries.",
  },
  {
    badge: "BILLING RELIABILITY",
    stat: "<5 min",
    statLabel: "per billing run",
    title: "A clean run for 5,000 subscriptions",
    description:
      "The nightly job processes 5,000 subscriptions in under 5 minutes with zero duplicate invoices, protected by the unique period index.",
  },
  {
    badge: "ACCESS CONTROL",
    stat: "0",
    statLabel: "cross-account reads",
    title: "Customers cannot see each other's data",
    description:
      "Role checks in the API plus PostgreSQL row-level security mean a customer can never read another customer's records, verified by tests.",
  },
];

export function ProposedTargets() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Proposed targets,
            <br />
            measured not guessed
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            The success criteria Brightloop is built and tested against.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {targets.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800/90 bg-[#0e1322] p-7 text-white shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="inline-block rounded-md bg-slate-800/90 border border-slate-700/60 px-2.5 py-1 text-[11px] font-mono tracking-wider font-semibold text-slate-300 mb-6">
                  {item.badge}
                </div>

                <div className="mb-6">
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#7dd3fc] tracking-tight leading-none mb-1.5">
                    {item.stat}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {item.statLabel}
                  </div>
                </div>

                <h3 className="text-lg font-bold tracking-tight mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
