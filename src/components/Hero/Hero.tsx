import VideoEmbed, { VideoEmbedHandler } from "@/atoms/video-embed/video-embed";
import styles from "./hero.module.scss";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import buttons from "@/helpers/buttons";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  hasScrolled: boolean;
};

// Define the spring transition
const spring = {
  type: "spring",
  stiffness: 500,
  damping: 100,
};

const Hero = ({ hasScrolled }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<VideoEmbedHandler>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 767) {
      return;
    }
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { y: 0 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", // When the top of the section hits the top of the viewport
            pin: true,
            pinSpacing: false,
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const renderButtons = () => {
    return buttons?.map((item, index) => {
      return (
        <a href={"#" + item.toLowerCase().replace(" ", "")} key={index}>
          <motion.button className={styles.button} layoutId={item.replace(" ", "")} transition={spring}>
            {item}
          </motion.button>
        </a>
      );
    });
  };

  useEffect(() => {
    videoRef.current?.onPlay(() => {
      setIsPlaying(true);
    });
  });

  return (
    <section>
      <div className={styles.hero} id="home" ref={sectionRef}>
        <div className={styles.inner}>
          {!hasScrolled && (
            <motion.h1 transition={spring} layoutId="andrew-h1">
              Andrew Sayward
            </motion.h1>
          )}
          {!hasScrolled && <p>Senior FrontEnd Web Developer</p>}
          {!hasScrolled && <div className={styles.buttons}>{renderButtons()}</div>}
        </div>
        <div className={styles.placeholder}>&nbsp;</div>
        <div className={styles.video} style={{ opacity: isPlaying ? 1 : 0, transition: "all 0.4s ease" }}>
          <VideoEmbed
            quality="240p"
            src={"https://vimeo.com/409250080"}
            loop
            autoplay
            muted
            background
            fill
            width={100}
            height={100}
            ref={videoRef}
          />
        </div>
      </div>
      {hasScrolled && <div className={styles.floatingButtons}>{renderButtons()}</div>}
    </section>
  );
};

export default Hero;
