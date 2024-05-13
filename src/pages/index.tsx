import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Header from "@/components/Header/header";
import TechStack from "@/components/TechStack/tech-stack";
import Portfolio from "@/components/Portfolio/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setHasScrolled(position > 0); // Toggle based on scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header hasScrolled={hasScrolled} />
      <Hero hasScrolled={hasScrolled} />
      <About />
      <TechStack />
      <Portfolio />
    </main>
  );
}
