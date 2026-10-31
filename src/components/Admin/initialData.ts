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

export const adminCustomers: CustomerRecord[] = [
  { id: "c1", company: "Northwind Traders", contactName: "Aarav Mehta", email: "aarav@northwind.in", city: "Mumbai", plan: "Enterprise", mrr: "₹18,500", status: "Active", joinedAt: "2025-03-12" },
  { id: "c2", company: "Sunrise Textiles", contactName: "Priya Nair", email: "priya@sunrise.co.in", city: "Coimbatore", plan: "Growth", mrr: "₹8,200", status: "Active", joinedAt: "2025-06-01" },
  { id: "c3", company: "BlueSky Logistics", contactName: "Rohan Sharma", email: "rohan@bluesky.in", city: "Delhi", plan: "Starter", mrr: "₹3,500", status: "Trial", joinedAt: "2026-09-15" },
  { id: "c4", company: "Coastal Exports", contactName: "Meera Pillai", email: "meera@coastal.in", city: "Kochi", plan: "Growth", mrr: "₹8,200", status: "Overdue", joinedAt: "2024-11-20" },
  { id: "c5", company: "TechSpark Solutions", contactName: "Vijay Kumar", email: "vijay@techspark.io", city: "Bangalore", plan: "Enterprise", mrr: "₹18,500", status: "Active", joinedAt: "2025-01-08" },
  { id: "c6", company: "Greenfield Agro", contactName: "Divya Singh", email: "divya@greenfield.in", city: "Pune", plan: "Starter", mrr: "₹3,500", status: "Paused", joinedAt: "2025-07-30" },
  { id: "c7", company: "Precision Parts Ltd", contactName: "Karan Joshi", email: "karan@precisionparts.in", city: "Ahmedabad", plan: "Growth", mrr: "₹8,200", status: "Active", joinedAt: "2025-04-15" },
  { id: "c8", company: "Digital Frontier", contactName: "Ananya Rao", email: "ananya@digitalfrontier.io", city: "Hyderabad", plan: "Enterprise", mrr: "₹18,500", status: "Active", joinedAt: "2024-12-01" },
];

export const adminProducts: ProductRecord[] = [
  { id: "p1", name: "Billing Engine Core", sku: "BEC-001", category: "Platform", status: "Active", plans: 3, variants: 2, description: "Core recurring billing infrastructure" },
  { id: "p2", name: "Analytics Suite", sku: "ANS-001", category: "Analytics", status: "Active", plans: 2, variants: 3, description: "Revenue and subscription analytics" },
  { id: "p3", name: "Customer Portal", sku: "CPS-001", category: "Portal", status: "Active", plans: 3, variants: 1, description: "Self-serve customer billing portal" },
  { id: "p4", name: "API Access Pack", sku: "API-001", category: "Integration", status: "Active", plans: 2, variants: 2, description: "REST API with webhook support" },
  { id: "p5", name: "GST Compliance Module", sku: "GST-001", category: "Compliance", status: "Active", plans: 1, variants: 1, description: "Automated GST calculation and filing" },
  { id: "p6", name: "Legacy Connector", sku: "LGC-001", category: "Integration", status: "Inactive", plans: 0, variants: 1, description: "Deprecated ERP integration layer" },
  { id: "p7", name: "Advanced Reports", sku: "RPT-001", category: "Analytics", status: "Active", plans: 2, variants: 2, description: "Custom report builder and scheduler" },
];

export const adminPlans: PlanRecord[] = [
  { id: "pl1", name: "Starter", code: "STR-M", price: "₹3,500", interval: "Monthly", trialDays: 14, subscribers: 148, status: "Live", mrr: "₹5,18,000" },
  { id: "pl2", name: "Growth", code: "GRW-M", price: "₹8,200", interval: "Monthly", trialDays: 14, subscribers: 3242, status: "Live", mrr: "₹2,65,84,400" },
  { id: "pl3", name: "Enterprise", code: "ENT-M", price: "₹18,500", interval: "Monthly", trialDays: 30, subscribers: 789, status: "Live", mrr: "₹1,46,06,500" },
  { id: "pl4", name: "Starter Yearly", code: "STR-Y", price: "₹35,000", interval: "Yearly", trialDays: 14, subscribers: 89, status: "Live", mrr: "₹2,91,667" },
  { id: "pl5", name: "Growth Yearly", code: "GRW-Y", price: "₹82,400", interval: "Yearly", trialDays: 14, subscribers: 145, status: "Live", mrr: "₹9,95,333" },
  { id: "pl6", name: "Basic (Legacy)", code: "BSC-M", price: "₹1,200", interval: "Monthly", trialDays: 7, subscribers: 0, status: "Retired", mrr: "₹0" },
];

export const adminQuotations: QuotationRecord[] = [
  { id: "q1", quoteNumber: "QT-2026-000041", customer: "Northwind Traders", owner: "staff@brightloop.io", plan: "Enterprise", total: "₹22,200", validUntil: "2026-11-10", status: "Sent", createdAt: "2026-10-22" },
  { id: "q2", quoteNumber: "QT-2026-000039", customer: "BlueSky Logistics", owner: "staff@brightloop.io", plan: "Growth", total: "₹9,840", validUntil: "2026-11-05", status: "Accepted", createdAt: "2026-10-18" },
  { id: "q3", quoteNumber: "QT-2026-000038", customer: "Coastal Exports", owner: "admin@brightloop.io", plan: "Growth", total: "₹9,840", validUntil: "2026-10-30", status: "Rejected", createdAt: "2026-10-15" },
  { id: "q4", quoteNumber: "QT-2026-000037", customer: "TechSpark Solutions", owner: "admin@brightloop.io", plan: "Enterprise", total: "₹22,200", validUntil: "2026-11-15", status: "Draft", createdAt: "2026-10-28" },
  { id: "q5", quoteNumber: "QT-2026-000035", customer: "Digital Frontier", owner: "staff@brightloop.io", plan: "Enterprise", total: "₹22,200", validUntil: "2026-10-28", status: "Expired", createdAt: "2026-10-01" },
  { id: "q6", quoteNumber: "QT-2026-000034", customer: "Sunrise Textiles", owner: "staff@brightloop.io", plan: "Starter", total: "₹4,200", validUntil: "2026-11-20", status: "Sent", createdAt: "2026-10-25" },
];

export const adminSubscriptions: SubscriptionRecord[] = [
  { id: "s1", subscriptionNumber: "SUB-2026-001420", customer: "Northwind Traders", plan: "Enterprise", mrr: "₹18,500", startDate: "2025-03-12", nextBilling: "2026-11-12", autoRenew: true, status: "Active" },
  { id: "s2", subscriptionNumber: "SUB-2026-001398", customer: "TechSpark Solutions", plan: "Enterprise", mrr: "₹18,500", startDate: "2025-01-08", nextBilling: "2026-11-08", autoRenew: true, status: "Active" },
  { id: "s3", subscriptionNumber: "SUB-2026-001376", customer: "Sunrise Textiles", plan: "Growth", mrr: "₹8,200", startDate: "2025-06-01", nextBilling: "2026-11-01", autoRenew: true, status: "Active" },
  { id: "s4", subscriptionNumber: "SUB-2026-001355", customer: "BlueSky Logistics", plan: "Starter", mrr: "₹3,500", startDate: "2026-09-15", nextBilling: "2026-11-15", autoRenew: false, status: "Active" },
  { id: "s5", subscriptionNumber: "SUB-2026-001340", customer: "Coastal Exports", plan: "Growth", mrr: "₹8,200", startDate: "2024-11-20", nextBilling: "2026-11-20", autoRenew: true, status: "Active" },
  { id: "s6", subscriptionNumber: "SUB-2026-001320", customer: "Greenfield Agro", plan: "Starter", mrr: "₹3,500", startDate: "2025-07-30", nextBilling: "—", autoRenew: false, status: "Paused" },
  { id: "s7", subscriptionNumber: "SUB-2026-001298", customer: "Precision Parts Ltd", plan: "Growth", mrr: "₹8,200", startDate: "2025-04-15", nextBilling: "2026-11-15", autoRenew: false, status: "Cancelling" },
];

export const adminInvoices: InvoiceRecord[] = [
  { id: "inv1", invoiceNumber: "BL-2026-000482", customer: "Northwind Traders", plan: "Enterprise", amount: "₹15,678", tax: "₹2,822", total: "₹18,500", issuedAt: "2026-10-01", dueDate: "2026-10-15", status: "Paid" },
  { id: "inv2", invoiceNumber: "BL-2026-000481", customer: "TechSpark Solutions", plan: "Enterprise", amount: "₹15,678", tax: "₹2,822", total: "₹18,500", issuedAt: "2026-10-01", dueDate: "2026-10-15", status: "Paid" },
  { id: "inv3", invoiceNumber: "BL-2026-000480", customer: "Digital Frontier", plan: "Enterprise", amount: "₹15,678", tax: "₹2,822", total: "₹18,500", issuedAt: "2026-10-01", dueDate: "2026-10-15", status: "Outstanding" },
  { id: "inv4", invoiceNumber: "BL-2026-000479", customer: "Sunrise Textiles", plan: "Growth", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-10-01", dueDate: "2026-10-15", status: "Paid" },
  { id: "inv5", invoiceNumber: "BL-2026-000478", customer: "Coastal Exports", plan: "Growth", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-09-01", dueDate: "2026-09-15", status: "Overdue" },
  { id: "inv6", invoiceNumber: "BL-2026-000477", customer: "BlueSky Logistics", plan: "Starter", amount: "₹2,966", tax: "₹534", total: "₹3,500", issuedAt: "2026-10-15", dueDate: "2026-10-29", status: "Outstanding" },
  { id: "inv7", invoiceNumber: "BL-2026-000476", customer: "Precision Parts Ltd", plan: "Growth", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-10-01", dueDate: "2026-10-15", status: "Paid" },
];

export const adminPayments: PaymentRecord[] = [
  { id: "pay1", receiptNumber: "RCP-2026-000214", customer: "Northwind Traders", invoiceNumber: "BL-2026-000482", amount: "₹18,500", method: "Bank Transfer", reference: "NEFT-BL-482-2610", paidAt: "2026-10-13", status: "Settled" },
  { id: "pay2", receiptNumber: "RCP-2026-000213", customer: "TechSpark Solutions", invoiceNumber: "BL-2026-000481", amount: "₹18,500", method: "Card", reference: "CHG-TS-481-2610", paidAt: "2026-10-12", status: "Settled" },
  { id: "pay3", receiptNumber: "RCP-2026-000212", customer: "Sunrise Textiles", invoiceNumber: "BL-2026-000479", amount: "₹8,200", method: "UPI", reference: "UPI-STX-479-2610", paidAt: "2026-10-10", status: "Settled" },
  { id: "pay4", receiptNumber: "RCP-2026-000211", customer: "Precision Parts Ltd", invoiceNumber: "BL-2026-000476", amount: "₹8,200", method: "Card", reference: "CHG-PPL-476-2609", paidAt: "2026-10-08", status: "Settled" },
  { id: "pay5", receiptNumber: "RCP-2026-000210", customer: "Digital Frontier", invoiceNumber: "BL-2026-000475", amount: "₹18,500", method: "Manual", reference: "MAN-DF-475-2609", paidAt: "2026-09-20", status: "Pending" },
];

export const adminTaxes: TaxRecord[] = [
  { id: "t1", name: "CGST 9%", scope: "Domestic B2B", rate: "9%", status: "Active" },
  { id: "t2", name: "SGST 9%", scope: "Domestic B2B", rate: "9%", status: "Active" },
  { id: "t3", name: "IGST 18%", scope: "Interstate B2B", rate: "18%", status: "Active" },
  { id: "t4", name: "CGST 6%", scope: "Domestic B2C", rate: "6%", status: "Active" },
  { id: "t5", name: "SGST 6%", scope: "Domestic B2C", rate: "6%", status: "Active" },
  { id: "t6", name: "Export Zero-rated", scope: "International", rate: "0%", status: "Active" },
  { id: "t7", name: "GST 5% (Legacy)", scope: "Archived", rate: "5%", status: "Draft" },
];

export const adminUsers: UserRecord[] = [
  { id: "u1", name: "Admin User", email: "admin@brightloop.io", role: "Admin", status: "Active", lastLogin: "2026-10-31 09:12" },
  { id: "u2", name: "Finance Lead", email: "finance@brightloop.io", role: "Finance", status: "Active", lastLogin: "2026-10-30 17:45" },
  { id: "u3", name: "Staff Member", email: "staff@brightloop.io", role: "Staff", status: "Active", lastLogin: "2026-10-31 11:00" },
  { id: "u4", name: "Aarav Mehta", email: "aarav@northwind.in", role: "Customer", status: "Active", lastLogin: "2026-10-28 14:30" },
  { id: "u5", name: "Priya Nair", email: "priya@sunrise.co.in", role: "Customer", status: "Active", lastLogin: "2026-10-29 09:15" },
  { id: "u6", name: "Invited Staff", email: "newstaff@brightloop.io", role: "Staff", status: "Pending", lastLogin: "—" },
];

export const adminAuditLog: AuditEntry[] = [
  { id: "a1", actor: "admin@brightloop.io", action: "Invoice run triggered", entity: "Invoice", entityId: "BL-2026-000482", timestamp: "2026-10-31 09:00", type: "human" },
  { id: "a2", actor: "system", action: "Nightly billing run completed — 412 invoices generated", entity: "System", entityId: "BATCH-31102026", timestamp: "2026-10-31 02:00", type: "automated" },
  { id: "a3", actor: "admin@brightloop.io", action: "Plan price updated: Growth ₹7,800 → ₹8,200", entity: "Plan", entityId: "GRW-M", timestamp: "2026-10-30 16:22", type: "human" },
  { id: "a4", actor: "staff@brightloop.io", action: "Payment recorded manually", entity: "Payment", entityId: "RCP-2026-000210", timestamp: "2026-10-29 14:10", type: "human" },
  { id: "a5", actor: "system", action: "Dunning email sent — 3rd attempt", entity: "Customer", entityId: "Coastal Exports", timestamp: "2026-10-29 08:00", type: "automated" },
  { id: "a6", actor: "admin@brightloop.io", action: "Tax rate activated: IGST 18%", entity: "Tax", entityId: "t3", timestamp: "2026-10-28 11:05", type: "human" },
  { id: "a7", actor: "system", action: "Subscription auto-renewed", entity: "Subscription", entityId: "SUB-2026-001376", timestamp: "2026-10-28 02:00", type: "automated" },
  { id: "a8", actor: "admin@brightloop.io", action: "User invited: newstaff@brightloop.io", entity: "User", entityId: "u6", timestamp: "2026-10-27 15:30", type: "human" },
];

export const revenueChartData = [
  { month: "May", billed: 2280, collected: 2050 },
  { month: "Jun", billed: 2410, collected: 2280 },
  { month: "Jul", billed: 2190, collected: 2100 },
  { month: "Aug", billed: 2520, collected: 2400 },
  { month: "Sep", billed: 2380, collected: 2200 },
  { month: "Oct", billed: 2490, collected: 2310 },
];

export const planMixData = [
  { name: "Growth", count: 3242, color: "#cca267" },
  { name: "Enterprise", count: 789, color: "#38bdf8" },
  { name: "Starter", count: 237, color: "#a78bfa" },
  { name: "Yearly", count: 234, color: "#34d399" },
];

export const adminSettings = {
  workspaceName: "Brightloop",
  supportEmail: "support@brightloop.io",
  companyName: "Brightloop Software Pvt Ltd",
  currency: "INR",
  invoiceDueWindow: "14",
  invoicePrefix: "CL-2026",
  billingRunTime: "02:00",
  autoDunning: true,
  reminderDays: "3, 7, 14",
  footerNote: "Thank you for your business. Payments processed securely. For support, contact support@brightloop.io",
  gstin: "27AABCB1234F1ZS",
  address: "Office 14B, Infinity Tech Park, Malad West, Mumbai — 400 064",
};
