import { supabase } from "@/lib/supabase/client";

export interface Plan {
  id: string;
  productId: string;
  name: string;
  code?: string;
  price: number;
  billingPeriod: string;
  minimumQuantity: number;
  trialDays: number;
  availableFrom?: string;
  availableTo?: string;
  autoCloseAtEnd: boolean;
  allowEarlyClose: boolean;
  allowPause: boolean;
  allowRenew: boolean;
  active: boolean;
  status: string;
}

export async function fetchPlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("name");
  if (error) { console.error("fetchPlans:", error.message); return []; }
  return data || [];
}

export async function createPlan(plan: Omit<Plan, "id">): Promise<Plan | null> {
  const id = `plan_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase.from("plans").insert({ ...plan, id }).select().single();
  if (error) { console.error("createPlan:", error.message); return null; }
  return data;
}

export async function updatePlan(id: string, updates: Partial<Plan>): Promise<Plan | null> {
  const { data, error } = await supabase.from("plans").update(updates).eq("id", id).select().single();
  if (error) { console.error("updatePlan:", error.message); return null; }
  return data;
}

export async function searchPlans(query: string): Promise<Plan[]> {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .or(`name.ilike.%${query}%,code.ilike.%${query}%`)
    .eq("active", true)
    .order("name")
    .limit(20);
  if (error) { console.error("searchPlans:", error.message); return []; }
  return data || [];
}
