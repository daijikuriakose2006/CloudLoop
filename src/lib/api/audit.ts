import { supabase } from "@/lib/supabase/client";

export interface AuditLog {
  id: string;
  actorId?: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  actor?: { fullName: string; email: string };
}

export async function fetchAuditLogs(limit = 50): Promise<AuditLog[]> {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*, actor:profiles(fullName, email)")
    .order("createdAt", { ascending: false })
    .limit(limit);
  if (error) { console.error("fetchAuditLogs:", error.message); return []; }
  return data || [];
}

export async function createAuditLog(log: {
  actorId?: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const id = `audit_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const { error } = await supabase.from("audit_logs").insert({ ...log, id });
  if (error) console.error("createAuditLog:", error.message);
}
