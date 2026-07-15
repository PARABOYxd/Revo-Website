"use client";

import React, { useRef, useState } from "react";
import { Flame, MapPin, Navigation, Users, Share2 } from "lucide-react";
import CityMap from "@/components/CityMap";
import PhoneFrame from "@/components/PhoneFrame";
import { gsap, useGSAP } from "@/lib/gsap";

const LEADERBOARD = [
  { name: "Kiran R.", days: 14, you: true },
  { name: "Anjali P.", days: 9, you: false },
  { name: "Vikram A.", days: 7, you: false },
];

const STEPS = [
  { label: "Run", desc: "Open Revo, hit start. Every step logs automatically — no watch required." },
  { label: "Map glows", desc: "The instant you finish, your neighbourhood's grid lights up." },
  { label: "Rank climbs", desc: "Hyperlocal leaderboards — your park, not the planet." },
  { label: "Streak grows", desc: "Consistency is the whole game. Miss a day, the city notices." },
];

function StatusBar() {
  return (
    <div className="absolute top-[3%] inset-x-0 h-9 z-40 flex items-center justify-between px-6 pointer-events-none">
      <span className="text-[8.5px] font-bold text-white">9:41</span>
      <span className="w-2.5 h-1.5 rounded-sm border border-white flex items-center px-0.5">
        <span className="w-full h-full bg-white rounded-2xs" />
      </span>
    </div>
  );
}

export default function TheTurn() {
  const container = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(phoneRef.current, { scale: 0.92 }, { scale: 1, duration: 1 }, 0);
        tl.fromTo(".turn-orbit-card", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.3);

        const bounds = [0, 0.5, 1.5, 2.5, 3.2];
        const screens = gsap.utils.toArray<HTMLElement>(".turn-screen");
        const segments = gsap.utils.toArray<HTMLElement>(".turn-segment");
        const captions = gsap.utils.toArray<HTMLElement>(".turn-caption");

        segments.forEach((seg, i) => {
          tl.fromTo(seg, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: bounds[i + 1] - bounds[i] }, bounds[i]);
        });

        for (let i = 0; i < screens.length - 1; i++) {
          tl.to(screens[i], { opacity: 0, duration: 0.35 }, bounds[i + 1]);
          tl.fromTo(screens[i + 1], { opacity: 0 }, { opacity: 1, duration: 0.35 }, "<");
          tl.to(captions[i], { opacity: 0, y: -10, duration: 0.35 }, "<");
          tl.fromTo(captions[i + 1], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 }, "<");
        }
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          phoneRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: pinRef.current, start: "top 82%", toggleActions: "play none none none" },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="w-full bg-[#1A1A2E]">
      <div className="mx-auto max-w-4xl px-5 pt-24 pb-10 text-center">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF5A1F]">The mechanic</p>
        <h2 className="font-display uppercase leading-[0.85] tracking-wide text-white" style={{ fontSize: "clamp(34px, 6.5vw, 84px)" }}>
          Run. Glow. Climb.
        </h2>
      </div>

      <div ref={pinRef} className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 lg:h-screen lg:py-0">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "42px 42px" }} />

        {/* Orbiting context cards (desktop) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="turn-orbit-card absolute rounded-2xl border border-white/10 bg-[#22223D]/90 px-4 py-3 shadow-xl" style={{ top: "18%", left: "8%" }}>
            <p className="text-[11px] font-bold text-white">Live Co-Presence</p>
            <p className="text-[9px] text-white/40">342 moving right now</p>
          </div>
          <div className="turn-orbit-card absolute rounded-2xl border border-white/10 bg-[#22223D]/90 px-4 py-3 shadow-xl" style={{ bottom: "22%", left: "10%" }}>
            <p className="text-[11px] font-bold text-white">Territory Battles</p>
            <p className="text-[9px] text-white/40">Defend your home turf</p>
          </div>
          <div className="turn-orbit-card absolute rounded-2xl border border-white/10 bg-[#22223D]/90 px-4 py-3 shadow-xl" style={{ top: "22%", right: "8%" }}>
            <p className="text-[11px] font-bold text-white">Zero Effort Tracking</p>
            <p className="text-[9px] text-white/40">No watch, no setup</p>
          </div>
          <div className="turn-orbit-card absolute rounded-2xl border border-white/10 bg-[#22223D]/90 px-4 py-3 shadow-xl" style={{ bottom: "20%", right: "10%" }}>
            <p className="text-[11px] font-bold text-white">Walkers Welcome</p>
            <p className="text-[9px] text-white/40">Pace never matters</p>
          </div>
        </div>

        {/* Story-style progress bar + caption */}
        <div className="relative z-20 mb-6 w-full max-w-[300px] px-5 lg:mb-8">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="turn-segment h-full w-full origin-left scale-x-0 bg-[#FF5A1F]" />
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-[54px]">
            {STEPS.map((s, i) => (
              <div key={s.label} className={`turn-caption absolute inset-0 text-center ${i === 0 ? "opacity-100" : "opacity-0"}`}>
                <p className="font-display text-xl uppercase tracking-wide text-white">{s.label}</p>
                <p className="mt-1 text-[11px] text-white/45 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div ref={phoneRef} className="relative z-10 h-auto w-[82vw] max-w-[320px] shrink-0 lg:h-[62vh] lg:max-h-[640px] lg:w-auto" style={{ aspectRatio: "1/2.05" }}>
          <PhoneFrame className="group relative h-full w-full">
            <div className="pointer-events-none absolute inset-0 z-50 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[60px] bg-[#FF5A1F] opacity-[0.15] blur-[80px]" />

            {/* Screen 0: Map */}
            <div className={`turn-screen absolute inset-0 bg-[#1A1A2E] transition-opacity duration-300 ${active === 0 ? "opacity-100" : "opacity-0"}`}>
              <CityMap intensity={1} />
              <StatusBar />
              <div className="absolute left-[5%] right-[5%] top-[12%] z-30 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 backdrop-blur">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#FF5A1F]" />
                <span className="text-[8.5px] font-bold text-white/50">Search hubs in Mumbai...</span>
              </div>
              <div className="absolute bottom-[18%] left-[5%] right-[5%] z-30 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#22223D] p-3.5 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-black text-white">Shivaji Park Hub</p>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#FF8A5B]">342 active now</p>
                  </div>
                  <span className="rounded-md bg-[#FF5A1F]/15 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-[#FF8A5B]">Rank #1</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-[#FF5A1F]" />
                </div>
              </div>
            </div>

            {/* Screen 1: Streak */}
            <div className={`turn-screen absolute inset-0 flex flex-col bg-[#1A1A2E] px-5 pb-[18%] pt-[14%] text-white transition-opacity duration-300 ${active === 1 ? "opacity-100" : "opacity-0"}`}>
              <StatusBar />
              <div className="mt-4 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-[#FF5A1F]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF8A5B]">Active Streak</span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-5">
                <div className="flex items-baseline justify-center">
                  <p className="font-black leading-none" style={{ fontSize: "64px" }}>14</p>
                  <span className="ml-1 text-[12px] font-black text-[#FF5A1F]">DAYS</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {[...Array(14)].map((_, i) => <div key={i} className="aspect-square rounded bg-[#FF5A1F] shadow-sm shadow-[#FF5A1F]/30" />)}
                  {[...Array(7)].map((_, i) => <div key={i} className="aspect-square rounded border border-white/10 bg-white/5" />)}
                </div>
              </div>
            </div>

            {/* Screen 2: Leaderboard */}
            <div className={`turn-screen absolute inset-0 flex flex-col bg-[#1A1A2E] px-5 pb-[18%] pt-[14%] text-white transition-opacity duration-300 ${active === 2 ? "opacity-100" : "opacity-0"}`}>
              <StatusBar />
              <div className="mt-4 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#FF5A1F]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF8A5B]">Shivaji Park</span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2 pt-3">
                {LEADERBOARD.map((r, i) => (
                  <div key={r.name} className={`flex items-center justify-between rounded-xl p-3 ${r.you ? "border border-[#FF5A1F]/30 bg-[#FF5A1F]/15" : "border border-white/10 bg-white/5"}`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-black ${r.you ? "bg-[#FF5A1F] text-[#1A1A2E]" : "bg-white/10 text-white"}`}>
                        {r.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <p className="text-[10px] font-black leading-tight">{r.name}</p>
                    </div>
                    <p className="text-[10px] font-black text-[#FF8A5B]">{r.days}d</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen 3: Share */}
            <div className={`turn-screen absolute inset-0 flex flex-col bg-[#1A1A2E] px-5 pb-[18%] pt-[14%] text-white transition-opacity duration-300 ${active === 3 ? "opacity-100" : "opacity-0"}`}>
              <StatusBar />
              <div className="mt-4 flex items-center gap-1.5">
                <Share2 className="h-4 w-4 text-[#FF5A1F]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF8A5B]">Weekly Recap</span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#FF5A1F] to-[#c73f10] p-4 shadow-lg">
                  <p className="text-[15px] font-black leading-tight">7-Day Recap</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-white/10 p-2 text-center"><p className="text-[13px] font-black">32.4</p><p className="mt-1 text-[6px] font-bold uppercase opacity-70">KM</p></div>
                    <div className="rounded-lg bg-white/10 p-2 text-center"><p className="text-[13px] font-black">7</p><p className="mt-1 text-[6px] font-bold uppercase opacity-70">Streak</p></div>
                    <div className="rounded-lg bg-white/10 p-2 text-center"><p className="text-[13px] font-black">#1</p><p className="mt-1 text-[6px] font-bold uppercase opacity-70">Rank</p></div>
                  </div>
                  <button className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1A1A2E] py-2 text-[8.5px] font-black uppercase tracking-widest text-white">
                    <Share2 className="h-3 w-3" /> Share card
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-40 flex h-12 items-center justify-around border-t border-white/10 bg-[#14141f]/90 px-2 backdrop-blur">
              <Navigation className="h-4 w-4 text-[#FF5A1F]" />
              <Flame className="h-4 w-4 text-white/30" />
              <MapPin className="h-4 w-4 text-white/30" />
              <Users className="h-4 w-4 text-white/30" />
            </div>
          </PhoneFrame>
        </div>

        {/* Mobile step selector */}
        <div className="z-20 mt-6 flex w-full max-w-[320px] gap-1.5 px-5 lg:hidden">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              className={`flex-1 rounded-full py-2 text-[9px] font-bold uppercase tracking-wide transition-colors ${active === i ? "bg-[#FF5A1F] text-[#1A1A2E]" : "bg-white/5 text-white/40"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
