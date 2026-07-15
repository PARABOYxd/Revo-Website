"use client";

import React, { useRef } from "react";
import { Users } from "lucide-react";
import CityMap from "@/components/CityMap";
import WaitlistForm from "@/components/WaitlistForm";
import { gsap, useGSAP } from "@/lib/gsap";
import { WAITLIST_BASE_COUNT } from "@/lib/config";
import { useCountUp } from "@/lib/useCountUp";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [waitlistCount, setWaitlistCount] = React.useState(WAITLIST_BASE_COUNT);
  const { ref: countRef, value } = useCountUp<HTMLSpanElement>(waitlistCount, 1400);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("revo_waitlist_signups");
      const signups = raw ? JSON.parse(raw) : [];
      setWaitlistCount(WAITLIST_BASE_COUNT + signups.length);
    } catch {
      // localStorage unavailable — keep the base count
    }
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(mapRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-fade", {
          opacity: 0,
          y: -36,
          ease: "power1.in",
          scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="grain relative min-h-[100svh] w-full overflow-hidden bg-[#1A1A2E]">
      <div ref={mapRef} className="absolute inset-0 h-[118%] w-full">
        <CityMap intensity={0.85} className="w-full h-full" />
        <div className="heat-bloom absolute top-[32%] left-[15%] w-[260px] h-[260px] rounded-full bg-[#FF5A1F] blur-[110px] opacity-40 pointer-events-none" />
        <div className="heat-bloom absolute bottom-[20%] right-[12%] w-[220px] h-[220px] rounded-full bg-[#FF5A1F] blur-[90px] opacity-30 pointer-events-none" style={{ animationDelay: "2.4s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(26,26,46,0.4)_0%,rgba(26,26,46,0.88)_60%,#1A1A2E_100%)]" />
      </div>

      <div className="hero-fade relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pt-24 pb-16 text-center">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#FF5A1F]/30 bg-[#FF5A1F]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8A5B]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5A1F] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF5A1F]" />
          </span>
          Live in Mumbai
        </span>

        <h1
          className="font-display uppercase text-white leading-[0.8] tracking-wide"
          style={{ fontSize: "clamp(58px, 13vw, 190px)" }}
        >
          Leave your
          <br />
          <span className="text-[#FF5A1F]" style={{ textShadow: "0 0 70px rgba(255,90,31,0.5)" }}>
            mark.
          </span>
        </h1>

        <p className="mt-7 max-w-md text-balance font-sans text-lg text-white/65 sm:text-xl">
          You showed up at 6&nbsp;AM. Nobody saw it.{" "}
          <span className="text-white font-medium">Until now.</span>
        </p>

        <div id="join" className="mt-9 w-full max-w-md scroll-mt-28">
          <WaitlistForm />
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-white/40">
          <Users className="w-3.5 h-3.5 text-[#FF5A1F]" />
          <span ref={countRef} className="tabular-nums text-white/80">{value.toLocaleString()}+</span>
          runners already on the list
        </p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">Scroll</span>
        <div className="h-7 w-px bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  );
}
