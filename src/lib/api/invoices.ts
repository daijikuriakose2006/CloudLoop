import { supabase } from "@/lib/supabase/client";

export interface Invoice {
  id: string;
  number: string;
  subscriptionId: string;
  customerId: string;
  status: string;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  paidAmount: number;
  createdAt: string;
  updatedAt: string;
  customer?: { name: string; email: string };
  subscription?: { number: string; planId: string };
}

export interface InvoiceLine {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  taxRate: number;
  amount: number;
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("invoices")
    .select("*, customer:customers(name, email)")
    .order("createdAt", { ascending: false });
  if (error) { console.error("fetchInvoices:", error.message); return []; }
  return data || [];
}

export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from("invoices")
    .select("*, customer:customers(name, email)")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function fetchInvoiceLines(invoiceId: string): Promise<InvoiceLine[]> {
  const { data, error } = await supabase
    .from("invoice_lines")
    .select("*")
    .eq("invoiceId", invoiceId);
  if (error) return [];
  return data || [];
}

export async function updateInvoiceStatus(id: string, status: string): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from("invoices")
    .update({ status, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) { console.error("updateInvoiceStatus:", error.message); return null; }
  return data;
}
