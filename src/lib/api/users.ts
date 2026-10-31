import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/server";

export interface Profile {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  company?: string;
  city?: string;
  phone?: string;
  gstin?: string;
  billingAddress?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) { console.error("fetchProfiles:", error.message); return []; }
  return data || [];
}

export async function fetchProfileByEmail(email: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();
  if (error) return null;
  return data;
}

export async function fetchProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updates, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) { console.error("updateProfile:", error.message); return null; }
  return data;
}
