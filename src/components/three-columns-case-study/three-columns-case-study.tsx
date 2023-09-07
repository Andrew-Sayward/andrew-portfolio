"use client";

import { MutableRefObject, useEffect, useRef } from "react";
import styles from "./three-columns-case-study.module.scss";
import { Oswald } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

const ThreeColumnsCaseStudy = () => {
  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const secondContainerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const container = containerRef.current;
    const secondContainer = secondContainerRef.current;
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: secondContainer,
          scrub: true,
          start: "top bottom",
          end: "bottom bottom",
        },
      });
      if (window.innerWidth > 910) {
        tl.current
          .from(
            container.querySelectorAll(".column-item:nth-of-type(2)"),
            {
              x: "-100%",
            },
            "-=1"
          )
          .from(
            container.querySelectorAll(".column-item:nth-of-type(3)"),
            {
              x: "-200%",
            },
            "-=1"
          );
      } else {
        tl.current.from(
          container.querySelectorAll(".column-item"),
          {
            x: "100vw",
            stagger: {
              each: 1,
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
    <>
      <section className={`${styles.threeColumnsCaseStudy} min-h-screen overflow-hidden`} ref={secondContainerRef}></section>
      <div className={`${styles.columns} fixed-left`} ref={containerRef}>
        <h2>On work like</h2>
        <Link href={"https://culture.on-running.com/"} target="_blank" className={`column-item ${styles.column1}`}>
          <div>
            <span>Onrunning</span>
          </div>
          <Image alt="react logo" src="/onrunning.jpeg" fill />
        </Link>
        <Link href={"https://www.williamhillgroup.com/careers"} target="_blank" className={`column-item ${styles.column2}`}>
          <div>
            <span> William Hill</span>
          </div>
          <Image alt="react logo" src="/william-hill.jpeg" fill />
        </Link>
        <Link href={"https://depopcareers.com/"} target="_blank" className={`column-item ${styles.column3}`}>
          <div>
            <span>Depop</span>
          </div>
          <Image alt="react logo" src="/depop.webp" fill />
        </Link>
      </div>
    </>
  );
};

export default ThreeColumnsCaseStudy;
