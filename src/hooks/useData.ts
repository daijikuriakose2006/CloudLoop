"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCustomers, createCustomer, updateCustomer, searchCustomers, Customer } from "@/lib/api/customers";
import { fetchProducts, createProduct, updateProduct, Product } from "@/lib/api/products";
import { fetchPlans, createPlan, updatePlan, searchPlans, Plan } from "@/lib/api/plans";
import { fetchSubscriptions, createSubscription, updateSubscriptionStatus, Subscription } from "@/lib/api/subscriptions";
import { fetchInvoices, updateInvoiceStatus, Invoice } from "@/lib/api/invoices";
import { fetchPayments, createPayment, Payment } from "@/lib/api/payments";
import { fetchQuotations, createQuotation, updateQuotationStatus, Quotation } from "@/lib/api/quotations";
import { fetchTaxes, createTax, updateTax, Tax } from "@/lib/api/taxes";
import { fetchDiscounts, createDiscount, updateDiscount, Discount } from "@/lib/api/discounts";
import { fetchAuditLogs, createAuditLog, AuditLog } from "@/lib/api/audit";
import { fetchSettings, updateSettings, Settings } from "@/lib/api/settings";
import { fetchProfiles, Profile } from "@/lib/api/users";

// Generic hook factory
function useDataFetcher<T>(fetcher: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, setData };
}

// ============ Customers ============
export function useCustomers() {
  const result = useDataFetcher(fetchCustomers);

  const addCustomer = useCallback(async (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => {
    const created = await createCustomer(customer);
    if (created) {
      await createAuditLog({ action: `Customer created: ${customer.name}`, entityType: "Customer", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  const editCustomer = useCallback(async (id: string, updates: Partial<Customer>) => {
    const updated = await updateCustomer(id, updates);
    if (updated) await result.refresh();
    return updated;
  }, [result]);

  return { ...result, customers: result.data, addCustomer, editCustomer, searchCustomers };
}

// ============ Products ============
export function useProducts() {
  const result = useDataFetcher(fetchProducts);

  const addProduct = useCallback(async (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const created = await createProduct(product);
    if (created) {
      await createAuditLog({ action: `Product created: ${product.name}`, entityType: "Product", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  const editProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const updated = await updateProduct(id, updates);
    if (updated) await result.refresh();
    return updated;
  }, [result]);

  return { ...result, products: result.data, addProduct, editProduct };
}

// ============ Plans ============
export function usePlans() {
  const result = useDataFetcher(fetchPlans);

  const addPlan = useCallback(async (plan: Omit<Plan, "id">) => {
    const created = await createPlan(plan);
    if (created) {
      await createAuditLog({ action: `Plan created: ${plan.name}`, entityType: "Plan", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  const editPlan = useCallback(async (id: string, updates: Partial<Plan>) => {
    const updated = await updatePlan(id, updates);
    if (updated) await result.refresh();
    return updated;
  }, [result]);

  return { ...result, plans: result.data, addPlan, editPlan, searchPlans };
}

// ============ Subscriptions ============
export function useSubscriptions() {
  const result = useDataFetcher(fetchSubscriptions);

  const addSubscription = useCallback(async (sub: { customerId: string; planId: string; startDate: string; trialDays?: number; autoRenew?: boolean }) => {
    const created = await createSubscription(sub);
    if (created) {
      await createAuditLog({ action: `Subscription created: ${created.number}`, entityType: "Subscription", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  const changeStatus = useCallback(async (id: string, status: string) => {
    const updated = await updateSubscriptionStatus(id, status);
    if (updated) {
      await createAuditLog({ action: `Subscription ${status}: ${updated.number}`, entityType: "Subscription", entityId: id });
      await result.refresh();
    }
    return updated;
  }, [result]);

  return { ...result, subscriptions: result.data, addSubscription, changeStatus };
}

// ============ Invoices ============
export function useInvoices() {
  const result = useDataFetcher(fetchInvoices);

  const changeStatus = useCallback(async (id: string, status: string) => {
    const updated = await updateInvoiceStatus(id, status);
    if (updated) {
      await createAuditLog({ action: `Invoice ${status}: ${updated.number}`, entityType: "Invoice", entityId: id });
      await result.refresh();
    }
    return updated;
  }, [result]);

  return { ...result, invoices: result.data, changeStatus };
}

// ============ Payments ============
export function usePayments() {
  const result = useDataFetcher(fetchPayments);

  const addPayment = useCallback(async (payment: { invoiceId: string; method: string; amount: number; paidAt: string; note?: string }) => {
    const created = await createPayment(payment);
    if (created) {
      await createAuditLog({ action: `Payment recorded: ₹${payment.amount}`, entityType: "Payment", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  return { ...result, payments: result.data, addPayment };
}

// ============ Quotations ============
export function useQuotations() {
  const result = useDataFetcher(fetchQuotations);

  const addQuotation = useCallback(async (quotation: Parameters<typeof createQuotation>[0]) => {
    const created = await createQuotation(quotation);
    if (created) {
      await createAuditLog({ action: `Quotation created: ${created.number}`, entityType: "Quotation", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  const changeStatus = useCallback(async (id: string, status: string) => {
    const updated = await updateQuotationStatus(id, status);
    if (updated) await result.refresh();
    return updated;
  }, [result]);

  return { ...result, quotations: result.data, addQuotation, changeStatus };
}

// ============ Taxes ============
export function useTaxes() {
  const result = useDataFetcher(fetchTaxes);

  const addTax = useCallback(async (tax: Omit<Tax, "id" | "createdAt">) => {
    const created = await createTax(tax);
    if (created) {
      await createAuditLog({ action: `Tax rate created: ${tax.name}`, entityType: "Tax", entityId: created.id });
      await result.refresh();
    }
    return created;
  }, [result]);

  const editTax = useCallback(async (id: string, updates: Partial<Tax>) => {
    const updated = await updateTax(id, updates);
    if (updated) await result.refresh();
    return updated;
  }, [result]);

  return { ...result, taxes: result.data, addTax, editTax };
}

// ============ Discounts ============
export function useDiscounts() {
  const result = useDataFetcher(fetchDiscounts);

  const addDiscount = useCallback(async (discount: Omit<Discount, "id" | "usageCount">) => {
    const created = await createDiscount(discount);
    if (created) await result.refresh();
    return created;
  }, [result]);

  const editDiscount = useCallback(async (id: string, updates: Partial<Discount>) => {
    const updated = await updateDiscount(id, updates);
    if (updated) await result.refresh();
    return updated;
  }, [result]);

  return { ...result, discounts: result.data, addDiscount, editDiscount };
}

// ============ Audit Logs ============
export function useAuditLogs(limit = 50) {
  const fetcher = useCallback(() => fetchAuditLogs(limit), [limit]);
  const result = useDataFetcher(fetcher);
  return { ...result, auditLogs: result.data };
}

// ============ Settings ============
export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchSettings();
    setSettings(data);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const saveSettings = useCallback(async (updates: Partial<Settings>) => {
    const updated = await updateSettings(updates);
    if (updated) setSettings(updated);
    return updated;
  }, []);

  return { settings, loading, refresh, saveSettings };
}

// ============ Users / Profiles ============
export function useProfiles() {
  const result = useDataFetcher(fetchProfiles);
  return { ...result, profiles: result.data };
}
