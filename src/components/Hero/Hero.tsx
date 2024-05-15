import VideoEmbed from "@/atoms/video-embed/video-embed";
import styles from "./hero.module.scss";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
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

  return (
    <>
      <div>
        <section className={styles.hero} id="home" ref={sectionRef}>
          <div className={styles.inner}>
            {!hasScrolled && (
              <motion.h1 transition={spring} layoutId="andrew-h1">
                Andrew Sayward
              </motion.h1>
            )}
            <p>Senior FrontEnd Web Developer</p>
            {!hasScrolled && <div className={styles.buttons}>{renderButtons()}</div>}
          </div>
          <div className={styles.video}>
            <VideoEmbed src={"https://vimeo.com/206402420"} loop autoplay muted background fill width={100} height={100} />
          </div>
        </section>
      </div>
      {hasScrolled && <div className={styles.floatingButtons}>{renderButtons()}</div>}
    </>
  );
};

export default Hero;
