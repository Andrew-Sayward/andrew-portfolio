import { useEffect, useRef, useState } from "react";
import styles from "./portfolio.module.scss";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolio = [
  {
    name: "Wiser",
    image: "/wiser.jpeg",
    copy: "In the Wiser project, I stepped up as the project lead, guiding junior staff on how to tackle different components effectively and ensuring we met our deadlines. I also managed the more complex tasks to streamline the team’s workflow. Notable examples include the SVG color fill animation on the 'Life' page and the content wheels on the 'What We Do' sub-pages, like Employer Branding and Early Careers.",
    link: "https://wearewiser.com",
  },
  {
    name: "Soho House",
    image: "/soho-house.jpeg",
    copy: "I took the lead on the SohoHouse project, managing the build solo while my team focused on other priorities. The main challenge? Integrating job descriptions delivered as a single block of markdown data. To overcome this, I leveraged Framer Motion to design smooth transitions between the career listings and job details. This approach not only maintained the site’s modern feel but also seamlessly connected the content, enhancing user experience by making it appear as though everything existed on one continuous page.",
    link: "https://careers.sohohouse.com",
  },
  {
    name: "Sky",
    image: "/sky.png",
    copy: "The Sky project unfolded in two key phases: first, the development of their early careers website, followed by the construction of their global site. Faced with tight deadlines and the need for rapid execution, I honed my skills in project management. This experience taught me valuable lessons in maintaining team morale and optimizing the use of individual skill sets for maximum efficiency.",
    link: "https://careers.sky.com",
  },
  {
    name: "OnRunning",
    image: "onrunning.jpeg",
    copy: "OnRunning marked my initial foray into building a large-scale website. The site features dynamic job description pages that integrate data from multiple CMS and data fields. These pages are tailored to each job, displaying detailed information about location, team involvement, and other job-specific details, creating a comprehensive and relevant user experience.",
    link: "https://culture.onrunning.com",
  },
];

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 767) {
      return;
    }
    const mainElement = portfolioRef.current;
    const backgroundElement = backgroundRef.current;

    if (mainElement && backgroundElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(backgroundElement, {
        yPercent: 10,
        xPercent: 10,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.portfolio} id="portfolio" ref={portfolioRef}>
      <div className={styles.inner}>
        <h2>Portfolio</h2>
        <p>A selection of more recent projects</p>
        <div className={styles.portfolioCards}>
          {portfolio.map((item, index) => (
            <div
              key={item.name}
              className={`${styles.card} ${activeIndex === index ? styles.active : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => setActiveIndex(index)}
            >
              <div className={styles.content}>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.contentArea}>
          <div className={styles.image}>
            <div ref={backgroundRef}>
              <Image src={portfolio[activeIndex].image} alt={portfolio[activeIndex].name} fill />
            </div>
          </div>
          <div className={styles.contentSection}>
            <div>{portfolio[activeIndex].copy}</div>
            <a href={portfolio[activeIndex].link} target="_blank" rel="noopener noreferrer">
              See website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
