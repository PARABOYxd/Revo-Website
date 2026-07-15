"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  { q: "Is it free?", a: "Yes, completely. Founding Runners get a permanent badge and early access, but there's no paywall to run, walk, or show up on your local grid." },
  { q: "When does it launch?", a: "Mumbai first, starting with waitlist members. Join now for an early invite as we open neighbourhood by neighbourhood." },
  { q: "Do walkers count?", a: "Yes — exactly the same as runners. Revo rewards showing up and staying consistent, not pace." },
  { q: "Is my route public?", a: "No. Only area-level activity is shown — your neighbourhood's heatmap and rank. Your exact path stays private." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#1A1A2E] px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-10 font-display text-center uppercase leading-[0.9] tracking-wide text-white" style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}>
          Fair questions.
        </h2>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left focus:outline-none"
                >
                  <span className="font-mono text-[10px] font-bold text-[#FF5A1F]">0{i + 1}</span>
                  <span className="flex-1 text-[15px] font-semibold text-white">{f.q}</span>
                  <Plus className={`h-4 w-4 shrink-0 text-[#FF5A1F] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-white/50">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
