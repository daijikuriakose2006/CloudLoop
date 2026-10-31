"use client";

import React, { useState } from "react";
import { StaffSidebar } from "./StaffSidebar";
import { StaffTopBar } from "./StaffTopBar";
import { StaffTab, CustomerRecord, QuotationRecord, CatalogueRequest, PlanItem, PaymentRecord } from "./types";
import {
  initialTasks,
  initialCustomers,
  initialQuotations,
  initialRequests,
  initialSubscriptions,
  initialInvoices,
  initialPayments,
  catalogueProducts,
  cataloguePlans,
} from "./initialData";
import { DashboardTab } from "./tabs/DashboardTab";
import { CustomersTab } from "./tabs/CustomersTab";
import { QuotationsTab } from "./tabs/QuotationsTab";
import { RequestsTab } from "./tabs/RequestsTab";
import { SubscriptionsTab } from "./tabs/SubscriptionsTab";
import { InvoicesTab } from "./tabs/InvoicesTab";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { CatalogueTab } from "./tabs/CatalogueTab";
import { PlansTab } from "./tabs/PlansTab";
import { NewQuotationModal } from "./NewQuotationModal";
import { AddCustomerModal } from "./AddCustomerModal";
import { RecordPaymentModal } from "./RecordPaymentModal";

export function StaffWorkspace() {
  const [currentTab, setCurrentTab] = useState<StaffTab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Workspace Data State
  const [tasks, setTasks] = useState(initialTasks);
  const [customers, setCustomers] = useState(initialCustomers);
  const [quotations, setQuotations] = useState(initialQuotations);
  const [requests, setRequests] = useState(initialRequests);
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [payments, setPayments] = useState(initialPayments);

  // Modals & Drawers State
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [preSelectedPlan, setPreSelectedPlan] = useState<PlanItem | null>(null);

  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  // Notifications Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSaveQuotation = (newQuote: QuotationRecord) => {
    setQuotations([newQuote, ...quotations]);
    showToast(`Quotation ${newQuote.quoteNumber} created and saved.`);
  };

  const handleConvertQuotation = (id: string) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Accepted" } : q))
    );
    showToast("Quotation marked as accepted on customer's behalf.");
  };

  const handleSaveCustomer = (newCustomer: CustomerRecord) => {
    setCustomers([newCustomer, ...customers]);
    showToast(`Customer ${newCustomer.company} added successfully.`);
  };

  const handleSavePayment = (newPayment: PaymentRecord) => {
    setPayments([newPayment, ...payments]);
    // update invoice status to Paid
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.invoiceNumber === newPayment.invoiceNumber
          ? { ...inv, status: "Paid" }
          : inv
      )
    );
    showToast(`Payment ${newPayment.receiptNumber} recorded and receipt generated.`);
  };

  const handleAssignRequestToMe = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "In review", assignedTo: "staff@brightloop.io" }
          : r
      )
    );
    showToast("Request assigned to you (staff@brightloop.io).");
  };

  const handleSendRequestReply = (id: string, replyText: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "Answered",
              lastReply: replyText,
              repliedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
            }
          : r
      )
    );
    showToast("Reply sent to customer portal and request marked as Answered.");
  };

  const handleTogglePauseSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === "Paused" ? "Active" : "Paused";
          showToast(`Subscription ${s.subscriptionNumber} marked as ${newStatus}.`);
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  const handleSelectPlanForQuotation = (plan: PlanItem) => {
    setPreSelectedPlan(plan);
    setIsQuotationModalOpen(true);
  };

  const openQuotationsCount = quotations.filter((q) => q.status === "Sent").length;
  const newRequestsCount = requests.filter((r) => r.status === "New").length;
  const overdueInvoicesCount = invoices.filter((i) => i.status === "Overdue").length;

  return (
    <div className="min-h-screen !bg-[#faf6f0] !text-[#1c1917] flex flex-col md:flex-row antialiased selection:bg-[#cca267]/30 selection:text-[#1c1917]" style={{backgroundColor: '#faf6f0', color: '#1c1917'}}>
      {/* Sidebar */}
      <StaffSidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setSearchQuery("");
        }}
        openQuotationsCount={openQuotationsCount}
        newRequestsCount={newRequestsCount}
        overdueInvoicesCount={overdueInvoicesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top bar */}
        <StaffTopBar
          currentTab={currentTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNewQuotation={() => {
            setPreSelectedPlan(null);
            setIsQuotationModalOpen(true);
          }}
          onOpenAddCustomer={() => setIsAddCustomerModalOpen(true)}
        />

        {/* Global Toast */}
        {toastMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-[#231e1a] border border-[#cca267] text-white text-xs flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
            <span className="font-medium text-[#cca267]">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#a8a29e] hover:text-white text-xs ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
          {currentTab === "dashboard" && (
            <DashboardTab
              tasks={tasks}
              onToggleTask={handleToggleTask}
              quotations={quotations}
              requests={requests}
              customers={customers}
              onOpenNewQuotation={() => setIsQuotationModalOpen(true)}
              onOpenAddCustomer={() => setIsAddCustomerModalOpen(true)}
              onSelectCustomer={(c) => {
                setSelectedCustomer(c);
                setCurrentTab("customers");
              }}
              onReplyRequest={(r) => {
                setCurrentTab("requests");
              }}
            />
          )}

          {currentTab === "customers" && (
            <CustomersTab
              customers={customers}
              onOpenAddCustomer={() => setIsAddCustomerModalOpen(true)}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
            />
          )}

          {currentTab === "quotations" && (
            <QuotationsTab
              quotations={quotations}
              onOpenNewQuotation={() => {
                setPreSelectedPlan(null);
                setIsQuotationModalOpen(true);
              }}
              onConvertQuotation={handleConvertQuotation}
            />
          )}

          {currentTab === "requests" && (
            <RequestsTab
              requests={requests}
              onAssignToMe={handleAssignRequestToMe}
              onSendReply={handleSendRequestReply}
              onOpenNewQuotation={() => setIsQuotationModalOpen(true)}
              onSwitchTab={setCurrentTab}
              activeStaffEmail="staff@brightloop.io"
            />
          )}

          {currentTab === "subscriptions" && (
            <SubscriptionsTab
              subscriptions={subscriptions}
              onTogglePauseSubscription={handleTogglePauseSubscription}
            />
          )}

          {currentTab === "invoices" && <InvoicesTab invoices={invoices} />}

          {currentTab === "payments" && (
            <PaymentsTab
              payments={payments}
              invoices={invoices}
              onOpenRecordPayment={() => setIsRecordPaymentModalOpen(true)}
            />
          )}

          {currentTab === "catalogue" && (
            <CatalogueTab
              products={catalogueProducts}
              plans={cataloguePlans}
              onSelectPlanForQuotation={handleSelectPlanForQuotation}
            />
          )}

          {currentTab === "plans" && (
            <PlansTab
              plans={cataloguePlans}
              onSelectPlanForQuotation={handleSelectPlanForQuotation}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <NewQuotationModal
        isOpen={isQuotationModalOpen}
        onClose={() => setIsQuotationModalOpen(false)}
        customers={customers}
        plans={cataloguePlans}
        preSelectedPlan={preSelectedPlan}
        onSaveQuotation={handleSaveQuotation}
      />

      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        plans={cataloguePlans}
        onSaveCustomer={handleSaveCustomer}
      />

      <RecordPaymentModal
        isOpen={isRecordPaymentModalOpen}
        onClose={() => setIsRecordPaymentModalOpen(false)}
        invoices={invoices}
        onSavePayment={handleSavePayment}
      />
    </div>
  );
}
