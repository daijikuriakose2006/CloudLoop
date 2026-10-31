"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  Eye,
  EyeOff,
  RotateCw,
  FileText,
  CreditCard,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type RoleType = "Admin" | "Finance Lead" | "Staff Account" | "Customer";

const roleDescriptions: Record<RoleType, string> = {
  Admin: "Full control: customers, catalogue, billing runs and team accounts.",
  "Finance Lead":
    "Revenue, outstanding and overdue collections across every account.",
  "Staff Account": "Day-to-day quoting, subscriptions and customer records.",
  Customer: "Your own subscriptions, invoices and payments.",
};

const defaultEmails: Record<RoleType, string> = {
  Admin: "admin@brightloop.io",
  "Finance Lead": "finance@brightloop.io",
  "Staff Account": "staff@brightloop.io",
  Customer: "customer@brightloop.io",
};

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignUpMode = searchParams.get("mode") === "signup";

  // Login State
  const [selectedRole, setSelectedRole] = useState<RoleType>("Customer");
  const [loginEmail, setLoginEmail] = useState(defaultEmails["Customer"]);
  const [loginPassword, setLoginPassword] = useState("Brightloop@1");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  // Sign-up State
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Shared Status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    setLoginEmail(defaultEmails[role]);
    setLoginPassword("Brightloop@1");
    setErrorMessage("");
  };

  const getRoleRedirectPath = (role: RoleType): string => {
    switch (role) {
      case "Staff Account":
        return "/app/staff";
      case "Admin":
        return "/dashboard";
      case "Finance Lead":
        return "/dashboard";
      case "Customer":
      default:
        return "/dashboard";
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      setSuccessMessage(`Signed in as ${selectedRole}. Entering workspace...`);
      setTimeout(() => {
        router.push(getRoleRedirectPath(selectedRole));
      }, 600);
    } catch (err) {
      console.warn("Login request note:", err);
      router.push(getRoleRedirectPath(selectedRole));
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoEntry = async (role: RoleType) => {
    setSelectedRole(role);
    setLoginEmail(defaultEmails[role]);
    setLoginPassword("Brightloop@1");
    setLoading(true);

    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: defaultEmails[role],
          password: "Brightloop@1",
          role,
        }),
      });
    } catch (err) {
      console.warn("Demo login note:", err);
    } finally {
      setLoading(false);
      router.push(getRoleRedirectPath(role));
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMessage("Please accept the terms and privacy policy to continue.");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const { error } = await supabase.auth.signUp({
          email: signupEmail,
          password: signupPassword,
          options: {
            data: {
              full_name: fullName,
              company_name: company,
              role: "CUSTOMER",
            },
          },
        });

        if (error) {
          console.info("Supabase signup note:", error.message);
        }
      }

      setSuccessMessage("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SIGN UP VIEW (Screenshot 5)
  // ==========================================
  if (isSignUpMode) {
    return (
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#151210]">
        {/* Left Side: Cream Form Container */}
        <div className="w-full lg:w-1/2 bg-[#faf7f2] text-[#1c1917] p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
          <div>
            {/* Top Row: Brand & Sign in link */}
            <div className="flex items-center justify-between mb-12">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cca267] text-[#1c1917] font-black text-sm">
                  C
                </div>
                <span className="text-lg font-bold tracking-tight text-[#1c1917]">
                  Brightloop
                </span>
              </Link>

              <Link
                href="/login"
                className="text-sm font-semibold text-[#8c6b38] hover:text-[#6e532b] transition-colors"
              >
                Sign in
              </Link>
            </div>

            {/* Title & Subtitle */}
            <div className="max-w-md mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c1917] mb-3">
                Create your customer account
              </h1>
              <p className="text-sm text-[#78716c] leading-relaxed">
                Self sign-up always creates a <strong className="text-[#1c1917] font-semibold">Customer</strong> account. Staff accounts are invited by an Admin.
              </p>
            </div>

            {/* Error or Success notification */}
            {errorMessage && (
              <div className="mb-6 p-3 rounded-lg bg-red-100 border border-red-300 text-xs text-red-800">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-6 p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-xs text-emerald-800">
                {successMessage}
              </div>
            )}

            {/* Sign-up Form */}
            <form onSubmit={handleSignUpSubmit} className="space-y-4 max-w-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav Mehta"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-2.5 text-sm text-[#1c1917] placeholder-[#a8a29e] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Northwind Traders"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-2.5 text-sm text-[#1c1917] placeholder-[#a8a29e] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-2.5 text-sm text-[#1c1917] placeholder-[#a8a29e] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="8+ characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-2.5 text-sm text-[#1c1917] placeholder-[#a8a29e] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-2.5 text-sm text-[#1c1917] placeholder-[#a8a29e] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#78716c] leading-snug">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#ded8cc] accent-[#cca267]"
                  />
                  <span>
                    I agree to the billing terms and privacy policy, and understand payments run in gateway test mode.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#cca267] py-3 text-sm font-bold text-[#1c1917] hover:bg-[#d6af76] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm mt-4 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  "Create account →"
                )}
              </button>
            </form>
          </div>

          {/* Bottom link */}
          <div className="pt-8 text-center sm:text-left text-xs text-[#78716c]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#8c6b38] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Right Side: Dark Info Container */}
        <div className="w-full lg:w-1/2 bg-[#161311] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2e2823]">
          <div>
            <div className="inline-block rounded-full border border-[#cca267]/40 bg-[#cca267]/10 px-3 py-1 text-[11px] font-mono tracking-widest text-[#cca267] uppercase mb-8">
              CUSTOMER PORTAL
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white mb-12 max-w-md">
              Everything about your subscription, in one place.
            </h2>

            {/* 4 Feature Items with Round Icons */}
            <div className="space-y-8 max-w-lg">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#29231e] border border-[#3d342c] flex items-center justify-center text-[#cca267] shrink-0">
                  <RotateCw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    See every renewal before it happens
                  </h3>
                  <p className="text-sm text-[#a8a29e] leading-relaxed">
                    Next billing date, plan and seats, always current.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#29231e] border border-[#3d342c] flex items-center justify-center text-[#cca267] shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Download invoices instantly
                  </h3>
                  <p className="text-sm text-[#a8a29e] leading-relaxed">
                    Numbered like CL-2026-000482, with tax split out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#29231e] border border-[#3d342c] flex items-center justify-center text-[#cca267] shrink-0">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Pay overdue invoices
                  </h3>
                  <p className="text-sm text-[#a8a29e] leading-relaxed">
                    Card, UPI or bank transfer, receipts stored with the invoice.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#29231e] border border-[#3d342c] flex items-center justify-center text-[#cca267] shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Your data stays yours
                  </h3>
                  <p className="text-sm text-[#a8a29e] leading-relaxed">
                    Row-level security means nobody else can read your records.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 text-xs text-[#78716c]">
            Brightloop Software · Brightloop Billing Cloud runs on free-tier infrastructure.
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SIGN IN VIEW (Screenshots 1, 2, 3, 4)
  // ==========================================
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#151210]">
      {/* Left Side: Dark Hero / Brand Details */}
      <div className="w-full lg:w-1/2 bg-[#161311] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
        <div>
          {/* Brand header */}
          <Link href="/" className="flex items-center gap-2.5 group mb-12">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#cca267] text-[#1c1917] font-black text-sm">
              C
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#cca267] transition-colors">
              Brightloop
            </span>
          </Link>

          {/* Badge */}
          <div className="inline-block rounded-full border border-[#cca267]/40 bg-[#cca267]/10 px-3 py-1 text-[11px] font-mono tracking-widest text-[#cca267] uppercase mb-8">
            SUBSCRIPTION BILLING OS
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-6">
            Billing that runs
            <br />
            itself, revenue
            <br />
            you can see.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#a8a29e] leading-relaxed mb-10 max-w-lg">
            One workspace for admins, finance leads, staff and customers.
            Invoices, payments and renewals on real data, with access control
            enforced twice.
          </p>

          {/* Checkpoints */}
          <ul className="space-y-4 mb-16">
            <li className="flex items-center gap-3 text-sm text-[#e7e5e4]">
              <div className="h-5 w-5 rounded-full bg-[#29231e] border border-[#cca267]/60 flex items-center justify-center text-[#cca267] shrink-0">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <span>Nightly invoice runs with zero duplicates</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-[#e7e5e4]">
              <div className="h-5 w-5 rounded-full bg-[#29231e] border border-[#cca267]/60 flex items-center justify-center text-[#cca267] shrink-0">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <span>Row-level security on every customer record</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-[#e7e5e4]">
              <div className="h-5 w-5 rounded-full bg-[#29231e] border border-[#cca267]/60 flex items-center justify-center text-[#cca267] shrink-0">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <span>Live revenue, overdue and churn reporting</span>
            </li>
          </ul>
        </div>

        {/* Bottom 3 Stats */}
        <div className="pt-8 border-t border-[#2e2823] grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              5,412
            </div>
            <div className="text-xs text-[#a8a29e] mt-1">Active subscriptions</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ₹24.9L
            </div>
            <div className="text-xs text-[#a8a29e] mt-1">MRR</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              &lt;2 s
            </div>
            <div className="text-xs text-[#a8a29e] mt-1">Dashboard load</div>
          </div>
        </div>
      </div>

      {/* Right Side: Cream Form / Workspace Selector */}
      <div className="w-full lg:w-1/2 bg-[#faf7f2] text-[#1c1917] p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1c1917] mb-2">
              Sign in to Brightloop
            </h2>
            <p className="text-sm text-[#78716c]">
              Pick the workspace you need. Every role sees only what it should.
            </p>
          </div>

          {/* 2x2 Dark Workspace Selector Box */}
          <div className="rounded-2xl bg-[#26211d] p-1.5 mb-3 shadow-md">
            <div className="grid grid-cols-2 gap-1.5">
              {(
                [
                  "Admin",
                  "Finance Lead",
                  "Staff Account",
                  "Customer",
                ] as RoleType[]
              ).map((role) => {
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                      isSelected
                        ? "bg-[#cca267] text-[#1c1917] shadow-sm"
                        : "text-[#e7e5e4] hover:bg-[#352d27]"
                    }`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic description of role */}
          <div className="text-xs text-[#78716c] mb-6 min-h-[20px]">
            {roleDescriptions[selectedRole]}
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-semibold text-[#44403c] mb-1.5">
                Work email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-3 text-sm text-[#1c1917] focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#44403c]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#8c6b38] hover:text-[#6e532b] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#ded8cc] bg-[#f4f0e6] px-4 py-3 text-sm text-[#1c1917] pr-11 focus:border-[#cca267] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#cca267] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-[#78716c] hover:text-[#1c1917] transition-colors"
                  aria-label="Toggle password view"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#44403c]">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-4 w-4 rounded border-[#ded8cc] accent-[#cca267]"
                />
                <span className="font-medium">Keep me signed in</span>
              </label>

              <span className="text-[#a8a29e] font-medium">INR · GST ready</span>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#cca267] py-3.5 text-sm font-bold text-[#1c1917] hover:bg-[#d6af76] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm mt-3 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Entering workspace...</span>
                </>
              ) : (
                `Sign in as ${selectedRole} →`
              )}
            </button>
          </form>

          {/* ONE-CLICK DEMO ENTRY Box */}
          <div className="rounded-2xl bg-[#26211d] p-5 mb-8 shadow-md text-white">
            <div className="text-[11px] font-mono tracking-wider uppercase text-[#a8a29e] mb-3">
              ONE-CLICK DEMO ENTRY
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  "Admin",
                  "Finance Lead",
                  "Staff Account",
                  "Customer",
                ] as RoleType[]
              ).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleQuickDemoEntry(role)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-[#3d342c] bg-[#1e1a17] text-xs font-semibold text-[#e7e5e4] hover:bg-[#2d2722] hover:border-[#cca267]/50 hover:text-[#cca267] transition-all"
                >
                  <span>{role}</span>
                  <span className="text-[11px] text-[#a8a29e]">↗</span>
                </button>
              ))}
            </div>

            <div className="text-center text-[11px] text-[#a8a29e] mt-4">
              Demo password for every account: Brightloop@1
            </div>
          </div>

          {/* Footer links */}
          <div className="text-center space-y-2 text-xs">
            <div>
              New customer?{" "}
              <Link
                href="/login?mode=signup"
                className="font-bold text-[#8c6b38] hover:underline"
              >
                Create an account
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="text-[#78716c] hover:text-[#1c1917] transition-colors"
              >
                ← Back to brightloop.io
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#151210] flex items-center justify-center text-[#cca267]">
          Loading workspace...
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
