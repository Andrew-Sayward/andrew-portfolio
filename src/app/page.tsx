"use client";

import Hero from "@/components/hero/hero";
import TextCanvas from "@/components/text-canvas/text-canvas";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ThreeColumns from "@/components/three-columns/three-columns";
import ThreeColumnsCaseStudy from "@/components/three-columns-case-study/three-columns-case-study";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    let panels = gsap.utils.toArray("section") as Array<HTMLDivElement>;

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () => (panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom"),
        pin: true,
        pinSpacing: false,
      });
      if (i === 3) {
        // Create a GSAP timeline
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // Add an animation to the timeline
        timeline.to(".fixed-left", {
          x: "-100%",
          duration: 1, // Adjust the duration as needed
        });
      }
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <TextCanvas />
      <ThreeColumns />
      <ThreeColumnsCaseStudy />
      {/* <section className="min-h-screen"></section> */}
    </main>
  );
}
