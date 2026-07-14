"use client";

import React, { useRef, useState } from "react";
import { Flame, MapPin, Navigation, Users, Share2 } from "lucide-react";
import CityMap from "@/components/CityMap";
import PhoneFrame from "@/components/PhoneFrame";
import { gsap, useGSAP } from "@/lib/gsap";

const LEADERBOARD_DATA = [
  { name: "Kiran R.", days: 14, you: true },
  { name: "Anjali P.", days: 9, you: false },
  { name: "Vikram A.", days: 7, you: false },
];

const STEPS = [
  { n: "01", label: "Run", desc: "Open Revo, hit start. Every step is logged automatically — no watch required." },
  { n: "02", label: "The map glows", desc: "Your session lights up your neighbourhood's live grid the moment you finish." },
  { n: "03", label: "Your rank climbs", desc: "Hyperlocal leaderboards — your park, not the planet. Show up, move up." },
  { n: "04", label: "Your streak grows", desc: "Consistency becomes your identity. Miss a day and the city notices." },
];

export default function TheTurn() {
  const container = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(phoneRef.current, { scale: 0.9, y: "4vh" }, { scale: 1, y: "0vh", duration: 1 }, 0);

        const paths = gsap.utils.toArray<SVGPathElement>(".connector-path");
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 0.2);
        });
        tl.fromTo(".connector-dot", { opacity: 0, scale: 0 }, { opacity: 0.9, scale: 1, duration: 0.4, stagger: 0.1 }, 0.6);
        tl.fromTo(".turn-card", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.4);

        const screens = gsap.utils.toArray(".turn-screen");
        const captions = gsap.utils.toArray(".turn-caption");

        tl.to(screens[0] as Element, { opacity: 0, duration: 0.4 }, 0.5)
          .fromTo(screens[1] as Element, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<")
          .to(screens[1] as Element, { opacity: 0, duration: 0.4 }, 1.5)
          .fromTo(screens[2] as Element, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<")
          .to(screens[2] as Element, { opacity: 0, duration: 0.4 }, 2.5)
          .fromTo(screens[3] as Element, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<");

        tl.to(captions[0] as Element, { opacity: 0, y: -12, duration: 0.4 }, 0.5)
          .fromTo(captions[1] as Element, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "<")
          .to(captions[1] as Element, { opacity: 0, y: -12, duration: 0.4 }, 1.5)
          .fromTo(captions[2] as Element, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "<")
          .to(captions[2] as Element, { opacity: 0, y: -12, duration: 0.4 }, 2.5)
          .fromTo(captions[3] as Element, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "<");
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          phoneRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="w-full bg-[#1A1A2E]">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
        <p className="text-[10px] text-[#FF5A1F] font-bold uppercase tracking-[0.3em] mb-3">The Mechanic</p>
        <h2 className="font-display uppercase text-white leading-[0.9] tracking-wide" style={{ fontSize: "clamp(32px, 6vw, 76px)" }}>
          Run. Glow. Climb. Repeat.
        </h2>
      </div>

      <div ref={showcaseRef} className="w-full relative overflow-hidden flex flex-col justify-start lg:justify-center py-6 lg:py-10 lg:h-screen">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative w-full lg:flex-1 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center z-20 min-h-0 py-4 lg:py-0 gap-10 lg:gap-0">

          {/* Step captions (Desktop, left column) */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[320px] pointer-events-none">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`turn-caption absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}>
                <span className="font-mono text-[#FF5A1F] text-xs font-bold tracking-widest">{s.n}</span>
                <h3 className="font-display text-white uppercase tracking-wide leading-none mt-3 mb-4" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
                  {s.label}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-[280px]">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* SVG Connectors (Desktop only) */}
          <svg viewBox="0 0 1200 700" className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow-dot" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g stroke="#FF5A1F" strokeWidth="1" strokeOpacity="0.3" fill="none">
              <path className="connector-path" d="M 600,350 Q 800,160 920,160" />
              <path className="connector-path" d="M 600,350 Q 900,350 950,350" />
              <path className="connector-path" d="M 600,350 Q 850,560 900,560" />
            </g>
            <g fill="#FF5A1F" filter="url(#glow-dot)" className="hidden lg:block">
              <circle className="connector-dot" cx="920" cy="160" r="2.5" />
              <circle className="connector-dot" cx="950" cy="350" r="2.5" />
              <circle className="connector-dot" cx="900" cy="560" r="2.5" />
            </g>
          </svg>

          {/* Desktop Floating Cards */}
          <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto hidden lg:block pointer-events-none">
            <div className="turn-card absolute" style={{ top: 'calc(50% - 190px)', left: 'calc(50% + 320px)' }}>
              <div className="bg-[#22223D] border border-white/10 rounded-[24px] shadow-xl px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#FF5A1F]/15 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white leading-none mb-1.5">Live Co-Presence</p>
                  <p className="text-[10px] text-white/40 font-medium tracking-wide">See active movers real-time</p>
                </div>
              </div>
            </div>
            <div className="turn-card absolute" style={{ top: 'calc(50% - 0px)', left: 'calc(50% + 350px)' }}>
              <div className="bg-[#22223D] border border-white/10 rounded-[24px] shadow-xl px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#FF5A1F]/15 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white leading-none mb-1.5">Territory Battles</p>
                  <p className="text-[10px] text-white/40 font-medium tracking-wide">Defend your home turf</p>
                </div>
              </div>
            </div>
            <div className="turn-card absolute" style={{ top: 'calc(50% + 210px)', left: 'calc(50% + 300px)' }}>
              <div className="bg-[#22223D] border border-white/10 rounded-[24px] shadow-xl px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#FF5A1F]/15 flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white leading-none mb-1.5">Dynamic Grid Impact</p>
                  <p className="text-[10px] text-white/40 font-medium tracking-wide">Shape the city map color</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Phone */}
          <div className="flex flex-col items-center w-full lg:w-auto relative z-30 max-h-full lg:ml-[340px]">
            <div ref={phoneRef} className="w-[85vw] max-w-[340px] h-auto max-h-full lg:w-auto lg:h-[68vh] lg:max-h-[680px] aspect-[1/2.05] relative shrink-0">
              <PhoneFrame className="w-full h-full relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 z-50 pointer-events-none mix-blend-overlay" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#FF5A1F] rounded-[60px] blur-[80px] opacity-[0.15] -z-10 pointer-events-none" />

                {/* Screen 1: Map */}
                <div className={`turn-screen absolute inset-0 bg-[#1A1A2E] transition-opacity duration-300 ${activeScreenIndex === 0 ? "opacity-100" : "opacity-0"}`}>
                  <CityMap intensity={1} />
                  <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 text-white font-sans font-bold text-[8.5px] pointer-events-none">
                    <span>9:41</span>
                    <span className="w-2.5 h-1.5 border border-white rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-white rounded-2xs" /></span>
                  </div>
                  <div className="absolute top-[12%] left-[5%] right-[5%] bg-white/10 backdrop-blur rounded-xl px-3 py-2.5 border border-white/10 flex items-center gap-2 shadow-md z-30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse shrink-0" />
                    <span className="text-[8.5px] font-bold text-white/50">Search active hubs in Mumbai...</span>
                  </div>
                  <div className="absolute bottom-[18%] left-[5%] right-[5%] bg-[#22223D] rounded-2xl p-3.5 border border-white/10 shadow-xl z-30 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] font-black text-white">Shivaji Park Hub</p>
                        <p className="text-[8px] text-[#FF8A5B] font-mono font-bold uppercase tracking-wider">342 active now</p>
                      </div>
                      <span className="bg-[#FF5A1F]/15 text-[#FF8A5B] text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">Rank #1</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[78%] h-full bg-[#FF5A1F] rounded-full" />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[7.5px] text-white/40 font-medium">Daily Target: 5.0 km</span>
                      <button className="bg-[#FF5A1F] text-[#1A1A2E] text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg">Join Run</button>
                    </div>
                  </div>
                </div>

                {/* Screen 2: Streak */}
                <div className={`turn-screen absolute inset-0 bg-[#1A1A2E] transition-opacity duration-300 flex flex-col px-5 pt-[14%] pb-[18%] text-white ${activeScreenIndex === 1 ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 font-sans font-bold text-[8.5px] pointer-events-none">
                    <span>9:41</span>
                    <span className="w-2.5 h-1.5 border border-white rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-white rounded-2xs" /></span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-[#FF5A1F]" />
                      <span className="text-[#FF8A5B] text-[9px] font-bold uppercase tracking-widest">Active Streak</span>
                    </div>
                    <span className="text-[8px] font-mono bg-white/10 text-white/50 px-1.5 py-0.5 rounded-md">July 2026</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-5">
                    <div className="flex items-baseline justify-center">
                      <p className="text-white font-black leading-none" style={{ fontSize: "64px" }}>14</p>
                      <span className="text-[12px] font-black text-[#FF5A1F] ml-1">DAYS</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between">
                      <div className="text-center">
                        <p className="text-[11px] font-black text-white">84.2</p>
                        <p className="text-[6.5px] text-white/40 font-bold uppercase">Distance (KM)</p>
                      </div>
                      <div className="border-l border-white/10" />
                      <div className="text-center">
                        <p className="text-[11px] font-black text-white">5:12</p>
                        <p className="text-[6.5px] text-white/40 font-bold uppercase">Avg Pace</p>
                      </div>
                      <div className="border-l border-white/10" />
                      <div className="text-center">
                        <p className="text-[11px] font-black text-white">7.8k</p>
                        <p className="text-[6.5px] text-white/40 font-bold uppercase">Avg Steps</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[8px] text-white/40 font-bold uppercase">Consistency Grid</span>
                        <span className="text-[8px] text-[#FF8A5B] font-bold">14/21 days active</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {[...Array(14)].map((_, i) => <div key={i} className="aspect-square rounded bg-[#FF5A1F] shadow-sm shadow-[#FF5A1F]/30" />)}
                        {[...Array(7)].map((_, i) => <div key={i} className="aspect-square rounded border border-white/10 bg-white/5" />)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screen 3: Leaderboard */}
                <div className={`turn-screen absolute inset-0 bg-[#1A1A2E] transition-opacity duration-300 flex flex-col px-5 pt-[14%] pb-[18%] text-white ${activeScreenIndex === 2 ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 font-sans font-bold text-[8.5px] pointer-events-none">
                    <span>9:41</span>
                    <span className="w-2.5 h-1.5 border border-white rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-white rounded-2xs" /></span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#FF5A1F]" />
                      <span className="text-[#FF8A5B] text-[9px] font-bold uppercase tracking-widest">Shivaji Park</span>
                    </div>
                    <span className="text-[8px] font-mono bg-white/10 text-white/50 px-1.5 py-0.5 rounded-md">Live Rank</span>
                  </div>
                  <div className="flex-1 flex flex-col pt-3 justify-center">
                    <p className="text-white font-black text-lg uppercase leading-none mb-1">Hub Leaderboard</p>
                    <p className="text-white/40 text-[8px] mb-3">Updated every 5 minutes</p>
                    <div className="space-y-2">
                      {LEADERBOARD_DATA.map((r, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${r.you ? "bg-[#FF5A1F]/15 border border-[#FF5A1F]/30" : "bg-white/5 border border-white/10"}`}>
                          <div className="flex items-center gap-2.5">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black ${r.you ? "bg-[#FF5A1F] text-[#1A1A2E]" : "bg-white/10 text-white"}`}>
                              {r.name.split(" ").map(w => w[0]).join("")}
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-white leading-tight">{r.name}</p>
                              <p className="text-[7.5px] text-white/40 font-medium">Rank #{i + 1}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-white leading-tight">{r.days}d</p>
                            <p className="text-[7px] text-[#FF8A5B] font-bold">STREAK</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Screen 4: Shareable Card */}
                <div className={`turn-screen absolute inset-0 bg-[#1A1A2E] transition-opacity duration-300 flex flex-col px-5 pt-[14%] pb-[18%] text-white ${activeScreenIndex === 3 ? "opacity-100" : "opacity-0"}`}>
                  <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 font-sans font-bold text-[8.5px] pointer-events-none">
                    <span>9:41</span>
                    <span className="w-2.5 h-1.5 border border-white rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-white rounded-2xs" /></span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-[#FF5A1F]" />
                      <span className="text-[#FF8A5B] text-[9px] font-bold uppercase tracking-widest">Weekly Recap</span>
                    </div>
                    <span className="text-[8px] font-mono bg-white/10 text-white/50 px-1.5 py-0.5 rounded-md">Shareable</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-[#FF5A1F] to-[#c73f10] rounded-2xl p-4 shadow-lg text-white flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Shivaji Park Hub</p>
                          <p className="text-[15px] font-black leading-tight">7-Day Recap</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                          <Flame className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <p className="text-[13px] font-black leading-none">32.4</p>
                          <p className="text-[6px] font-bold uppercase opacity-70 mt-1">KM Moved</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <p className="text-[13px] font-black leading-none">7</p>
                          <p className="text-[6px] font-bold uppercase opacity-70 mt-1">Day Streak</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-2 text-center">
                          <p className="text-[13px] font-black leading-none">#1</p>
                          <p className="text-[6px] font-bold uppercase opacity-70 mt-1">Local Rank</p>
                        </div>
                      </div>
                      <button className="w-full bg-[#1A1A2E] text-white text-[8.5px] font-black uppercase tracking-widest py-2 rounded-lg flex items-center justify-center gap-1.5">
                        <Share2 className="w-3 h-3" /> Share Your Card
                      </button>
                    </div>
                  </div>
                </div>

                {/* Common Tab Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#14141f]/90 backdrop-blur border-t border-white/10 flex items-center justify-around px-2 z-40">
                  <div className="flex flex-col items-center gap-0.5"><Navigation className="w-4 h-4 text-[#FF5A1F]" /><span className="text-[7px] font-bold text-[#FF5A1F] uppercase tracking-wide">Map</span></div>
                  <div className="flex flex-col items-center gap-0.5 opacity-40"><Flame className="w-4 h-4 text-white" /><span className="text-[7px] font-bold text-white uppercase tracking-wide">Streak</span></div>
                  <div className="flex flex-col items-center gap-0.5 opacity-40"><MapPin className="w-4 h-4 text-white" /><span className="text-[7px] font-bold text-white uppercase tracking-wide">Hubs</span></div>
                  <div className="flex flex-col items-center gap-0.5 opacity-40"><Users className="w-4 h-4 text-white" /><span className="text-[7px] font-bold text-white uppercase tracking-wide">Profile</span></div>
                </div>
              </PhoneFrame>
            </div>

            {/* Mobile Tabs */}
            <div className="flex justify-between items-center bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-1.5 w-full max-w-[340px] mt-6 lg:hidden z-30">
              {[
                { icon: Navigation, label: "Map" },
                { icon: Flame, label: "Streak" },
                { icon: MapPin, label: "Rank" },
                { icon: Share2, label: "Recap" },
              ].map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setActiveScreenIndex(i)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-300 ${activeScreenIndex === i ? "bg-[#FF5A1F] text-[#1A1A2E]" : "text-white/50"}`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="text-[9px] font-bold uppercase tracking-wide">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile step caption */}
            <div className="w-full max-w-[340px] mt-4 lg:hidden z-30 min-h-[84px]">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="font-mono text-[#FF5A1F] text-[10px] font-bold tracking-widest">{STEPS[activeScreenIndex].n}</span>
                <p className="text-xs font-black text-white leading-none mt-1.5 mb-1.5 uppercase">{STEPS[activeScreenIndex].label}</p>
                <p className="text-[10px] text-white/50 leading-normal">{STEPS[activeScreenIndex].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
