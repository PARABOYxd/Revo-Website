"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] text-white py-20 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-[#FF5A1F] transition-colors mb-12">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>

        <h1 className="font-display text-4xl uppercase tracking-wide mb-8">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-6 font-mono">Last updated: July 13, 2026</p>

        <div className="space-y-6 text-sm text-white/60 leading-relaxed font-sans">
          <p>
            At Revo, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you join our waitlist or use our upcoming platform.
          </p>

          <h2 className="font-display text-lg text-white mt-8 uppercase tracking-wide">1. Information We Collect</h2>
          <p>
            When you sign up for the Revo waitlist, we collect your email address and neighbourhood area to keep you updated on our rollout progress in your region.
          </p>

          <h2 className="font-display text-lg text-white mt-8 uppercase tracking-wide">2. Location Data</h2>
          <p>
            Revo is a location-based movement platform. Once the app launches, we will request permission to access your device's high-precision GPS coordinates to capture your runs and display your mark on the live city maps. You will have full control over your privacy settings and visibility at all times.
          </p>

          <h2 className="font-display text-lg text-white mt-8 uppercase tracking-wide">3. How We Use Information</h2>
          <p>
            We use your contact information to manage your waitlist position, verify active founding member status, and send important launch updates. We will never sell or share your personal data with third parties.
          </p>
        </div>
      </div>
    </main>
  );
}
