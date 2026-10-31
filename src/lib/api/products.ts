import { supabase } from "@/lib/supabase/client";

// ============================================================
// Products API
// ============================================================

export interface Product {
  id: string;
  name: string;
  type: string;
  salesPrice: number;
  costPrice: number;
  notes?: string;
  sku?: string;
  category?: string;
  description?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  priceAdjustment: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("fetchProducts error:", error.message);
    return [];
  }
  return data || [];
}

export async function createProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product | null> {
  const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase
    .from("products")
    .insert({ ...product, id, updatedAt: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    console.error("createProduct error:", error.message);
    return null;
  }
  return data;
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updatedAt: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateProduct error:", error.message);
    return null;
  }
  return data;
}

export async function fetchVariants(productId: string): Promise<ProductVariant[]> {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("productId", productId);

  if (error) return [];
  return data || [];
}

export async function createVariant(
  variant: Omit<ProductVariant, "id">
): Promise<ProductVariant | null> {
  const id = `var_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { data, error } = await supabase
    .from("product_variants")
    .insert({ ...variant, id })
    .select()
    .single();

  if (error) {
    console.error("createVariant error:", error.message);
    return null;
  }
  return data;
}
