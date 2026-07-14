import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#14141f] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
          Revo © 2026 · Made in Mumbai
        </p>
        <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-white/40">
          <Link href="/privacy" className="hover:text-[#FF5A1F] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#FF5A1F] transition-colors">Terms</Link>
          {/* TODO: swap in real profile URLs */}
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
