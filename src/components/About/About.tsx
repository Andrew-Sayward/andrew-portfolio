import { useEffect, useRef } from "react";
import styles from "./about.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Registers the plugin
    gsap.registerPlugin(ScrollTrigger);

    // Ensure the refs are correctly set
    if (backgroundRef.current && aboutRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom", // When the top of 'aboutRef' hits the bottom of the viewport
          end: "bottom top", // When the bottom of 'aboutRef' leaves the top of the viewport
          scrub: true, // Smooth scrubbing
        },
      });

      // Adjust these values based on the desired effect
      tl.to(backgroundRef.current, {
        yPercent: 10, // Vertical movement percentage
        ease: "none",
      });
    }

    // Cleanup function to kill ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={aboutRef} className={styles.about} id="about">
      <div className={styles.inner}>
        <div className={styles.image}>
          <div ref={backgroundRef}>
            <Image src="/andrew.jpeg" alt="image of Andrew Sayward" fill />
          </div>
        </div>
        <div className={styles.content}>
          <p>
            I currently work as the senior front-end developer in a team creating careers websites for a variety of clients
            in various sectors. I am responsible for the development and mentorship of a number of juniors, and have gained
            key management skills and leadership abilities. I also handle product manager responsibilities, bridging
            communication between the technical team and business stakeholders.
          </p>

          <p>
            Within this role, I have honed my expertise in NextJS/React, Typescript, SCSS, and Headless CMS, while
            maintaining strong foundational skills in HTML, CSS, and JS/ES6. Our team develops Next JS applications that
            process API-driven data for job listings and CMS content, involving extensive conditional rendering, array
            manipulation, and Typescript validation.
          </p>

          <p>
            Having already had a few years experience in GSAP I am currently exploring Framer Motion and how the combination
            of both can create complex and engaging animations to enhance UI designs by adding transitions between component
            states and page changes.{" "}
          </p>
          <p>
            I am currently learning NodeJS and MongoDB to start developing myself as a full-stack developer with a focus on
            the front-end, to be able to both take on a higher number of projects/challenges and to be able to communicate
            more clearly when working with back-end developers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
