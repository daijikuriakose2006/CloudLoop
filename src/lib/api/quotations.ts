import { supabase } from "@/lib/supabase/client";

export interface Quotation {
  id: string;
  number: string;
  customerId: string;
  ownerId?: string;
  validUntil: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  customer?: { name: string; email: string };
  owner?: { fullName: string; email: string };
}

export interface QuotationItem {
  id: string;
  quotationId: string;
  productId?: string;
  planId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export async function fetchQuotations(): Promise<Quotation[]> {
  const { data, error } = await supabase
    .from("quotations")
    .select("*, customer:customers(name, email), owner:profiles(fullName, email)")
    .order("createdAt", { ascending: false });
  if (error) { console.error("fetchQuotations:", error.message); return []; }
  return data || [];
}

export async function createQuotation(quotation: {
  customerId: string;
  ownerId?: string;
  validUntil: string;
  total: number;
  items: Omit<QuotationItem, "id" | "quotationId">[];
}): Promise<Quotation | null> {
  const id = `qt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const count = await supabase.from("quotations").select("id", { count: "exact", head: true });
  const num = `QT-${new Date().getFullYear()}-${String((count.count || 0) + 1).padStart(6, "0")}`;

  const { data, error } = await supabase
    .from("quotations")
    .insert({
      id,
      number: num,
      customerId: quotation.customerId,
      ownerId: quotation.ownerId,
      validUntil: quotation.validUntil,
      status: "DRAFT",
      total: quotation.total,
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) { console.error("createQuotation:", error.message); return null; }

  // Insert items
  if (quotation.items.length > 0) {
    const items = quotation.items.map((item) => ({
      ...item,
      id: `qi_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      quotationId: id,
    }));
    await supabase.from("quotation_items").insert(items);
  }

  return data;
}

export async function updateQuotationStatus(id: string, status: string): Promise<Quotation | null> {
  const { data, error } = await supabase
    .from("quotations")
    .update({ status, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) { console.error("updateQuotationStatus:", error.message); return null; }
  return data;
}
