import { supabase } from "@/lib/supabase/client";

export interface Subscription {
  id: string;
  number: string;
  customerId: string;
  planId: string;
  status: string;
  startDate: string;
  expiryDate?: string;
  nextBillingDate: string;
  paymentTermsDays: number;
  autoRenew: boolean;
  trialDays: number;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  customer?: { name: string; email: string };
  plan?: { name: string; price: number; billingPeriod: string };
}

export async function fetchSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*, customer:customers(name, email), plan:plans(name, price, billingPeriod)")
    .order("createdAt", { ascending: false });
  if (error) { console.error("fetchSubscriptions:", error.message); return []; }
  return data || [];
}

export async function createSubscription(sub: {
  customerId: string;
  planId: string;
  startDate: string;
  trialDays?: number;
  autoRenew?: boolean;
}): Promise<Subscription | null> {
  const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const count = await supabase.from("subscriptions").select("id", { count: "exact", head: true });
  const num = `SUB-${new Date().getFullYear()}-${String((count.count || 0) + 1).padStart(6, "0")}`;

  const startDate = new Date(sub.startDate);
  const trialDays = sub.trialDays || 0;
  const billingStart = new Date(startDate);
  billingStart.setDate(billingStart.getDate() + trialDays + 30);

  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      id,
      number: num,
      customerId: sub.customerId,
      planId: sub.planId,
      status: trialDays > 0 ? "ACTIVE" : "ACTIVE",
      startDate: sub.startDate,
      nextBillingDate: billingStart.toISOString(),
      paymentTermsDays: 0,
      autoRenew: sub.autoRenew ?? true,
      trialDays,
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) { console.error("createSubscription:", error.message); return null; }
  return data;
}

export async function updateSubscriptionStatus(
  id: string,
  status: string
): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from("subscriptions")
    .update({ status, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) { console.error("updateSubscriptionStatus:", error.message); return null; }
  return data;
}
