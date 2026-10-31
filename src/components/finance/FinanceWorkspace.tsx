"use client";

import React, { useState } from "react";
import { FinanceSidebar } from "./FinanceSidebar";
import { FinanceTopBar } from "./FinanceTopBar";
import { FinanceTab } from "./types";
import { financeInvoices } from "./initialData";

import { DashboardTab } from "./tabs/DashboardTab";
import { RevenueTab } from "./tabs/RevenueTab";
import { InvoiceRegisterTab } from "./tabs/InvoiceRegisterTab";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { TaxesTab } from "./tabs/TaxesTab";
import { DiscountsTab } from "./tabs/DiscountsTab";
import { FinanceReportsTab } from "./tabs/FinanceReportsTab";
import { RefundsTab } from "./tabs/RefundsTab";

export function FinanceWorkspace() {
  const [currentTab, setCurrentTab] = useState<FinanceTab>("dashboard");
  const [toast, setToast] = useState<string | null>(null);

  const overdueCount = financeInvoices.filter((i) => i.status === "Overdue").length;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleExport = () => showToast("CSV export prepared — check your downloads.");
  const handleSchedule = () => showToast("Email schedule configured for monthly delivery.");

  const handleTabChange = (tab: FinanceTab) => {
    setCurrentTab(tab);
  };

  const showScheduleBtn: FinanceTab[] = ["reports"];

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row antialiased"
      style={{ backgroundColor: "#faf6f0", color: "#1c1917" }}
    >
      <FinanceSidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        overdueCount={overdueCount}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf6f0]">
        <FinanceTopBar
          currentTab={currentTab}
          onExport={handleExport}
          onSchedule={showScheduleBtn.includes(currentTab) ? handleSchedule : undefined}
        />

        {/* Toast */}
        {toast && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-[#231e1a] border border-[#cca267] text-white text-xs flex items-center justify-between shadow-lg">
            <span className="font-medium text-[#cca267]">{toast}</span>
            <button onClick={() => setToast(null)} className="text-[#a8a29e] hover:text-white text-xs ml-4">Dismiss</button>
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {currentTab === "dashboard" && <DashboardTab onNavigate={handleTabChange} />}
          {currentTab === "revenue" && <RevenueTab />}
          {currentTab === "invoices" && <InvoiceRegisterTab />}
          {currentTab === "payments" && <PaymentsTab />}
          {currentTab === "taxes" && <TaxesTab />}
          {currentTab === "discounts" && <DiscountsTab />}
          {currentTab === "reports" && <FinanceReportsTab />}
          {currentTab === "refunds" && <RefundsTab />}
        </main>
      </div>
    </div>
  );
}
