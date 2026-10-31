import { supabase } from "@/lib/supabase/client";

export interface Discount {
  id: string;
  name: string;
  code?: string;
  description?: string;
  type: string;
  value: number;
  minimumPurchase?: number;
  minimumQuantity?: number;
  startsAt: string;
  endsAt?: string;
  usageLimit?: number;
  usageCount: number;
  productId?: string;
  active: boolean;
}

export async function fetchDiscounts(): Promise<Discount[]> {
  const { data, error } = await supabase.from("discounts").select("*").order("startsAt", { ascending: false });
  if (error) { console.error("fetchDiscounts:", error.message); return []; }
  return data || [];
}

export async function createDiscount(discount: Omit<Discount, "id" | "usageCount">): Promise<Discount | null> {
  const id = `disc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase.from("discounts").insert({ ...discount, id, usageCount: 0 }).select().single();
  if (error) { console.error("createDiscount:", error.message); return null; }
  return data;
}

export async function updateDiscount(id: string, updates: Partial<Discount>): Promise<Discount | null> {
  const { data, error } = await supabase.from("discounts").update(updates).eq("id", id).select().single();
  if (error) { console.error("updateDiscount:", error.message); return null; }
  return data;
}
