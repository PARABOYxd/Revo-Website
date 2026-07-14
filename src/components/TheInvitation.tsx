"use client";

import React, { useRef } from "react";
import { Lock, Flame } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import { gsap, useGSAP } from "@/lib/gsap";
import { EARLY_ACCESS_SPOTS_TOTAL } from "@/lib/config";

export default function TheInvitation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".invite-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="waitlist"
      className="grain relative min-h-screen flex flex-col justify-center items-center bg-[#1A1A2E] overflow-hidden py-24"
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="heat-bloom absolute top-[15%] left-[12%] w-[45%] aspect-square bg-[#FF5A1F] rounded-full blur-[160px] opacity-[0.1] pointer-events-none" />
      <div className="heat-bloom absolute bottom-[15%] right-[12%] w-[40%] aspect-square bg-[#FF5A1F] rounded-full blur-[160px] opacity-[0.08] pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative z-20 w-full max-w-2xl px-6 text-center flex flex-col items-center">
        <div className="invite-reveal inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 px-4 py-2 rounded-full mb-8">
          <Lock className="w-2.5 h-2.5 text-[#FF5A1F]" />
          <span className="text-[#FF8A5B] text-[9px] font-bold uppercase tracking-[0.2em] font-sans">Founding Members Waitlist</span>
        </div>

        <h2 className="invite-reveal font-display uppercase text-white leading-[0.9] tracking-wide text-balance mb-4" style={{ fontSize: "clamp(36px, 6.5vw, 88px)" }}>
          Launching first<br />in <span className="text-[#FF5A1F]">Mumbai.</span>
        </h2>

        <p className="invite-reveal text-white/50 text-sm sm:text-base max-w-md mb-4 leading-relaxed">
          Founding Runners get a permanent badge, first access to every new neighbourhood, and a head start on the leaderboard.
        </p>

        <p className="invite-reveal flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-10 tabular-nums">
          <Flame className="w-3 h-3 text-[#FF5A1F]" />
          Only {EARLY_ACCESS_SPOTS_TOTAL.toLocaleString()} founding spots left in early access
        </p>

        <div className="invite-reveal w-full max-w-lg bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 lg:p-8 shadow-2xl">
          <WaitlistForm />
          <p className="text-[8px] text-white/30 text-center mt-5 uppercase tracking-widest font-semibold leading-normal">
            Reserve your handle · Founding Runner badge · Early beta access
          </p>
        </div>
      </div>
    </section>
  );
}
