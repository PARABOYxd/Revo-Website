"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const LINE_1 = "Every morning, thousands move through this city.";
const LINE_2 = "Every evening, their effort disappears.";

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`pain-word inline-block ${className ?? ""}`}>
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function ThePain() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pain-word",
        { opacity: 0, y: 14, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: { trigger: container.current, start: "top 65%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".pain-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: container.current, start: "top 55%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-[#14141f] px-5 py-32 sm:py-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p
          className="font-display uppercase leading-[1.05] tracking-wide text-white"
          style={{ fontSize: "clamp(26px, 5vw, 56px)" }}
        >
          <Words text={LINE_1} className="text-white/85" />
        </p>

        <div className="pain-line origin-center my-9 h-px w-24 bg-[#FF5A1F] sm:my-12" />

        <p
          className="font-display uppercase leading-[1.05] tracking-wide"
          style={{ fontSize: "clamp(26px, 5vw, 56px)" }}
        >
          <Words text={LINE_2} className="text-[#FF5A1F]" />
        </p>
      </div>
    </section>
  );
}
