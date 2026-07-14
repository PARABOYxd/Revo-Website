"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ThePain() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pain-line",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".pain-heatline",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-[#14141f] py-36 sm:py-44 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <p
          className="pain-line font-display uppercase text-white leading-[0.95] tracking-wide text-left"
          style={{ fontSize: "clamp(28px, 5.5vw, 72px)" }}
        >
          Every morning, thousands of runners
        </p>
        <p
          className="pain-line font-display uppercase text-white/35 leading-[0.95] tracking-wide text-left ml-[6%] sm:ml-[12%]"
          style={{ fontSize: "clamp(28px, 5.5vw, 72px)" }}
        >
          move through this city.
        </p>

        <div className="pain-heatline origin-left my-12 sm:my-16 h-px w-full bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent" />

        <p
          className="pain-line font-display uppercase text-white/35 leading-[0.95] tracking-wide text-right"
          style={{ fontSize: "clamp(28px, 5.5vw, 72px)" }}
        >
          Every evening,
        </p>
        <p
          className="pain-line font-display uppercase text-[#FF5A1F] leading-[0.95] tracking-wide text-right"
          style={{ fontSize: "clamp(28px, 5.5vw, 72px)" }}
        >
          their effort disappears.
        </p>
      </div>
    </section>
  );
}
