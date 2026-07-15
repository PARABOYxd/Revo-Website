"use client";

import React, { useRef } from "react";
import { Flame, TrendingUp } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCountUp } from "@/lib/useCountUp";

const RANKS = [
  { area: "Shivaji Park", rank: 3, streak: 14, trend: "+18%", offset: "lg:-translate-y-4" },
  { area: "Bandra", rank: 1, streak: 21, trend: "+27%", offset: "lg:translate-y-3" },
  { area: "Powai", rank: 7, streak: 6, trend: "+9%", offset: "lg:-translate-y-2" },
];

const LIVE_FEED = [
  { r: "Rohan S.", a: "claimed Hub Leader at", z: "Shivaji Park", t: "2m" },
  { r: "Neha P.", a: "extended streak at", z: "Bandra Bandstand", t: "15m" },
  { r: "Vikram A.", a: "completed a loop at", z: "Powai Lake", t: "1h" },
  { r: "Priya M.", a: "made her first mark at", z: "Marine Drive", t: "2h" },
  { r: "Arjun K.", a: "hit top 3 at", z: "Juhu Beach", t: "3h" },
];

function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(target, 1500);
  return (
    <div className="flex items-baseline gap-2">
      <span ref={ref} className="font-display text-4xl text-white tabular-nums sm:text-5xl">
        {value.toLocaleString()}{suffix}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}

export default function TheBelonging() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".rank-card",
        { opacity: 0, y: 30, rotate: -2 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: container.current, start: "top 72%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".feed-row",
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".feed-list", start: "top 85%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="grain relative bg-[#14141f] px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF5A1F]">Already in motion</p>
            <h2 className="font-display uppercase leading-[0.85] tracking-wide text-white" style={{ fontSize: "clamp(32px, 5.5vw, 64px)" }}>
              Mumbai is<br />lighting up.
            </h2>
          </div>
          <div className="flex gap-8">
            <Stat target={12400} suffix=" km" label="This week" />
            <Stat target={38} suffix="" label="Hub leaders" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {RANKS.map((r) => (
            <div key={r.area} className={`rank-card ${r.offset} rounded-3xl border border-white/10 bg-[#20203a] p-6 shadow-xl`}>
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#FF8A5B]">
                  <TrendingUp className="h-3 w-3" /> {r.trend}
                </span>
                <Flame className="h-4 w-4 text-[#FF5A1F]" />
              </div>
              <p className="font-display text-5xl text-[#FF5A1F] leading-none">#{r.rank}</p>
              <p className="mt-2 text-sm text-white/80">
                in <span className="font-bold text-white">{r.area}</span> this week
              </p>
              <p className="mt-4 text-[11px] font-semibold text-white/35 tabular-nums">{r.streak}-day streak</p>
            </div>
          ))}
        </div>

        <div className="feed-list mt-14 divide-y divide-white/10 border-t border-white/10">
          {LIVE_FEED.map((log) => (
            <div key={`${log.r}-${log.z}`} className="feed-row flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/70">
                <span className="font-bold text-white">{log.r}</span> {log.a}{" "}
                <span className="font-bold uppercase tracking-wide text-[#FF8A5B]">{log.z}</span>
              </p>
              <span className="text-[10px] font-mono text-white/30">{log.t} ago</span>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-md text-[10px] leading-relaxed text-white/25">
          Live check-ins from the community. All movement data is zone-anonymized to protect user privacy.
        </p>
      </div>
    </section>
  );
}
