import { motion } from "framer-motion";
import styles from "./tech-stack.module.scss";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import useMediaQuery from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = useMediaQuery(767);

  useEffect(() => {
    if (isMobile) {
      setHasScrolled(true);
    }
  }, [isMobile]);

  useEffect(() => {
    const element = sectionRef.current;

    if (element) {
      ScrollTrigger.create({
        trigger: element,
        start: "top 35%", // Start checking when the top of the trigger hits the top of the viewport
        end: "top top", // End checking when the bottom of the trigger hits the bottom of the viewport
        onLeave: () => setHasScrolled(true), // Set hasScrolled to true when scrolling back up
        onEnter: () => setHasScrolled(true), // Also set it to true when scrolling down
        onEnterBack: () => setHasScrolled(true), // Also set it to true when scrolling down
        onLeaveBack: () => setHasScrolled(false),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill()); // Clean up ScrollTriggers on component unmount
    };
  }, []);

  type Stack = {
    name: string;
    logo: string;
  };

  const stack = [
    { name: "Next JS", logo: "/nextjs-icon.png" },
    { name: "ES6/Javascript", logo: "/javascript-icon.png" },
    { name: "SCSS", logo: "/brand_sass_icon.png" },
    { name: "JSX/HTML", logo: "/jsx.svg" },
    { name: "GraphQL", logo: "/graphql.svg" },
    { name: "GSAP", logo: "/greensock.svg" },
  ] as Array<Stack>;

  // Fisher-Yates shuffle algorithm to randomize the stack
  const shuffleArray = (array: Stack[]) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Shuffle the stack
  const shuffledStack = shuffleArray(stack);

  // Define the spring transition
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 100,
  };

  return (
    <section ref={sectionRef} className={styles.techStack} id="techstack" style={{ height: isMobile ? "auto" : "600px" }}>
      <div className={styles.inner}>
        <div>
          <h2>Tech Stack</h2>
          {!hasScrolled && !isMobile && (
            <div className={`${styles.techCards} ${styles.techCardsStacked}`}>
              {shuffledStack.map((item, index) => {
                return (
                  <motion.div
                    layoutId={item.name}
                    key={index}
                    className={styles.card}
                    style={{ top: index * 40, left: index * 40 }}
                    transition={spring}
                  >
                    <div className={styles.logo}>
                      <Image src={item.logo} alt={item.name} fill />
                    </div>
                    <div className={styles.content}>
                      <p>{item.name}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          {(hasScrolled || isMobile) && (
            <div className={styles.techCards}>
              {shuffledStack.map((item, index: number) => {
                return (
                  <motion.div key={index} className={styles.card} layoutId={item.name} transition={spring}>
                    <div className={styles.logo}>
                      <Image src={item.logo} alt={item.name} fill />
                    </div>
                    <div className={styles.content}>
                      <p>{item.name}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
