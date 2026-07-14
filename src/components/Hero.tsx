"use client";

import React, { useRef } from "react";
import { Globe, Users } from "lucide-react";
import CityMap from "@/components/CityMap";
import WaitlistForm from "@/components/WaitlistForm";
import { gsap, useGSAP } from "@/lib/gsap";
import { WAITLIST_BASE_COUNT } from "@/lib/config";
import { useCountUp } from "@/lib/useCountUp";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [waitlistCount, setWaitlistCount] = React.useState(WAITLIST_BASE_COUNT);
  const { ref: countRef, value } = useCountUp<HTMLParagraphElement>(waitlistCount, 1400);

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
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-content", {
          opacity: 0,
          y: -40,
          ease: "power1.in",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="grain relative min-h-screen w-full overflow-hidden bg-[#1A1A2E] flex items-center justify-center"
    >
      {/* Map + heat layer */}
      <div ref={mapRef} className="absolute inset-0 w-full h-[115%]">
        <CityMap intensity={0.9} className="w-full h-full" />
        <div className="heat-bloom absolute top-[38%] left-[18%] w-[280px] h-[280px] rounded-full bg-[#FF5A1F] blur-[100px] opacity-40 pointer-events-none" />
        <div className="heat-bloom absolute top-[55%] right-[15%] w-[220px] h-[220px] rounded-full bg-[#FF5A1F] blur-[90px] opacity-30 pointer-events-none" style={{ animationDelay: "2s" }} />
        {/* Vignette for text legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,26,46,0.55)_10%,rgba(26,26,46,0.85)_65%,rgba(26,26,46,0.97)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-[#1A1A2E]/40 pointer-events-none" />
      </div>

      <div className="hero-content relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF8A5B] text-[9.5px] font-black uppercase tracking-widest mb-8 animate-pulse">
          <Globe className="w-3.5 h-3.5" /> Mumbai's Live Active Grid
        </span>

        <h1
          className="font-display text-white leading-[0.82] tracking-wide uppercase"
          style={{ fontSize: "clamp(56px, 12vw, 176px)" }}
        >
          Leave your<br />
          <span className="text-[#FF5A1F]" style={{ textShadow: "0 0 60px rgba(255,90,31,0.45)" }}>mark.</span>
        </h1>

        <p className="mt-8 font-sans text-lg sm:text-xl max-w-lg text-white/70 text-balance leading-snug">
          You showed up at 6&nbsp;AM. Nobody saw it.{" "}
          <span className="italic text-white">Until now.</span>
        </p>

        <div id="hero-waitlist" className="mt-10 w-full max-w-sm scroll-mt-32">
          <WaitlistForm />
        </div>

        <p ref={countRef} className="mt-5 flex items-center gap-1.5 text-[11px] font-bold text-white/50">
          <Users className="w-3.5 h-3.5 text-[#FF5A1F]" />
          Join <span className="tabular-nums text-white">{value.toLocaleString()}+</span> runners already on the list
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
