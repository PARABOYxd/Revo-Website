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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1A1A2E]/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Image src="/main-logo-transparent.png" alt="" width={20} height={20} priority className="invert opacity-90" />
          <span className="font-display text-lg tracking-[0.2em] uppercase text-white">Revo</span>
        </div>
        <a
          href="#join"
          className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A2E] bg-[#FF5A1F] hover:bg-[#ff7038] px-4 py-2 rounded-full transition-colors"
        >
          Join
        </a>
      </div>
    </header>
  );
}
