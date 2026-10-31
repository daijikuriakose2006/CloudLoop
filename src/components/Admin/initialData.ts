import {
  CustomerRecord,
  ProductRecord,
  PlanRecord,
  QuotationRecord,
  SubscriptionRecord,
  InvoiceRecord,
  PaymentRecord,
  TaxRecord,
  UserRecord,
  AuditEntry,
} from "./types";

// All data is now fetched from the database via hooks.
// These empty arrays serve as initial/fallback values.

export const adminCustomers: CustomerRecord[] = [];
export const adminProducts: ProductRecord[] = [];
export const adminPlans: PlanRecord[] = [];
export const adminQuotations: QuotationRecord[] = [];
export const adminSubscriptions: SubscriptionRecord[] = [];
export const adminInvoices: InvoiceRecord[] = [];
export const adminPayments: PaymentRecord[] = [];
export const adminTaxes: TaxRecord[] = [];
export const adminUsers: UserRecord[] = [];
export const adminAuditLog: AuditEntry[] = [];

export const revenueChartData = [
  { month: "May", billed: 0, collected: 0 },
  { month: "Jun", billed: 0, collected: 0 },
  { month: "Jul", billed: 0, collected: 0 },
  { month: "Aug", billed: 0, collected: 0 },
  { month: "Sep", billed: 0, collected: 0 },
  { month: "Oct", billed: 0, collected: 0 },
];

export const planMixData = [
  { name: "Growth", count: 0, color: "#cca267" },
  { name: "Enterprise", count: 0, color: "#38bdf8" },
  { name: "Starter", count: 0, color: "#a78bfa" },
  { name: "Yearly", count: 0, color: "#34d399" },
];

export const adminSettings = {
  workspaceName: "Brightloop",
  supportEmail: "support@brightloop.io",
  companyName: "Brightloop Software Pvt Ltd",
  currency: "INR",
  invoiceDueWindow: "14",
  invoicePrefix: "BL",
  billingRunTime: "02:00",
  autoDunning: true,
  reminderDays: "3, 7, 14",
  footerNote: "Thank you for your business. Payments processed securely. For support, contact support@brightloop.io",
  gstin: "27AABCB1234F1ZS",
  address: "Office 14B, Infinity Tech Park, Malad West, Mumbai — 400 064",
};
