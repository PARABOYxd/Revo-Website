"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] text-white py-20 px-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-[#FF5A1F] transition-colors mb-12">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>

        <h1 className="font-display text-4xl uppercase tracking-wide mb-8">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-6 font-mono">Last updated: July 13, 2026</p>

        <div className="space-y-6 text-sm text-white/60 leading-relaxed font-sans">
          <p>
            Welcome to Revo. By accessing our landing page, signing up for our waitlist, or interacting with our brand, you agree to comply with and be bound by the following terms of service.
          </p>

          <h2 className="font-display text-lg text-white mt-8 uppercase tracking-wide">1. Waitlist Terms</h2>
          <p>
            Joining the waitlist reserves a placement for early beta access. It does not guarantee immediate access to our mobile application, which will roll out gradually across India based on locality demand.
          </p>

          <h2 className="font-display text-lg text-white mt-8 uppercase tracking-wide">2. Founding Handles</h2>
          <p>
            User handles requested during waitlist or beta phases are subject to availability and verification. Revo reserves the right to reclaim, reassess, or transfer handles in the event of trademark infringement, squatting, or inappropriate behavior.
          </p>

          <h2 className="font-display text-lg text-white mt-8 uppercase tracking-wide">3. Code of Conduct</h2>
          <p>
            Revo is designed to build positive, healthy communities. Any attempt to exploit, manipulate, or spoof GPS location coordinates to inflate leaderboard rankings or streaks will result in immediate disqualification and waitlist suspension.
          </p>
        </div>
      </div>
    </main>
  );
}
