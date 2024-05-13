import styles from "./about.module.scss";
import Image from "next/image";

const About = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <div className={styles.image}>
          <Image src="/andrew.jpeg" alt="image of Andrew Sayward" fill />
        </div>
        <div className={styles.content}>
          <p>
            My journey into web development began in college while studying Music Technology, where I became fascinated with
            how studio techniques could be converted into code. This curiosity led me to pursue a career in web development,
            starting with an intensive front-end course at Just IT after I graduated.
          </p>

          <p>
            I started my professional career at DanDan Digital, a digital marketing agency, where I was the sole developer.
            There, I taught myself advanced skills until I needed more structured guidance, which I found at The Croc. I
            eventually became the primary front-end developer, focusing on improving my expertise.
          </p>

          <p>
            Currently, I&apos;m a Senior Front-End Developer at Wiser, where I lead a team creating career websites for
            diverse clients. My role involves both development and mentorship, as well as taking on some project management
            tasks. I communicate our team&apos;s needs to the business side and ensure our projects align with company goals.
          </p>

          <p>
            I specialize in NextJS/React, Typescript, SCSS, and Headless CMS. Our projects often involve creating Next JS
            applications that handle API data for job listings and CMS content, requiring detailed work with conditional
            rendering, array manipulation, and Typescript validation. Lately, I&apos;ve been enhancing my skills in
            JavaScript animation libraries like GSAP and Framer Motion, which allows me to integrate complex animations into
            our UI designs. I&apos;ve also started using ChatGPT to streamline our workflows and increase our team&apos;s
            efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
