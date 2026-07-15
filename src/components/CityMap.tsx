"use client";

import React from "react";

interface CityMapProps {
  intensity?: number;
  className?: string;
}

export default function CityMap({ intensity = 1, className = "" }: CityMapProps) {
  const arterials = [
    "M 520,0 C 510,100 508,200 515,300 C 522,400 518,500 520,600 C 522,700 518,800 520,900",
    "M 780,0 C 775,150 772,280 778,380 C 784,480 780,600 782,900",
    "M 200,380 Q 180,420 160,470 Q 140,520 155,570 Q 170,620 200,650",
    "M 0,320 C 100,315 200,318 320,315 C 440,312 520,310 650,312 C 780,314 900,316 1000,318",
    "M 0,450 C 120,445 240,448 380,445 C 520,442 640,443 760,445 C 880,447 960,448 1100,447",
    "M 260,0 C 265,80 262,160 268,240 C 274,320 270,400 272,480",
    "M 400,280 C 420,300 435,320 440,345 C 445,370 438,390 430,410",
    "M 700,350 C 720,360 740,365 760,360 C 780,355 800,348 820,350",
    "M 720,320 C 722,340 720,360 718,380 C 716,400 714,420 716,440",
    "M 230,560 Q 270,555 310,558 Q 350,561 380,558",
    "M 850,200 C 870,220 880,240 875,265 C 870,290 858,305 850,320",
  ];

  const activeRoutes = [
    { d: "M 110,480 C 120,430 180,440 200,480 C 220,520 170,570 130,540 C 105,520 100,500 110,480" },
    { d: "M 310,240 C 330,200 390,200 410,240 C 430,280 380,330 340,300 C 310,280 290,260 310,240" },
    { d: "M 720,460 C 740,420 800,420 820,460 C 840,500 790,550 750,520 C 720,500 700,480 720,460" },
    { d: "M 870,280 C 890,240 950,240 970,280 C 990,320 940,370 900,340 C 870,320 850,300 870,280" },
  ];

  const hotspots = [
    { cx: 155, cy: 490, r: 52, runners: 342, label: "MARINE DRIVE", intensity: "high" },
    { cx: 360, cy: 240, r: 44, runners: 218, label: "SHIVAJI PARK", intensity: "high" },
    { cx: 770, cy: 470, r: 36, runners: 176, label: "BANDRA", intensity: "mid" },
    { cx: 920, cy: 290, r: 30, runners: 134, label: "POWAI", intensity: "low" },
  ];

  const blocks = [
    { x: 340, y: 250, w: 55, h: 35 }, { x: 410, y: 255, w: 40, h: 30 },
    { x: 470, y: 248, w: 60, h: 38 }, { x: 350, y: 305, w: 45, h: 28 },
    { x: 675, y: 330, w: 35, h: 25 }, { x: 720, y: 328, w: 28, h: 30 },
    { x: 758, y: 332, w: 42, h: 22 }, { x: 810, y: 180, w: 50, h: 32 },
    { x: 870, y: 185, w: 35, h: 28 }, { x: 130, y: 440, w: 40, h: 35 },
    { x: 180, y: 442, w: 55, h: 32 }, { x: 245, y: 438, w: 38, h: 30 },
    { x: 540, y: 290, w: 45, h: 35 }, { x: 595, y: 285, w: 55, h: 40 },
  ];

  return (
    <svg
      viewBox="0 0 1100 900"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: intensity }}
    >
      <defs>
        <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="b1" />
          <feGaussianBlur stdDeviation="12" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {hotspots.map((h, i) => (
          <radialGradient key={`rg-${i}`} id={`rg-${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity={h.intensity === "high" ? 0.5 : h.intensity === "mid" ? 0.32 : 0.2} />
            <stop offset="55%" stopColor="#FF5A1F" stopOpacity={h.intensity === "high" ? 0.14 : 0.07} />
            <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      <g stroke="rgba(255,255,255,0.045)" strokeWidth="1" fill="none">
        {[...Array(23)].map((_, i) => <line key={`gh${i}`} x1="0" y1={i * 40} x2="1100" y2={i * 40} />)}
        {[...Array(28)].map((_, i) => <line key={`gv${i}`} x1={i * 40} y1="0" x2={i * 40} y2="900" />)}
      </g>

      <path
        d="M 0,350 Q 30,370 20,400 Q 10,430 25,460 Q 40,490 30,520 Q 20,550 35,580 Q 50,610 40,640 L 0,640 Z"
        fill="rgba(255,90,31,0.03)"
      />

      <g fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7">
        {blocks.map((b, i) => (
          <rect key={`b${i}`} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" />
        ))}
      </g>

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {arterials.map((d, i) => (
          <path key={`a${i}`} d={d} stroke="rgba(255,255,255,0.08)" strokeWidth={i < 2 ? 3 : 1.5} />
        ))}
      </g>

      {activeRoutes.map((r, i) => (
        <g key={`ar-${i}`}>
          <path d={r.d} fill="none" stroke="rgba(255,90,31,0.1)" strokeWidth="22" strokeLinecap="round" />
          <path d={r.d} fill="none" stroke="rgba(255,90,31,0.25)" strokeWidth="8" strokeLinecap="round" filter="url(#glow-soft)" />
          <path
            d={r.d}
            className="route-dash"
            fill="none"
            stroke="rgba(255,140,66,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10 7"
            style={{ animationDelay: `${(-15 * i) / 12}s` }}
          />
        </g>
      ))}

      {hotspots.map((h, i) => (
        <g key={`hs-${i}`}>
          <circle cx={h.cx} cy={h.cy} r={h.r * 2.2} fill={`url(#rg-${i})`} />
          <circle cx={h.cx} cy={h.cy} r={h.r * 0.6} fill="rgba(255,90,31,0.1)" />
          <circle cx={h.cx} cy={h.cy} r="7" fill="#FF5A1F" filter="url(#glow-strong)" />
          <circle cx={h.cx} cy={h.cy} r="3.5" fill="#1A1A2E" />
          <circle
            cx={h.cx} cy={h.cy}
            r={8}
            className="hotspot-ring"
            fill="none"
            stroke="rgba(255,90,31,0.5)"
            strokeWidth="1.5"
          />
          <text x={h.cx + 14} y={h.cy - 6} fill="#F5F3EF" fontSize="8" fontFamily="monospace" fontWeight="800" letterSpacing="0.1em">{h.label}</text>
          <text x={h.cx + 14} y={h.cy + 7} fill="#9a94b8" fontSize="6.5" fontFamily="monospace" letterSpacing="0.05em">{h.runners} ACTIVE</text>
        </g>
      ))}
    </svg>
  );
}
