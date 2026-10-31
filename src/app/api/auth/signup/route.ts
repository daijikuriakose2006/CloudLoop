import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/server";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1),
  role: z.enum(["ADMIN", "STAFF", "FINANCE", "CUSTOMER"]).default("CUSTOMER"),
  company: z.string().optional(),
  city: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid signup payload", details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, password, fullName, role, company, city } = result.data;

    // 1. Create auth user via Supabase Admin
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role,
          company_name: company,
        },
      });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // 2. Create profile row
    if (authData.user) {
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
          id: authData.user.id,
          email,
          fullName,
          role,
          company: company || "",
          city: city || "",
          status: "Active",
          updatedAt: new Date().toISOString(),
        });

      if (profileError) {
        console.error("Profile creation error:", profileError.message);
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authData.user?.id,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Internal server error during signup" },
      { status: 500 }
    );
  }
}
