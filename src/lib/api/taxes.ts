import { supabase } from "@/lib/supabase/client";

export interface Tax {
  id: string;
  name: string;
  rate: number;
  scope: string;
  active: boolean;
  createdAt: string;
}

export async function fetchTaxes(): Promise<Tax[]> {
  const { data, error } = await supabase.from("taxes").select("*").order("name");
  if (error) { console.error("fetchTaxes:", error.message); return []; }
  return data || [];
}

export async function createTax(tax: Omit<Tax, "id" | "createdAt">): Promise<Tax | null> {
  const id = `tax_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase.from("taxes").insert({ ...tax, id }).select().single();
  if (error) { console.error("createTax:", error.message); return null; }
  return data;
}

export async function updateTax(id: string, updates: Partial<Tax>): Promise<Tax | null> {
  const { data, error } = await supabase.from("taxes").update(updates).eq("id", id).select().single();
  if (error) { console.error("updateTax:", error.message); return null; }
  return data;
}
