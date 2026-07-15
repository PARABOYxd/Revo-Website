"use client";

import React from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ThePain from "@/components/ThePain";
import TheTurn from "@/components/TheTurn";
import TheBelonging from "@/components/TheBelonging";
import FAQ from "@/components/FAQ";
import TheInvitation from "@/components/TheInvitation";
import Footer from "@/components/Footer";
import { track } from "@/lib/analytics";

export default function Home() {
  React.useEffect(() => {
    track("page_view");
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-[#1A1A2E] text-white selection:bg-[#FF5A1F] selection:text-[#1A1A2E]">
      <Nav />
      <Hero />
      <ThePain />
      <TheTurn />
      <TheBelonging />
      <FAQ />
      <TheInvitation />
      <Footer />
    </main>
  );
}
