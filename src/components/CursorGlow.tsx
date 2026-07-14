"use client";

import { useEffect, useRef } from "react";

// A soft heat-orange glow that follows the pointer on desktop only.
// Pure CSS transform updates via rAF — no React state, no re-renders.
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = glowRef.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="hidden md:block fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none z-0 opacity-[0.06]"
      style={{
        background: "radial-gradient(circle, #FF5A1F 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
