"use client";

import { MutableRefObject, useEffect, useRef } from "react";
import styles from "./three-columns.module.scss";
import { Bangers } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
const bangers = Bangers({ subsets: ["latin"], weight: "400" });
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const ThreeColumns = () => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const container = containerRef.current;

    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: true,
          start: "top bottom",
          end: "bottom bottom",
        },
      });
      if (window.innerWidth > 910) {
        tl.current.from(
          container.querySelectorAll(".column-item"),
          {
            y: "100vh",
            stagger: {
              each: 0.2,
            },
          },
          "-=1"
        );
      } else {
        tl.current.from(
          container.querySelectorAll(".column-item"),
          {
            x: "100vw",
            stagger: {
              each: 0.3,
            },
          },
          "-=1"
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className={`${styles.threeColumns} min-h-screen overflow-hidden`} ref={containerRef}>
      <div className={styles.columns}>
        <h2>I work with</h2>
        <div className={`column-item ${styles.column1}`}>
          React / ES6
          <Image alt="react logo" src="/react-logo.png" width={100} height={100} />
        </div>
        <div className={`column-item ${styles.column2}`}>
          HTML / JSX
          <Image alt="react logo" src="/html.png" width={100} height={100} />
        </div>
        <div className={`column-item ${styles.column3}`}>
          SCSS & More
          <Image alt="react logo" src="/css.png" width={100} height={100} />
        </div>
      </div>
    </section>
  );
};

export default ThreeColumns;
