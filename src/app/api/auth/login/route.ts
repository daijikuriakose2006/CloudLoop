import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, storeSession } from "@/lib/redis/client";
import { supabaseAdmin } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(["Admin", "Finance Lead", "Staff Account", "Customer"]).optional(),
});

// Map DB role enum to client role names
const roleMap: Record<string, string> = {
  ADMIN: "Admin",
  FINANCE: "Finance Lead",
  STAFF: "Staff Account",
  CUSTOMER: "Customer",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid login payload", details: result.error.errors },
        { status: 400 }
      );
    }

    const { email, password, role: clientRole } = result.data;

    // 1. Redis Rate Limiting Check
    const rateLimit = await checkRateLimit(email, 10, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Please wait a minute before retrying.",
        },
        { status: 429 }
      );
    }

    // 2. Supabase Auth attempt
    let supabaseUserId: string | null = null;
    let dbRole: string | null = null;

    try {
      const { data: authData, error: authError } =
        await supabaseAdmin.auth.signInWithPassword({
          email,
          password,
        });

      if (!authError && authData.user) {
        supabaseUserId = authData.user.id;

        // 3. Fetch role from profiles table
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("role, fullName")
          .eq("id", authData.user.id)
          .single();

        if (profile) {
          dbRole = roleMap[profile.role] || "Customer";
        }
      }
    } catch {
      // Continue with client-selected role if Supabase auth fails
    }

    // Use DB role if available, otherwise fall back to client selection
    const resolvedRole = dbRole || clientRole || "Customer";

    // 4. Create Redis Session Token
    const sessionToken = `bl_sess_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const signedInAt = new Date().toISOString();

    await storeSession(sessionToken, {
      email,
      role: resolvedRole,
      fullName: email.split("@")[0],
      signedInAt,
    });

    // 5. Determine redirect path based on resolved role
    let redirectPath = "/app/customer";
    switch (resolvedRole) {
      case "Admin":
        redirectPath = "/app/admin";
        break;
      case "Finance Lead":
        redirectPath = "/app/finance";
        break;
      case "Staff Account":
        redirectPath = "/app/staff";
        break;
      case "Customer":
      default:
        redirectPath = "/app/customer";
        break;
    }

    // 6. Return response with session cookie and data
    const response = NextResponse.json({
      success: true,
      user: {
        id: supabaseUserId || sessionToken,
        email,
        role: resolvedRole,
      },
      sessionToken,
      redirectPath,
    });

    response.cookies.set({
      name: "brightloop_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
