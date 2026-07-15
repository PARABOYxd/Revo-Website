"use client";

import React from "react";

export default function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        aspectRatio: "9 / 19.5",
        filter: "drop-shadow(0 30px 70px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 40px rgba(255, 90, 31, 0.08))"
      }}
    >
      <div className="absolute inset-0 rounded-[13%/6%] bg-gradient-to-b from-[#3a3a52] via-[#26263e] to-[#161623] border border-[#0d0d16] overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-[1px] rounded-[13%/6%] border border-white/10 bg-transparent pointer-events-none z-10" />

        <div className="absolute left-0 top-[12%] w-[1.5px] h-[1.5%] bg-[#4a4a68]" />
        <div className="absolute right-0 top-[12%] w-[1.5px] h-[1.5%] bg-[#4a4a68]" />
        <div className="absolute left-0 bottom-[12%] w-[1.5px] h-[1.5%] bg-[#4a4a68]" />
        <div className="absolute right-0 bottom-[12%] w-[1.5px] h-[1.5%] bg-[#4a4a68]" />

        <div className="absolute left-[-1.5px] top-[18%] w-[2.5px] h-[3%] bg-gradient-to-b from-[#4a4a68] to-[#1e1e30] rounded-r border-y border-r border-[#0d0d16]" />
        <div className="absolute left-[-1.5px] top-[26%] w-[2.5px] h-[7%] bg-gradient-to-b from-[#4a4a68] to-[#1e1e30] rounded-r border-y border-r border-[#0d0d16]" />
        <div className="absolute left-[-1.5px] top-[35%] w-[2.5px] h-[7%] bg-gradient-to-b from-[#4a4a68] to-[#1e1e30] rounded-r border-y border-r border-[#0d0d16]" />
        <div className="absolute right-[-1.5px] top-[29%] w-[2.5px] h-[10%] bg-gradient-to-b from-[#4a4a68] to-[#1e1e30] rounded-l border-y border-l border-[#0d0d16]" />

        <div className="absolute inset-[1.5%] rounded-[11.8%/5.4%] bg-black overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.3)] border border-black">
          <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[28%] h-[3.4%] bg-[#050508] rounded-full z-50 flex items-center justify-center gap-1 shadow-inner">
            <div className="w-[18%] h-[55%] rounded-full bg-[#101018] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />
            <div className="w-[30%] h-[55%] rounded-full bg-[#0a0a0f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]" />
          </div>

          <div className="absolute inset-0 bg-[#1A1A2E] overflow-hidden select-none">
            {children}
          </div>

          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[28%] h-[0.7%] bg-white/20 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
