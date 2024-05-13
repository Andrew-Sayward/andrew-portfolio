import VideoEmbed from "@/atoms/video-embed/video-embed";
import styles from "./hero.module.scss";
import { motion } from "framer-motion";

type Props = {
  hasScrolled: boolean;
};

const Hero = ({ hasScrolled }: Props) => {
  const buttons = ["About", "Tech Stack", "Portfolio"];
  const renderButtons = () => {
    return buttons?.map((item, index) => {
      return (
        <a href={"#" + item.toLowerCase().replace(" ", "")} key={index}>
          <motion.button
            className={styles.button}
            layoutId={item.replace(" ", "")}
            transition={{ type: "", damping: 50, stiffness: 150 }}
          >
            {item}
          </motion.button>
        </a>
      );
    });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.inner}>
        {!hasScrolled && <motion.h1 layoutId="andrew-h1">Andrew Sayward</motion.h1>}
        <p>Senior FrontEnd Web Developer</p>
        {!hasScrolled && <div className={styles.buttons}>{renderButtons()}</div>}
      </div>
      <div className={styles.video}>
        <VideoEmbed src={"https://vimeo.com/206402420"} loop autoplay muted background fill width={100} height={100} />
      </div>
      {hasScrolled && <div className={styles.floatingButtons}>{renderButtons()}</div>}
    </section>
  );
};

export default Hero;
