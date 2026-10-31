export type AdminTab =
  | "dashboard"
  | "customers"
  | "catalogue"
  | "plans"
  | "quotations"
  | "subscriptions"
  | "invoices"
  | "payments"
  | "taxes"
  | "reports"
  | "users"
  | "audit"
  | "settings";

export interface KpiTile {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  accent: string;
}

export interface CustomerRecord {
  id: string;
  company: string;
  contactName: string;
  email: string;
  city: string;
  plan: string;
  mrr: string;
  status: "Active" | "Trial" | "Overdue" | "Paused" | "Cancelled";
  joinedAt: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  sku: string;
  category: string;
  status: "Active" | "Inactive";
  plans: number;
  variants: number;
  description: string;
}

export interface PlanRecord {
  id: string;
  name: string;
  code: string;
  price: string;
  interval: "Monthly" | "Quarterly" | "Yearly";
  trialDays: number;
  subscribers: number;
  status: "Live" | "Retired" | "Draft";
  mrr: string;
}

export interface QuotationRecord {
  id: string;
  quoteNumber: string;
  customer: string;
  owner: string;
  plan: string;
  total: string;
  validUntil: string;
  status: "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
  createdAt: string;
}

export interface SubscriptionRecord {
  id: string;
  subscriptionNumber: string;
  customer: string;
  plan: string;
  mrr: string;
  startDate: string;
  nextBilling: string;
  autoRenew: boolean;
  status: "Active" | "Paused" | "Cancelling" | "Cancelled";
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  customer: string;
  plan: string;
  amount: string;
  tax: string;
  total: string;
  issuedAt: string;
  dueDate: string;
  status: "Paid" | "Outstanding" | "Overdue" | "Draft";
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  customer: string;
  invoiceNumber: string;
  amount: string;
  method: "Card" | "UPI" | "Bank Transfer" | "Manual";
  reference: string;
  paidAt: string;
  status: "Settled" | "Pending" | "Failed" | "Refunded";
}

export interface TaxRecord {
  id: string;
  name: string;
  scope: string;
  rate: string;
  status: "Active" | "Draft";
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Finance" | "Staff" | "Customer";
  status: "Active" | "Pending" | "Suspended";
  lastLogin: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  type: "human" | "automated" | "flagged";
}
