import React from "react";
import { RefreshCw, Lock, Zap, Banknote, FileText, Calendar } from "lucide-react";

export function FeaturesGrid() {
  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="w-8 h-1 bg-cyan-400 rounded-full mb-6" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Built to automate every billing step
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            From quotation to renewal, Brightloop handles the lifecycle, the speed and
            the security.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - Highlight Solid Cyan Card */}
          <div className="rounded-2xl bg-[#7dd3fc] p-8 text-[#090d16] shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
            <div>
              <div className="h-12 w-12 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center text-[#090d16] mb-6 shadow-sm">
                <RefreshCw className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                Automate the full billing lifecycle
              </h3>
              <p className="text-sm sm:text-base text-slate-900/90 leading-relaxed font-medium">
                Quotation, subscription, recurring invoice, payment, renewal and overdue
                flag, all without manual work.
              </p>
            </div>
          </div>

          {/* Card 2 - Role-based access */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#0e1322] p-8 text-white shadow-lg hover:border-slate-700 transition-all">
            <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-400 mb-6">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-3">
              Role-based access, enforced twice
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Admin, Staff and Customer roles are checked in the API and locked down
              with PostgreSQL row-level security.
            </p>
          </div>

          {/* Card 3 - Fast dashboards on Redis */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#0e1322] p-8 text-white shadow-lg hover:border-slate-700 transition-all">
            <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-500 mb-6">
              <Zap className="h-5 w-5 fill-amber-500" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-3">
              Fast dashboards on Redis
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Totals come from a 60-second Redis cache and indexed queries, rebuilt
              from SQL on a miss.
            </p>
          </div>

          {/* Card 4 - Free-tier infrastructure */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#0e1322] p-8 text-white shadow-lg hover:border-slate-700 transition-all">
            <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-emerald-400 mb-6">
              <Banknote className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-3">
              Free-tier infrastructure
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Next.js on Vercel Hobby with Supabase and Upstash Redis: the whole
              stack runs at zero cost.
            </p>
          </div>

          {/* Card 5 - Audit trail on money changes */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#0e1322] p-8 text-white shadow-lg hover:border-slate-700 transition-all">
            <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 mb-6">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-3">
              Audit trail on money changes
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every create, update and delete on money-related tables logs who,
              what, when and old versus new values.
            </p>
          </div>

          {/* Card 6 - Nightly invoice run */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#0e1322] p-8 text-white shadow-lg hover:border-slate-700 transition-all">
            <div className="h-12 w-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-indigo-400 mb-6">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-3">
              Nightly invoice run
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Vercel Cron processes due invoices in batches of 500, with a unique
              index that blocks duplicates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
