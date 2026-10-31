import { supabase } from "@/lib/supabase/client";

export interface Settings {
  id: string;
  workspaceName: string;
  supportEmail: string;
  companyName: string;
  currency: string;
  invoiceDueWindow: number;
  invoicePrefix: string;
  billingRunTime: string;
  autoDunning: boolean;
  reminderDays: string;
  footerNote: string;
  gstin: string;
  address: string;
  updatedAt: string;
}

export async function fetchSettings(): Promise<Settings | null> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", "default")
    .single();
  if (error) { console.error("fetchSettings:", error.message); return null; }
  return data;
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings | null> {
  const { data, error } = await supabase
    .from("settings")
    .update({ ...updates, updatedAt: new Date().toISOString() })
    .eq("id", "default")
    .select()
    .single();
  if (error) { console.error("updateSettings:", error.message); return null; }
  return data;
}
