"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] px-5 py-20 font-sans text-white">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/35 transition-colors hover:text-[#FF5A1F]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>

        <h1 className="font-display text-4xl uppercase tracking-wide text-white">Privacy Policy</h1>
        <p className="mt-3 font-mono text-xs text-white/35">Last updated July 13, 2026</p>

        <div className="mt-10 space-y-7 text-sm leading-relaxed text-white/55">
          <p>At Revo, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you join the waitlist or use the upcoming platform.</p>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-wide text-white">Information we collect</h2>
            <p>When you sign up, we collect your email address and neighbourhood area to keep you updated on our rollout in your region.</p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-wide text-white">Location data</h2>
            <p>Revo is location-based. Once the app launches, we'll request GPS permission to capture your runs and light up your mark on the live map — with full control over your visibility at all times.</p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-wide text-white">How we use it</h2>
            <p>We use your contact info to manage your waitlist position, verify founding member status, and send launch updates. We never sell or share your data with third parties.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
