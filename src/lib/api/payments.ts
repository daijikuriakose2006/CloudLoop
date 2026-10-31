import { supabase } from "@/lib/supabase/client";

export interface Payment {
  id: string;
  invoiceId: string;
  method: string;
  amount: number;
  paidAt: string;
  note?: string;
  gatewayPaymentId?: string;
  createdAt: string;
  invoice?: { number: string; customerId: string };
}

export async function fetchPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from("payments")
    .select("*, invoice:invoices(number, customerId)")
    .order("createdAt", { ascending: false });
  if (error) { console.error("fetchPayments:", error.message); return []; }
  return data || [];
}

export async function createPayment(payment: {
  invoiceId: string;
  method: string;
  amount: number;
  paidAt: string;
  note?: string;
}): Promise<Payment | null> {
  const id = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase
    .from("payments")
    .insert({ ...payment, id })
    .select()
    .single();
  if (error) { console.error("createPayment:", error.message); return null; }
  return data;
}
