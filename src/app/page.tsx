"use client";

import Hero from "@/components/hero/hero";
import TextCanvas from "@/components/text-canvas/text-canvas";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ThreeColumns from "@/components/three-columns/three-columns";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    let panels = gsap.utils.toArray("section");

    panels.forEach((panel: any, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => (panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom"), // if it's shorter than the viewport, we prefer to pin it at the top
        pin: true,
        pinSpacing: false,
      });
    });
  });

  return (
    <main className="min-h-screen">
      <Hero />
      <TextCanvas />
      {/* <ThreeColumns /> */}
    </main>
  );
}
