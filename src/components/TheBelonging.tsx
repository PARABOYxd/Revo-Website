"use client";

import React, { useRef } from "react";
import { Flame, TrendingUp } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCountUp } from "@/lib/useCountUp";

const AREA_HEAT = [
  { area: "Bandra", note: "is heating up this week", trend: "+18%", rotate: "-rotate-2" },
  { area: "Shivaji Park", note: "has the highest density right now", trend: "342 active", rotate: "rotate-1" },
  { area: "Powai", note: "is climbing fastest today", trend: "+9%", rotate: "-rotate-1" },
];

const LIVE_LEDGER = [
  { r: "Rohan S.", a: "claimed Hub Leader at", z: "Shivaji Park", s: "14d", t: "2m ago" },
  { r: "Neha P.", a: "extended streak at", z: "Bandra Bandstand", s: "9d", t: "15m ago" },
  { r: "Vikram A.", a: "completed loop at", z: "Powai Lake", s: "21d", t: "1h ago" },
  { r: "Priya M.", a: "created first mark at", z: "Marine Drive", s: "1d", t: "2h ago" },
  { r: "Arjun K.", a: "secured top 3 ranking at", z: "Juhu Beach", s: "12d", t: "3h ago" },
  { r: "Ananya D.", a: "joined the grid at", z: "Carter Road", s: "1d", t: "4h ago" },
];

function StatCountUp({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp<HTMLParagraphElement>(target, 1600);
  return (
    <div>
      <p ref={ref} className="font-display text-4xl sm:text-5xl text-white tabular-nums">
        {value.toLocaleString()}{suffix}
      </p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">{label}</p>
    </div>
  );
}

export default function TheBelonging() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".belong-ledger-row",
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".belong-heat-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: container.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="grain relative w-full bg-[#14141f] py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF5A1F] mb-4">Already In Motion</p>
          <h2 className="font-display uppercase text-white leading-[0.9] tracking-wide" style={{ fontSize: "clamp(34px, 5vw, 64px)" }}>
            Mumbai is<br />lighting up.
          </h2>

          <div className="grid grid-cols-2 gap-8 mt-10 mb-12">
            <StatCountUp target={12400} suffix=" km" label="Logged this week" />
            <StatCountUp target={38} suffix="" label="Hub leaders crowned" />
          </div>

          <div className="space-y-4">
            {AREA_HEAT.map((h) => (
              <div
                key={h.area}
                className={`belong-heat-card ${h.rotate} bg-[#22223D] border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-xl hover:rotate-0 transition-transform duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FF5A1F]/15 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 text-[#FF5A1F]" />
                  </div>
                  <p className="text-sm text-white/80">
                    <span className="font-bold text-white">{h.area}</span> {h.note}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[#FF8A5B] text-xs font-bold tabular-nums shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" /> {h.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-4">Right Now</p>
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {LIVE_LEDGER.map((log, i) => (
              <div key={i} className="belong-ledger-row py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-sm sm:text-base">
                  <span className="font-bold text-white mr-2">{log.r}</span>
                  <span className="text-white/40 mr-2">{log.a}</span>
                  <span className="font-bold text-[#FF8A5B] uppercase tracking-wide text-xs">{log.z}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#FF5A1F]/15 text-[#FF8A5B] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md tabular-nums">{log.s} streak</span>
                  <span className="text-[9px] font-mono text-white/30 whitespace-nowrap">{log.t}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/30 mt-4 leading-relaxed max-w-md">
            Live check-ins from the community. All movement data is zone-anonymized to protect user privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
