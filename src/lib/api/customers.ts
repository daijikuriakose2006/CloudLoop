import { supabase } from "@/lib/supabase/client";

// ============================================================
// Customers API
// ============================================================

export interface Customer {
  id: string;
  profileId?: string;
  name: string;
  email: string;
  phone?: string;
  contactName?: string;
  city?: string;
  gstin?: string;
  billingAddress?: Record<string, unknown>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("fetchCustomers error:", error.message);
    return [];
  }
  return data || [];
}

export async function fetchCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function createCustomer(
  customer: Omit<Customer, "id" | "createdAt" | "updatedAt">
): Promise<Customer | null> {
  const id = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase
    .from("customers")
    .insert({ ...customer, id, updatedAt: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    console.error("createCustomer error:", error.message);
    return null;
  }
  return data;
}

export async function updateCustomer(
  id: string,
  updates: Partial<Customer>
): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .update({ ...updates, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateCustomer error:", error.message);
    return null;
  }
  return data;
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .or(`name.ilike.%${query}%,email.ilike.%${query}%,contactName.ilike.%${query}%,city.ilike.%${query}%`)
    .order("name")
    .limit(20);

  if (error) {
    console.error("searchCustomers error:", error.message);
    return [];
  }
  return data || [];
}
