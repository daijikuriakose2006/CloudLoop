"use client";

import React, { useState, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { AdminTab, CustomerRecord, PlanRecord, UserRecord } from "./types";
import {
  useCustomers,
  useProducts,
  usePlans,
  useQuotations,
  useSubscriptions,
  useInvoices,
  usePayments,
  useTaxes,
  useAuditLogs,
  useSettings,
  useProfiles,
} from "@/hooks/useData";

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
import { AddCustomerModal } from "./modals/AddCustomerModal";
import { NewSubscriptionModal } from "./modals/NewSubscriptionModal";

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

  // Modal state
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showNewSubscription, setShowNewSubscription] = useState(false);

  // Data hooks — fetch from Supabase
  const { customers, loading: customersLoading, addCustomer } = useCustomers();
  const { products } = useProducts();
  const { plans } = usePlans();
  const { quotations } = useQuotations();
  const { subscriptions, addSubscription } = useSubscriptions();
  const { invoices } = useInvoices();
  const { payments } = usePayments();
  const { taxes } = useTaxes();
  const { auditLogs } = useAuditLogs();
  const { profiles } = useProfiles();

  // Map DB data → component format for backward compatibility
  const mappedCustomers: CustomerRecord[] = customers.map((c) => ({
    id: c.id,
    company: c.name,
    contactName: c.contactName || c.name,
    email: c.email,
    city: c.city || "",
    plan: "",
    mrr: "",
    status: (c.status || "Active") as CustomerRecord["status"],
    joinedAt: c.createdAt?.split("T")[0] || "",
  }));

  const mappedInvoices = invoices.map((inv) => ({
    id: inv.id,
    invoiceNumber: inv.number,
    customer: (inv.customer as { name: string } | undefined)?.name || "",
    plan: "",
    amount: `₹${Number(inv.subtotal || 0).toLocaleString("en-IN")}`,
    tax: `₹${Number(inv.taxAmount || 0).toLocaleString("en-IN")}`,
    total: `₹${Number(inv.total || 0).toLocaleString("en-IN")}`,
    issuedAt: inv.createdAt?.split("T")[0] || "",
    dueDate: inv.dueDate?.split("T")[0] || "",
    status: inv.status === "PAID" ? "Paid" as const : inv.status === "OVERDUE" ? "Overdue" as const : "Outstanding" as const,
  }));

  const mappedSubscriptions = subscriptions.map((s) => ({
    id: s.id,
    subscriptionNumber: s.number,
    customer: (s.customer as { name: string } | undefined)?.name || "",
    plan: (s.plan as { name: string } | undefined)?.name || "",
    mrr: `₹${Number((s.plan as { price: number } | undefined)?.price || 0).toLocaleString("en-IN")}`,
    startDate: s.startDate?.split("T")[0] || "",
    nextBilling: s.nextBillingDate?.split("T")[0] || "",
    autoRenew: s.autoRenew,
    status: s.status === "ACTIVE" ? "Active" as const : s.status === "PAUSED" ? "Paused" as const : "Cancelling" as const,
  }));

  const mappedQuotations = quotations.map((q) => ({
    id: q.id,
    quoteNumber: q.number,
    customer: (q.customer as { name: string } | undefined)?.name || "",
    owner: (q.owner as { email: string } | undefined)?.email || "",
    plan: "",
    total: `₹${Number(q.total || 0).toLocaleString("en-IN")}`,
    validUntil: q.validUntil?.split("T")[0] || "",
    status: q.status === "DRAFT" ? "Draft" as const : q.status === "QUOTATION" ? "Sent" as const : "Accepted" as const,
    createdAt: q.createdAt?.split("T")[0] || "",
  }));

  const mappedPayments = payments.map((p) => ({
    id: p.id,
    receiptNumber: `RCP-${p.id.slice(-8)}`,
    customer: "",
    invoiceNumber: (p.invoice as { number: string } | undefined)?.number || "",
    amount: `₹${Number(p.amount || 0).toLocaleString("en-IN")}`,
    method: p.method === "RAZORPAY" ? "Card" as const : p.method === "BANK_TRANSFER" ? "Bank Transfer" as const : p.method === "MANUAL" ? "Manual" as const : "UPI" as const,
    reference: p.gatewayPaymentId || p.id,
    paidAt: p.paidAt?.split("T")[0] || "",
    status: "Settled" as const,
  }));

  const mappedTaxes = taxes.map((t) => ({
    id: t.id,
    name: t.name,
    scope: t.scope || "Domestic",
    rate: `${t.rate}%`,
    status: t.active ? "Active" as const : "Draft" as const,
  }));

  const mappedUsers: UserRecord[] = profiles.map((p) => ({
    id: p.id,
    name: p.fullName || p.email,
    email: p.email,
    role: (p.role === "ADMIN" ? "Admin" : p.role === "FINANCE" ? "Finance" : p.role === "STAFF" ? "Staff" : "Customer") as UserRecord["role"],
    status: (p.status || "Active") as UserRecord["status"],
    lastLogin: "—",
  }));

  const mappedAuditLog = auditLogs.map((a) => ({
    id: a.id,
    actor: (a.actor as { email: string } | undefined)?.email || "system",
    action: a.action,
    entity: a.entityType,
    entityId: a.entityId,
    timestamp: a.createdAt?.replace("T", " ").slice(0, 16) || "",
    type: (a.actor as { email: string } | undefined)?.email ? "human" as const : "automated" as const,
  }));

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Badge counts
  const overdueCount = mappedInvoices.filter((i) => i.status === "Overdue").length;
  const pendingQuotationsCount = mappedQuotations.filter((q) => q.status === "Sent").length;

  const handleTabChange = (tab: AdminTab) => {
    setCurrentTab(tab);
    setSearchQuery("");
  };

  const handlePrimaryAction = () => {
    switch (currentTab) {
      case "customers":
        setShowAddCustomer(true);
        return;
      case "dashboard":
      case "subscriptions":
        setShowNewSubscription(true);
        return;
      case "invoices":
        showToast("Billing run triggered! Processing...");
        return;
      default:
        showToast("This action is coming soon.");
    }
  };

  const handleAddCustomer = async (data: {
    name: string;
    email: string;
    password: string;
    contactName?: string;
    phone?: string;
    city?: string;
    gstin?: string;
  }) => {
    // 1. Create Supabase Auth user via API
    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          fullName: data.contactName || data.name,
          role: "CUSTOMER",
          company: data.name,
          city: data.city,
        }),
      });
    } catch (err) {
      console.warn("Auth signup note:", err);
    }

    // 2. Create customer record in DB
    const created = await addCustomer({
      name: data.name,
      email: data.email,
      contactName: data.contactName,
      phone: data.phone,
      city: data.city,
      gstin: data.gstin,
      status: "Active",
    });
    if (created) {
      showToast(`Customer "${data.name}" created with login credentials.`);
      setShowAddCustomer(false);
    } else {
      showToast("Failed to create customer. Please try again.");
    }
  };

  const handleAddSubscription = async (data: {
    customerId: string;
    planId: string;
    startDate: string;
    trialDays: number;
  }) => {
    const created = await addSubscription({
      customerId: data.customerId,
      planId: data.planId,
      startDate: data.startDate,
      trialDays: data.trialDays,
      autoRenew: true,
    });
    if (created) {
      showToast(`Subscription ${created.number} created successfully.`);
      setShowNewSubscription(false);
    } else {
      showToast("Failed to create subscription. Please try again.");
    }
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
            <button onClick={() => setToast(null)} className="text-[#a8a29e] hover:text-white text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {customersLoading && currentTab === "customers" && (
          <div className="mx-6 mt-4 text-xs text-[#a8a29e] animate-pulse">Loading data from database...</div>
        )}

        {/* Tab content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {currentTab === "dashboard" && (
            <DashboardTab invoices={mappedInvoices} subscriptions={mappedSubscriptions} quotations={mappedQuotations} onNavigate={handleTabChange} />
          )}
          {currentTab === "customers" && (
            <CustomersTab customers={mappedCustomers} onAddCustomer={() => setShowAddCustomer(true)} />
          )}
          {currentTab === "catalogue" && (
            <CatalogueTab products={products.map((p) => ({ id: p.id, name: p.name, sku: p.sku || "", category: p.category || "", status: p.active ? "Active" : "Inactive", plans: 0, variants: 0, description: p.description || "" }))} onAddProduct={handlePrimaryAction} />
          )}
          {currentTab === "plans" && (
            <PlansTab plans={plans.map((p) => ({ id: p.id, name: p.name, code: p.code || "", price: `₹${Number(p.price).toLocaleString("en-IN")}`, interval: (p.billingPeriod === "YEARLY" ? "Yearly" : p.billingPeriod === "QUARTERLY" ? "Quarterly" : "Monthly") as PlanRecord["interval"], trialDays: p.trialDays, subscribers: 0, status: (p.status || "Live") as PlanRecord["status"], mrr: "" }))} onAddPlan={handlePrimaryAction} />
          )}
          {currentTab === "quotations" && (
            <QuotationsTab quotations={mappedQuotations} onAddQuotation={handlePrimaryAction} />
          )}
          {currentTab === "subscriptions" && (
            <SubscriptionsTab subscriptions={mappedSubscriptions} onAddSubscription={() => setShowNewSubscription(true)} />
          )}
          {currentTab === "invoices" && <InvoicesTab invoices={mappedInvoices} />}
          {currentTab === "payments" && (
            <PaymentsTab payments={mappedPayments} onRecordPayment={handlePrimaryAction} />
          )}
          {currentTab === "taxes" && (
            <TaxesTab taxes={mappedTaxes} onAddTax={handlePrimaryAction} />
          )}
          {currentTab === "reports" && <ReportsTab />}
          {currentTab === "users" && <UsersTab users={mappedUsers} />}
          {currentTab === "audit" && <AuditTab auditLog={mappedAuditLog} />}
          {currentTab === "settings" && <SettingsTab />}
        </main>
      </div>

      {/* Modals */}
      {showAddCustomer && (
        <AddCustomerModal
          onClose={() => setShowAddCustomer(false)}
          onSubmit={handleAddCustomer}
        />
      )}
      {showNewSubscription && (
        <NewSubscriptionModal
          onClose={() => setShowNewSubscription(false)}
          onSubmit={handleAddSubscription}
        />
      )}
    </div>
  );
}
