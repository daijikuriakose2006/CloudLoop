-- ==============================================================================
-- Migration 003: Seed Demo Users
-- Creates Supabase Auth users + profile rows for the 4 demo accounts
-- Run in Supabase SQL Editor AFTER 002_schema_additions.sql
--
-- NOTE: This uses supabase_admin functions available in Supabase SQL editor.
-- All users get password: Brightloop@1
-- ==============================================================================

-- Helper: generate deterministic UUIDs for the 4 seed users
-- (Using md5-based UUIDs so they are predictable and idempotent)

-- 1. Create auth users via Supabase's built-in function
-- admin@brightloop.io
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, aud, role, created_at, updated_at,
  confirmation_token, recovery_token
) VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@brightloop.io',
  crypt('Brightloop@1', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User","role":"ADMIN"}',
  'authenticated', 'authenticated', NOW(), NOW(),
  '', ''
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  '{"sub":"a0000000-0000-0000-0000-000000000001","email":"admin@brightloop.io"}',
  'email',
  'admin@brightloop.io',
  NOW(), NOW(), NOW()
) ON CONFLICT (provider_id, provider) DO NOTHING;

-- staff@brightloop.io
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, aud, role, created_at, updated_at,
  confirmation_token, recovery_token
) VALUES (
  'a0000000-0000-0000-0000-000000000002'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'staff@brightloop.io',
  crypt('Brightloop@1', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Staff Member","role":"STAFF"}',
  'authenticated', 'authenticated', NOW(), NOW(),
  '', ''
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  'a0000000-0000-0000-0000-000000000002'::uuid,
  'a0000000-0000-0000-0000-000000000002'::uuid,
  '{"sub":"a0000000-0000-0000-0000-000000000002","email":"staff@brightloop.io"}',
  'email',
  'staff@brightloop.io',
  NOW(), NOW(), NOW()
) ON CONFLICT (provider_id, provider) DO NOTHING;

-- finance@brightloop.io
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, aud, role, created_at, updated_at,
  confirmation_token, recovery_token
) VALUES (
  'a0000000-0000-0000-0000-000000000003'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'finance@brightloop.io',
  crypt('Brightloop@1', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Finance Lead","role":"FINANCE"}',
  'authenticated', 'authenticated', NOW(), NOW(),
  '', ''
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  'a0000000-0000-0000-0000-000000000003'::uuid,
  'a0000000-0000-0000-0000-000000000003'::uuid,
  '{"sub":"a0000000-0000-0000-0000-000000000003","email":"finance@brightloop.io"}',
  'email',
  'finance@brightloop.io',
  NOW(), NOW(), NOW()
) ON CONFLICT (provider_id, provider) DO NOTHING;

-- customer@brightloop.io
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, aud, role, created_at, updated_at,
  confirmation_token, recovery_token
) VALUES (
  'a0000000-0000-0000-0000-000000000004'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'customer@brightloop.io',
  crypt('Brightloop@1', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Demo Customer","role":"CUSTOMER"}',
  'authenticated', 'authenticated', NOW(), NOW(),
  '', ''
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  'a0000000-0000-0000-0000-000000000004'::uuid,
  'a0000000-0000-0000-0000-000000000004'::uuid,
  '{"sub":"a0000000-0000-0000-0000-000000000004","email":"customer@brightloop.io"}',
  'email',
  'customer@brightloop.io',
  NOW(), NOW(), NOW()
) ON CONFLICT (provider_id, provider) DO NOTHING;

-- 2. Create matching profile rows
INSERT INTO "profiles" ("id", "email", "fullName", "role", "company", "city", "status", "updatedAt")
VALUES
  ('a0000000-0000-0000-0000-000000000001'::uuid, 'admin@brightloop.io', 'Admin User', 'ADMIN', 'Brightloop Software Pvt Ltd', 'Mumbai', 'Active', NOW()),
  ('a0000000-0000-0000-0000-000000000002'::uuid, 'staff@brightloop.io', 'Staff Member', 'STAFF', 'Brightloop Software Pvt Ltd', 'Mumbai', 'Active', NOW()),
  ('a0000000-0000-0000-0000-000000000003'::uuid, 'finance@brightloop.io', 'Finance Lead', 'FINANCE', 'Brightloop Software Pvt Ltd', 'Mumbai', 'Active', NOW()),
  ('a0000000-0000-0000-0000-000000000004'::uuid, 'customer@brightloop.io', 'Demo Customer', 'CUSTOMER', 'Demo Company', 'Bangalore', 'Active', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 3. Seed default tax rates
INSERT INTO "taxes" ("id", "name", "rate", "scope", "active", "createdAt")
VALUES
  ('tax-cgst-9', 'CGST 9%', 9.00, 'Domestic B2B', true, NOW()),
  ('tax-sgst-9', 'SGST 9%', 9.00, 'Domestic B2B', true, NOW()),
  ('tax-igst-18', 'IGST 18%', 18.00, 'Interstate B2B', true, NOW()),
  ('tax-cgst-6', 'CGST 6%', 6.00, 'Domestic B2C', true, NOW()),
  ('tax-sgst-6', 'SGST 6%', 6.00, 'Domestic B2C', true, NOW()),
  ('tax-zero', 'Export Zero-rated', 0.00, 'International', true, NOW())
ON CONFLICT ("id") DO NOTHING;
