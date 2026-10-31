import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Brightloop - Subscription Billing & Revenue Management",
    template: "%s | Brightloop",
  },
  description:
    "Brightloop turns products and plans into recurring invoices, tracks payments and shows live revenue to admins, staff and customers, with access control enforced in the API and the database.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#06080e] text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
