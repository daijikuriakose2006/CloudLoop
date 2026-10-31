import {
  MySubscription,
  MyInvoice,
  MyPayment,
  MyQuotation,
  CatalogueProduct,
  SupportTicket,
  CustomerProfile,
} from "./types";

export const mySubscription: MySubscription = {
  id: "sub-001",
  subscriptionNumber: "SUB-2026-001376",
  plan: "Growth",
  price: "₹8,200",
  seats: 25,
  usedSeats: 18,
  startDate: "2025-06-01",
  nextBilling: "2026-11-01",
  autoRenew: true,
  status: "Active",
  features: [
    "Unlimited invoices",
    "Customer portal access",
    "API access — 50,000 calls/mo",
    "Analytics suite (standard)",
    "Email + chat support",
    "GST compliance module",
    "Up to 25 seats",
  ],
};

export const myInvoices: MyInvoice[] = [
  { id: "i1", invoiceNumber: "BL-2026-000479", period: "Oct 2026", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-10-01", dueDate: "2026-10-15", status: "Paid" },
  { id: "i2", invoiceNumber: "BL-2026-000441", period: "Sep 2026", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-09-01", dueDate: "2026-09-15", status: "Paid" },
  { id: "i3", invoiceNumber: "BL-2026-000403", period: "Aug 2026", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-08-01", dueDate: "2026-08-15", status: "Paid" },
  { id: "i4", invoiceNumber: "BL-2026-000367", period: "Jul 2026", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-07-01", dueDate: "2026-07-15", status: "Paid" },
  { id: "i5", invoiceNumber: "BL-2026-000328", period: "Jun 2026", amount: "₹6,949", tax: "₹1,251", total: "₹8,200", issuedAt: "2026-06-01", dueDate: "2026-06-15", status: "Paid" },
];

export const myPayments: MyPayment[] = [
  { id: "p1", receiptNumber: "RCP-2026-000212", invoiceNumber: "BL-2026-000479", amount: "₹8,200", method: "UPI", reference: "UPI-STX-479-2610", paidAt: "2026-10-10", status: "Settled" },
  { id: "p2", receiptNumber: "RCP-2026-000190", invoiceNumber: "BL-2026-000441", amount: "₹8,200", method: "UPI", reference: "UPI-STX-441-2609", paidAt: "2026-09-12", status: "Settled" },
  { id: "p3", receiptNumber: "RCP-2026-000165", invoiceNumber: "BL-2026-000403", amount: "₹8,200", method: "Card", reference: "CHG-STX-403-2608", paidAt: "2026-08-10", status: "Settled" },
  { id: "p4", receiptNumber: "RCP-2026-000138", invoiceNumber: "BL-2026-000367", amount: "₹8,200", method: "Bank Transfer", reference: "NEFT-STX-367-2607", paidAt: "2026-07-11", status: "Settled" },
];

export const myQuotations: MyQuotation[] = [
  { id: "q1", quoteNumber: "QT-2026-000039", plan: "Growth", total: "₹9,840", validUntil: "2026-11-05", status: "Accepted", createdAt: "2026-10-18" },
  { id: "q2", quoteNumber: "QT-2026-000034", plan: "Enterprise", total: "₹22,200", validUntil: "2026-11-20", status: "Sent", createdAt: "2026-10-25" },
  { id: "q3", quoteNumber: "QT-2026-000021", plan: "Starter", total: "₹4,200", validUntil: "2026-09-30", status: "Expired", createdAt: "2026-09-15" },
];

export const catalogueProducts: CatalogueProduct[] = [
  {
    id: "cat1",
    name: "Billing Engine Core",
    category: "Platform",
    description: "Core recurring billing infrastructure with automated invoice runs, dunning and real-time MRR tracking.",
    accent: "#cca267",
    plans: [
      { name: "Starter", price: "₹3,500/mo", interval: "Monthly", features: ["5 seats", "500 invoices/mo", "Basic analytics"] },
      { name: "Growth", price: "₹8,200/mo", interval: "Monthly", features: ["25 seats", "Unlimited invoices", "Full analytics"] },
      { name: "Enterprise", price: "₹18,500/mo", interval: "Monthly", features: ["Unlimited seats", "Dedicated support", "Custom SLA"] },
    ],
  },
  {
    id: "cat2",
    name: "Analytics Suite",
    category: "Analytics",
    description: "Revenue trend charts, plan mix donut, invoice ageing buckets and GST slab reporting out of the box.",
    accent: "#38bdf8",
    plans: [
      { name: "Standard", price: "Included in Growth+", interval: "Bundled", features: ["6 chart types", "CSV export", "Email schedule"] },
      { name: "Advanced", price: "₹2,400/mo", interval: "Add-on", features: ["Custom dashboards", "API data export", "Webhook alerts"] },
    ],
  },
  {
    id: "cat3",
    name: "Customer Portal",
    category: "Portal",
    description: "Your customers see renewals, download invoices and pay overdue balances from a self-serve branded portal.",
    accent: "#a78bfa",
    plans: [
      { name: "Included", price: "Free with any plan", interval: "Bundled", features: ["Invoice download", "Payment gateway", "Subscription view"] },
    ],
  },
  {
    id: "cat4",
    name: "API Access Pack",
    category: "Integration",
    description: "REST API with webhook support for pushing subscription events to your ERP or CRM in real time.",
    accent: "#34d399",
    plans: [
      { name: "Basic", price: "50,000 calls/mo", interval: "Included in Growth", features: ["REST API", "Webhook events"] },
      { name: "Pro", price: "₹1,800/mo", interval: "Add-on", features: ["500K calls/mo", "Priority queue", "Dedicated endpoint"] },
    ],
  },
  {
    id: "cat5",
    name: "GST Compliance",
    category: "Compliance",
    description: "Automated CGST, SGST and IGST calculation with rate snapshots per invoice line and B2B / B2C split.",
    accent: "#fb923c",
    plans: [
      { name: "Standard GST", price: "Included", interval: "Bundled", features: ["18% / 5% rates", "Rate snapshots", "B2B+B2C split"] },
    ],
  },
];

export const supportTickets: SupportTicket[] = [
  { id: "t1", subject: "Invoice download not working", category: "Billing", message: "I'm unable to download my October invoice. The button spins but nothing downloads.", status: "Answered", createdAt: "2026-10-28", lastReply: "Hi, we've resolved this — please try clearing your browser cache and downloading again. Let us know if the issue persists.", repliedAt: "2026-10-29 09:30" },
  { id: "t2", subject: "Need to update GST number", category: "Account", message: "Our GSTIN has changed from 27AABCB1234F1ZS to 27AABCB5678G2ZT. Please update on our account.", status: "In review", createdAt: "2026-10-30" },
  { id: "t3", subject: "Upgrade to Enterprise plan", category: "Subscription", message: "We're growing quickly and need to upgrade to Enterprise. Can you generate a quotation?", status: "Open", createdAt: "2026-10-31" },
];

export const customerProfile: CustomerProfile = {
  fullName: "Priya Nair",
  email: "priya@sunrise.co.in",
  company: "Sunrise Textiles",
  phone: "+91 98765 43210",
  city: "Coimbatore",
  gstin: "33AABCS1234D1ZV",
  billingAddress: "Plot 14, SIDCO Industrial Estate, Coimbatore — 641 021, Tamil Nadu",
};
