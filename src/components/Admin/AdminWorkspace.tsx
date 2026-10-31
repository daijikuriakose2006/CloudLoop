"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { AdminTab, CustomerRecord, ProductRecord, PlanRecord } from "./types";
import {
  adminCustomers,
  adminProducts,
  adminPlans,
  adminQuotations,
  adminSubscriptions,
  adminInvoices,
  adminPayments,
  adminTaxes,
  adminUsers,
  adminAuditLog,
} from "./initialData";

import { DashboardTab } from "./tabs/DashboardTab";
import { CustomersTab } from "./tabs/CustomersTab";
import { CatalogueTab } from "./tabs/CatalogueTab";
import { PlansTab } from "./tabs/PlansTab";
import { QuotationsTab } from "./tabs/QuotationsTab";
import { SubscriptionsTab } from "./tabs/SubscriptionsTab";
import { InvoicesTab } from "./tabs/InvoicesTab";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { TaxesTab } from "./tabs/TaxesTab";
import { ReportsTab } from "./tabs/ReportsTab";
import { UsersTab } from "./tabs/UsersTab";
import { AuditTab } from "./tabs/AuditTab";
import { SettingsTab } from "./tabs/SettingsTab";

// Top bar action config per tab
const tabActions: Record<
  AdminTab,
  { primaryLabel?: string; secondaryLabel?: string }
> = {
  dashboard: { primaryLabel: "New subscription" },
  customers: { primaryLabel: "Add customer", secondaryLabel: "Export CSV" },
  catalogue: { primaryLabel: "New product" },
  plans: { primaryLabel: "New plan" },
  quotations: { primaryLabel: "New quotation", secondaryLabel: "Export CSV" },
  subscriptions: { primaryLabel: "New subscription", secondaryLabel: "Export CSV" },
  invoices: { primaryLabel: "Run billing", secondaryLabel: "Export CSV" },
  payments: { primaryLabel: "Record payment", secondaryLabel: "Export CSV" },
  taxes: { primaryLabel: "New tax rate" },
  reports: { secondaryLabel: "Schedule email" },
  users: { primaryLabel: "Invite user" },
  audit: {},
  settings: {},
};

export function AdminWorkspace() {
  const [currentTab, setCurrentTab] = useState<AdminTab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Data state
  const [customers, setCustomers] = useState(adminCustomers);
  const [products] = useState(adminProducts);
  const [plans] = useState(adminPlans);
  const [quotations] = useState(adminQuotations);
  const [subscriptions] = useState(adminSubscriptions);
  const [invoices] = useState(adminInvoices);
  const [payments] = useState(adminPayments);
  const [taxes] = useState(adminTaxes);
  const [users] = useState(adminUsers);
  const [auditLog] = useState(adminAuditLog);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Badge counts
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length;
  const pendingQuotationsCount = quotations.filter((q) => q.status === "Sent").length;

  const handleTabChange = (tab: AdminTab) => {
    setCurrentTab(tab);
    setSearchQuery("");
  };

  const handlePrimaryAction = () => {
    const labels: Partial<Record<AdminTab, string>> = {
      customers: "Add customer modal coming soon.",
      plans: "New plan builder coming soon.",
      quotations: "New quotation form coming soon.",
      subscriptions: "New subscription dialog coming soon.",
      invoices: "Billing run triggered!",
      payments: "Record payment form coming soon.",
      taxes: "New tax rate form coming soon.",
      users: "Invite user flow coming soon.",
      dashboard: "New subscription dialog coming soon.",
      catalogue: "New product builder coming soon.",
    };
    showToast(labels[currentTab] || "Action triggered.");
  };

  const actions = tabActions[currentTab];

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row antialiased"
      style={{ backgroundColor: "#faf6f0", color: "#1c1917" }}
    >
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        overdueCount={overdueCount}
        pendingQuotationsCount={pendingQuotationsCount}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#faf6f0]">
        <AdminTopBar
          currentTab={currentTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPrimaryAction={handlePrimaryAction}
          primaryLabel={actions.primaryLabel}
          secondaryLabel={actions.secondaryLabel}
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
              invoices={invoices}
              subscriptions={subscriptions}
              quotations={quotations}
              onNavigate={handleTabChange}
            />
          )}

          {currentTab === "customers" && (
            <CustomersTab
              customers={customers}
              onAddCustomer={handlePrimaryAction}
            />
          )}

          {currentTab === "catalogue" && (
            <CatalogueTab
              products={products}
              onAddProduct={handlePrimaryAction}
            />
          )}

          {currentTab === "plans" && (
            <PlansTab plans={plans} onAddPlan={handlePrimaryAction} />
          )}

          {currentTab === "quotations" && (
            <QuotationsTab
              quotations={quotations}
              onAddQuotation={handlePrimaryAction}
            />
          )}

          {currentTab === "subscriptions" && (
            <SubscriptionsTab
              subscriptions={subscriptions}
              onAddSubscription={handlePrimaryAction}
            />
          )}

          {currentTab === "invoices" && (
            <InvoicesTab invoices={invoices} />
          )}

          {currentTab === "payments" && (
            <PaymentsTab
              payments={payments}
              onRecordPayment={handlePrimaryAction}
            />
          )}

          {currentTab === "taxes" && (
            <TaxesTab taxes={taxes} onAddTax={handlePrimaryAction} />
          )}

          {currentTab === "reports" && <ReportsTab />}

          {currentTab === "users" && <UsersTab users={users} />}

          {currentTab === "audit" && <AuditTab auditLog={auditLog} />}

          {currentTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
