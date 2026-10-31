export type StaffTab =
  | "dashboard"
  | "customers"
  | "quotations"
  | "requests"
  | "subscriptions"
  | "invoices"
  | "payments"
  | "catalogue"
  | "plans";

export interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  dueDate: string;
  completed: boolean;
  tag: string;
}

export interface CustomerRecord {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  gstNumber: string;
  hasGst: boolean;
  plan: string;
  mrr: number;
  status: "Active" | "Trial" | "Suspended" | "Pending GST";
  address: string;
  createdAt: string;
}

export interface QuotationRecord {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  contactName: string;
  planId: string;
  planName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  taxRate: number; // percentage, e.g. 18
  taxAmount: number;
  total: number;
  validUntil: string;
  status: "Sent" | "Accepted" | "Rejected" | "Draft";
  notes?: string;
  createdAt: string;
}

export interface CatalogueRequest {
  id: string;
  requestId: string;
  customerName: string;
  email: string;
  planName: string;
  unitsRequested: number;
  budgetBand: string;
  receivedDate: string;
  requirementText: string;
  status: "New" | "In review" | "Answered";
  assignedTo?: string;
  lastReply?: string;
  repliedAt?: string;
}

export interface SubscriptionRecord {
  id: string;
  subscriptionNumber: string;
  customerName: string;
  planName: string;
  interval: "Monthly" | "Quarterly" | "Annual";
  nextBillingDate: string;
  amount: number;
  status: "Active" | "Due today" | "Paused" | "Cancelled";
  startDate: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  gstAmount: number;
  total: number;
  status: "Paid" | "Open" | "Due this week" | "Overdue";
  items: Array<{ description: string; qty: number; rate: number; amount: number }>;
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  customerName: string;
  method: "Bank Transfer" | "Cheque" | "UPI" | "Manual";
  amount: number;
  paidAt: string;
  status: "Confirmed" | "Awaiting confirmation" | "Failed";
  referenceNumber: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: "Core API" | "Infrastructure" | "Analytics" | "Add-ons";
  description: string;
  variantCount: number;
  startingPrice: number;
  active: boolean;
  features: string[];
}

export interface PlanItem {
  id: string;
  name: string;
  productId: string;
  pricePerCycle: number;
  interval: "Monthly" | "Annual";
  trialDays: number;
  subscriberCount: number;
  features: string[];
  active: boolean;
}
