export type FinanceTab =
  | "dashboard"
  | "revenue"
  | "invoices"
  | "payments"
  | "taxes"
  | "discounts"
  | "reports"
  | "refunds";

export interface FinanceInvoice {
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

export interface FinancePayment {
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

export interface FinanceTax {
  id: string;
  name: string;
  scope: string;
  rate: string;
  taxableValue: string;
  collected: string;
  invoiceCount: number;
  status: "Active" | "Draft";
}

export interface FinanceDiscount {
  id: string;
  code: string;
  description: string;
  type: "Percentage" | "Fixed";
  value: string;
  usageCount: number;
  totalSaved: string;
  validUntil: string;
  status: "Active" | "Expired";
}

export interface FinanceRefund {
  id: string;
  refundNumber: string;
  customer: string;
  invoiceNumber: string;
  amount: string;
  reason: string;
  issuedAt: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface RevenueRecord {
  period: string;
  billed: string;
  collected: string;
  outstanding: string;
  collectionRate: string;
}
