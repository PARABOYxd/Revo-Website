"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] px-5 py-20 font-sans text-white">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/35 transition-colors hover:text-[#FF5A1F]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>

        <h1 className="font-display text-4xl uppercase tracking-wide text-white">Terms of Service</h1>
        <p className="mt-3 font-mono text-xs text-white/35">Last updated July 13, 2026</p>

        <div className="mt-10 space-y-7 text-sm leading-relaxed text-white/55">
          <p>Welcome to Revo. By accessing this page, joining the waitlist, or interacting with our brand, you agree to the following terms.</p>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-wide text-white">Waitlist terms</h2>
            <p>Joining the waitlist reserves a placement for early beta access. It doesn't guarantee immediate app access, which rolls out gradually across Mumbai based on locality demand.</p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-wide text-white">Founding handles</h2>
            <p>Handles requested during waitlist or beta are subject to availability and verification. Revo may reclaim or reassign handles in cases of trademark infringement, squatting, or abuse.</p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-wide text-white">Code of conduct</h2>
            <p>Revo builds positive, healthy communities. Any attempt to spoof GPS to inflate rankings or streaks results in immediate disqualification and suspension.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
