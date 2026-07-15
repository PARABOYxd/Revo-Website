import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#14141f]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="text-[11px] font-semibold tracking-wide text-white/35">Made in Mumbai · © 2026 Revo</p>
        <nav className="flex items-center gap-6 text-[11px] font-semibold text-white/35">
          <Link href="/privacy" className="hover:text-[#FF5A1F] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#FF5A1F] transition-colors">Terms</Link>
          {/* TODO: swap in real profile URLs */}
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">X</a>
        </nav>
      </div>
    </footer>
  );
}
