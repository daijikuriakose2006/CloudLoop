-- ==============================================================================
-- Migration 002: Schema Additions
-- Adds FINANCE role, settings table, missing columns across entities
-- Run in Supabase SQL Editor AFTER 001_initial_schema.sql
-- ==============================================================================

-- 1. Add FINANCE to Role enum
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'FINANCE';

-- 2. Add missing columns to profiles
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "company" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "city" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "gstin" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "billingAddress" TEXT;
ALTER TABLE "profiles" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'Active';

-- 3. Add missing columns to customers
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "contactName" TEXT;
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "city" TEXT;
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "gstin" TEXT;
ALTER TABLE "customers" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'Active';

-- 4. Add missing columns to products
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "sku" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "description" TEXT;

-- 5. Add missing columns to plans
ALTER TABLE "plans" ADD COLUMN IF NOT EXISTS "code" TEXT;
ALTER TABLE "plans" ADD COLUMN IF NOT EXISTS "trialDays" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "plans" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'Live';

-- 6. Add missing columns to taxes
ALTER TABLE "taxes" ADD COLUMN IF NOT EXISTS "scope" TEXT NOT NULL DEFAULT 'Domestic';

-- 7. Add missing columns to discounts
ALTER TABLE "discounts" ADD COLUMN IF NOT EXISTS "code" TEXT;
ALTER TABLE "discounts" ADD COLUMN IF NOT EXISTS "description" TEXT;

-- 8. Add missing columns to subscriptions
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "autoRenew" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "trialDays" INTEGER NOT NULL DEFAULT 0;

-- 9. Add missing columns to invoices
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- 10. Add missing columns to quotations
ALTER TABLE "quotations" ADD COLUMN IF NOT EXISTS "ownerId" UUID;
ALTER TABLE "quotations" ADD COLUMN IF NOT EXISTS "total" DECIMAL(12,2) NOT NULL DEFAULT 0;
ALTER TABLE "quotations" ADD CONSTRAINT "quotations_ownerId_fkey" 
  FOREIGN KEY ("ownerId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 11. Create settings table
CREATE TABLE IF NOT EXISTS "settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "workspaceName" TEXT NOT NULL DEFAULT 'Brightloop',
    "supportEmail" TEXT NOT NULL DEFAULT 'support@brightloop.io',
    "companyName" TEXT NOT NULL DEFAULT 'Brightloop Software Pvt Ltd',
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "invoiceDueWindow" INTEGER NOT NULL DEFAULT 14,
    "invoicePrefix" TEXT NOT NULL DEFAULT 'BL',
    "billingRunTime" TEXT NOT NULL DEFAULT '02:00',
    "autoDunning" BOOLEAN NOT NULL DEFAULT true,
    "reminderDays" TEXT NOT NULL DEFAULT '3, 7, 14',
    "footerNote" TEXT NOT NULL DEFAULT 'Thank you for your business.',
    "gstin" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- 12. Create refunds table
CREATE TABLE IF NOT EXISTS "refunds" (
    "id" TEXT NOT NULL,
    "refundNumber" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "refunds" ADD CONSTRAINT "refunds_invoiceId_fkey" 
  FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_customerId_fkey" 
  FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE UNIQUE INDEX IF NOT EXISTS "refunds_refundNumber_key" ON "refunds"("refundNumber");

-- 13. Insert default settings row
INSERT INTO "settings" ("id", "workspaceName", "supportEmail", "companyName", "currency",
  "invoiceDueWindow", "invoicePrefix", "billingRunTime", "autoDunning", "reminderDays",
  "footerNote", "gstin", "address")
VALUES ('default', 'Brightloop', 'support@brightloop.io', 'Brightloop Software Pvt Ltd', 'INR',
  14, 'BL', '02:00', true, '3, 7, 14',
  'Thank you for your business. Payments processed securely. For support, contact support@brightloop.io',
  '27AABCB1234F1ZS', 'Office 14B, Infinity Tech Park, Malad West, Mumbai — 400 064')
ON CONFLICT ("id") DO NOTHING;
