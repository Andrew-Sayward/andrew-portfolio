import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1>Andrew</h1>
    </main>
  );
}
