"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, Mail, Loader2, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    }, 800);
  };

  const handleDemoLogin = (role: string) => {
    setEmail(
      role === "Admin"
        ? "admin@brightloop.com"
        : role === "Staff"
        ? "staff@brightloop.com"
        : "customer@company.com"
    );
    setPassword("password123");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800/90 bg-[#0c101c] p-8 shadow-2xl backdrop-blur-md relative">
      {/* Top Brand & Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <Link href="/" className="flex items-center gap-2.5 group mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7dd3fc] text-[#0a0e1a] font-black text-xl shadow-md group-hover:bg-[#38bdf8] transition-colors">
            B
          </div>
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
            Brightloop
          </span>
        </Link>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-slate-400">
          {mode === "login"
            ? "Enter your credentials to access your billing dashboard."
            : "Get started with automated subscription billing."}
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 rounded-xl bg-slate-900/90 p-1 mb-6 border border-slate-800/80">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setSuccess(false);
          }}
          className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            mode === "login"
              ? "bg-[#0c101c] text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setSuccess(false);
          }}
          className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            mode === "signup"
              ? "bg-[#0c101c] text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sign up
        </button>
      </div>

      {success ? (
        <div className="py-8 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-3 animate-in zoom-in-75">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            {mode === "login" ? "Authenticated" : "Account Created"}
          </h3>
          <p className="text-xs text-slate-400">Redirecting to dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="signup-company"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Company name
              </label>
              <input
                id="signup-company"
                type="text"
                required
                placeholder="Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-[#080b13] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email"
              className="block text-xs font-semibold text-slate-300 mb-1.5"
            >
              Work email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="auth-email"
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-[#080b13] pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="auth-password"
                className="block text-xs font-semibold text-slate-300"
              >
                Password
              </label>
              {mode === "login" && (
                <Link
                  href="/forgot-password"
                  className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="auth-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-[#080b13] pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#7dd3fc] py-3 text-sm font-bold text-[#0a0e1a] shadow-lg shadow-sky-500/20 hover:bg-[#67e8f9] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === "login" ? (
              "Log in to Brightloop"
            ) : (
              "Create account"
            )}
          </button>
        </form>
      )}

      {/* Demo Quick Logins */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <div className="text-center text-[11px] font-semibold tracking-wider uppercase text-slate-500 mb-3">
          Or Quick Test Roles
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin("Admin")}
            className="rounded-lg border border-slate-800 bg-slate-900/60 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("Staff")}
            className="rounded-lg border border-slate-800 bg-slate-900/60 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            Staff
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin("Customer")}
            className="rounded-lg border border-slate-800 bg-slate-900/60 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            Customer
          </button>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Brightloop home</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#06080e] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-grid-cyan">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <Suspense fallback={<div className="text-slate-400 text-sm">Loading login...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
