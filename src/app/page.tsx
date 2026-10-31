import React from "react";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ContactSection } from "@/components/landing/contact-section";
import { MetricsBar } from "@/components/landing/metrics-bar";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProposedTargets } from "@/components/landing/proposed-targets";
import { StepsSection } from "@/components/landing/steps-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Floating Header */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Talk to the Brightloop team */}
        <ContactSection />

        {/* 4 Stats Metrics Bar */}
        <MetricsBar />

        {/* Built to automate every billing step */}
        <FeaturesGrid />

        {/* How Brightloop works */}
        <HowItWorks />

        {/* Proposed targets, measured not guessed */}
        <ProposedTargets />

        {/* Four steps to billing */}
        <StepsSection />

        {/* What Finance Leads Say */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Ready to automate your billing lifecycle */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
