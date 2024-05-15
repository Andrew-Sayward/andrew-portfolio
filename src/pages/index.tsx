import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Header from "@/components/Header/header";
import TechStack from "@/components/TechStack/tech-stack";
import Portfolio from "@/components/Portfolio/portfolio";
import { readAllBlogs } from "@/helpers/data/read-all-blogs";
import { BlogPostData } from "@/helpers/data/read-blog-post-page";
import BlogListingSmall from "@/components/BlogListingSmall/blog-listing-small";
import { BlogCardData } from "@/helpers/models/blog-card-data";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  blogs: BlogCardData[];
};

export default function Home(props: Props) {
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
      <BlogListingSmall blogs={props.blogs} />
    </main>
  );
}

export async function getStaticProps(context: any): Promise<{ props: Props }> {
  const [blogs] = await Promise.all([readAllBlogs()]);

  return {
    props: {
      blogs,
    },
  };
}
