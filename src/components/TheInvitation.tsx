"use client";

import React, { useRef } from "react";
import { Flame } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import { gsap, useGSAP } from "@/lib/gsap";
import { EARLY_ACCESS_SPOTS_TOTAL } from "@/lib/config";
import { useCountUp } from "@/lib/useCountUp";

export default function TheInvitation() {
  const container = useRef<HTMLDivElement>(null);
  const { ref: spotsRef, value: spots } = useCountUp<HTMLSpanElement>(EARLY_ACCESS_SPOTS_TOTAL, 1300);

  useGSAP(
    () => {
      gsap.fromTo(
        ".invite-reveal",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} id="waitlist-final" className="grain relative overflow-hidden bg-[#1A1A2E] px-5 py-28 sm:py-36">
      <div className="pointer-events-none absolute left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#FF5A1F] opacity-[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-[8%] h-[360px] w-[360px] rounded-full bg-[#FF5A1F] opacity-[0.06] blur-[150px]" />

      <div className="relative mx-auto flex max-w-lg flex-col items-center text-center">
        <span className="invite-reveal mb-6 rounded-full border border-[#FF5A1F]/30 bg-[#FF5A1F]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8A5B]">
          Founding Runners
        </span>

        <h2 className="invite-reveal font-display uppercase leading-[0.85] tracking-wide text-white" style={{ fontSize: "clamp(38px, 7vw, 92px)" }}>
          Launching first<br />in <span className="text-[#FF5A1F]">Mumbai.</span>
        </h2>

        <p className="invite-reveal mt-5 max-w-sm text-sm leading-relaxed text-white/50">
          Founding Runners get a permanent badge, first access to every new neighbourhood, and a head start on the leaderboard.
        </p>

        <p className="invite-reveal mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/40">
          <Flame className="h-3 w-3 text-[#FF5A1F]" />
          Only <span ref={spotsRef} className="tabular-nums text-[#FF8A5B]">{spots.toLocaleString()}</span> founding spots left
        </p>

        <div className="invite-reveal mt-10 w-full">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
