import { z } from "zod";

// ─── Reusable Field Schemas ────────────────────────────────────────────────────
// Define common field validators once and compose them into form schemas.

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters");

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .trim();

// ─── Example Form Schema ───────────────────────────────────────────────────────
// Replace this with your own schemas as you build features.

export const exampleFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});

export type ExampleFormValues = z.infer<typeof exampleFormSchema>;
