import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Header from "@/components/Header/header";
import TechStack from "@/components/TechStack/tech-stack";
import Portfolio from "@/components/Portfolio/portfolio";
import { readAllBlogs } from "@/helpers/data/read-all-blogs";
import BlogListingSmall from "@/components/BlogListingSmall/blog-listing-small";
import { BlogCardData } from "@/helpers/models/blog-card-data";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Props = {
  blogs: BlogCardData[];
};

const Home = ({ blogs }: Props) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setHasScrolled(position > 0); // Toggle based on scroll position
  };

  useEffect(() => {
    // Wait for your animation to finish or delay the scroll as needed
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // Adjust time based on your animation needs

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          gsap.to(window, {
            duration: 0.5,
            ease: "power2.inOut", // Adjusting the easing function
            scrollTo: { y: element, autoKill: false },
          });
          ScrollTrigger.refresh();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);

    // Initial scroll to handle direct link with hash
    handleHashChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header hasScrolled={hasScrolled} />
      <Hero hasScrolled={hasScrolled} />
      <About />
      <TechStack />
      <Portfolio />
      <BlogListingSmall blogs={blogs} />
    </main>
  );
};

export default Home;

export async function getServerSideProps(): Promise<{ props: Props }> {
  const blogs = await readAllBlogs();

  return {
    props: {
      blogs,
    },
  };
}
