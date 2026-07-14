"use client";

import { useEffect, useRef, useState } from "react";

// One-shot count-up, triggered once the element enters the viewport.
// Not a continuous loop — animates for `duration` ms then stops.
export function useCountUp<T extends HTMLElement = HTMLElement>(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<T | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(target * ease(progress)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
