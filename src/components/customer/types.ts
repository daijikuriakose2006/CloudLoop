export type CustomerTab =
  | "dashboard"
  | "subscription"
  | "catalogue"
  | "quotations"
  | "invoices"
  | "payments"
  | "profile"
  | "support";

export interface MySubscription {
  id: string;
  subscriptionNumber: string;
  plan: string;
  price: string;
  seats: number;
  usedSeats: number;
  startDate: string;
  nextBilling: string;
  autoRenew: boolean;
  status: "Active" | "Paused" | "Cancelled";
  features: string[];
}

export interface MyInvoice {
  id: string;
  invoiceNumber: string;
  period: string;
  amount: string;
  tax: string;
  total: string;
  issuedAt: string;
  dueDate: string;
  status: "Paid" | "Outstanding" | "Overdue";
}

export interface MyPayment {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  amount: string;
  method: "Card" | "UPI" | "Bank Transfer";
  reference: string;
  paidAt: string;
  status: "Settled" | "Pending";
}

export interface MyQuotation {
  id: string;
  quoteNumber: string;
  plan: string;
  total: string;
  validUntil: string;
  status: "Sent" | "Accepted" | "Rejected" | "Expired" | "Draft";
  createdAt: string;
}

export interface CatalogueProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  plans: CataloguePlan[];
  accent: string;
}

export interface CataloguePlan {
  name: string;
  price: string;
  interval: string;
  features: string[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  message: string;
  status: "Open" | "In review" | "Answered" | "Closed";
  createdAt: string;
  lastReply?: string;
  repliedAt?: string;
}

export interface CustomerProfile {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  city: string;
  gstin: string;
  billingAddress: string;
}
