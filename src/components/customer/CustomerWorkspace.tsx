"use client";

import React, { useState } from "react";
import { CustomerSidebar } from "./CustomerSidebar";
import { CustomerTopBar } from "./CustomerTopBar";
import { CustomerTab } from "./types";
import {
  mySubscription,
  myInvoices,
  myPayments,
  myQuotations,
  catalogueProducts,
  supportTickets,
  customerProfile,
} from "./initialData";

import { DashboardTab } from "./tabs/DashboardTab";
import { SubscriptionTab } from "./tabs/SubscriptionTab";
import { CatalogueTab } from "./tabs/CatalogueTab";
import { QuotationsTab } from "./tabs/QuotationsTab";
import { InvoicesTab } from "./tabs/InvoicesTab";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { SupportTab } from "./tabs/SupportTab";

const tabPrimaryActions: Partial<Record<CustomerTab, string>> = {
  support: "New request",
  catalogue: "Request quotation",
  subscription: "Upgrade plan",
};

export function CustomerWorkspace() {
  const [currentTab, setCurrentTab] = useState<CustomerTab>("dashboard");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const openTicketsCount = supportTickets.filter(
    (t) => t.status === "Open" || t.status === "In review"
  ).length;

  const pendingInvoicesCount = myInvoices.filter(
    (i) => i.status === "Outstanding" || i.status === "Overdue"
  ).length;

  const handleTabChange = (tab: CustomerTab) => {
    setCurrentTab(tab);
  };

  const handlePrimaryAction = () => {
    const messages: Partial<Record<CustomerTab, string>> = {
      support: "Opening new support request...",
      catalogue: "Request a quotation from the product card.",
      subscription: "Upgrade request sent to Brightloop team.",
    };
    showToast(messages[currentTab] || "Action triggered.");
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row antialiased"
      style={{ backgroundColor: "#faf6f0", color: "#1c1917" }}
    >
      {/* Sidebar */}
      <CustomerSidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        openTicketsCount={openTicketsCount}
        pendingInvoicesCount={pendingInvoicesCount}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf6f0]">
        <CustomerTopBar
          currentTab={currentTab}
          onPrimaryAction={handlePrimaryAction}
          primaryLabel={tabPrimaryActions[currentTab]}
        />

        {/* Toast */}
        {toast && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-[#231e1a] border border-[#cca267] text-white text-xs flex items-center justify-between shadow-lg">
            <span className="font-medium text-[#cca267]">{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="text-[#a8a29e] hover:text-white text-xs ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {currentTab === "dashboard" && (
            <DashboardTab
              subscription={mySubscription}
              invoices={myInvoices}
              payments={myPayments}
              onNavigate={(tab) => setCurrentTab(tab as CustomerTab)}
            />
          )}

          {currentTab === "subscription" && (
            <SubscriptionTab subscription={mySubscription} />
          )}

          {currentTab === "catalogue" && (
            <CatalogueTab
              products={catalogueProducts}
              currentPlan={mySubscription.plan}
            />
          )}

          {currentTab === "quotations" && (
            <QuotationsTab quotations={myQuotations} />
          )}

          {currentTab === "invoices" && (
            <InvoicesTab invoices={myInvoices} />
          )}

          {currentTab === "payments" && (
            <PaymentsTab payments={myPayments} />
          )}

          {currentTab === "profile" && (
            <ProfileTab
              profile={customerProfile}
              subscription={mySubscription}
            />
          )}

          {currentTab === "support" && (
            <SupportTab tickets={supportTickets} />
          )}
        </main>
      </div>
    </div>
  );
}
