import { motion } from "framer-motion";
import styles from "./header-alt.module.scss";
import Link from "next/link";
import buttons from "@/helpers/buttons";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Utility function to create homepage anchor links
const createHomepageAnchorLink = (id: string, isHome: boolean) => {
  return isHome ? `#${id}` : `/#${id}`;
};

const HeaderAlt = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useRouter();
  const mainRef = useRef<HTMLElement | null>(null);

  // Check if the current page is the homepage
  const isHome = pathname === "/";

  const handleScroll = () => {
    const position = window.scrollY;
    setHasScrolled(position > 0); // Toggle based on scroll position
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mainElement = mainRef.current;

    if (mainElement) {
      ScrollTrigger.create({
        trigger: mainElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setHasScrolled(self.scroll() > 0);
        },
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const renderButtons = () => {
    return buttons?.map((item) => (
      <Link
        legacyBehavior
        href={createHomepageAnchorLink(item.toLowerCase().replace(" ", ""), isHome)}
        scroll={false}
        key={item}
      >
        <a>
          <button className={styles.button}>{item}</button>
        </a>
      </Link>
    ));
  };

  return (
    <>
      <header ref={mainRef} className={`${styles.header} ${hasScrolled ? styles.mobileHeader : ""}`}>
        <div className={styles.inner}>
          <Link href="/" legacyBehavior scroll={false}>
            <a>
              <div className={styles.logoOutter}>
                <span className={styles.logo}>:{"}"}</span>
                <span className={styles.name}>
                  Andrew
                  <br />
                  Sayward
                </span>
              </div>
            </a>
          </Link>
        </div>
      </header>
      <div className={styles.floatingButtons}>{renderButtons()}</div>
    </>
  );
};

export default HeaderAlt;
