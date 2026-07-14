"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1A1A2E]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/main-logo-transparent.png" alt="Revo Logo" width={24} height={24} priority style={{ height: "auto" }} className="invert" />
          <span className="font-display text-xl tracking-[0.15em] uppercase text-white">Revo</span>
        </div>
        <a
          href="#waitlist"
          className="text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-[#FF5A1F] transition-colors px-4 py-2 rounded-full border border-white/15 hover:border-[#FF5A1F]/50"
        >
          Join the list
        </a>
      </div>
    </nav>
  );
}
