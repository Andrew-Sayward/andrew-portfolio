import styles from "./tech-stack.module.scss";
import Image from "next/image";

const TechStack = () => {
  const stack = [
    { name: "Next JS", logo: "/nextjs-icon.png" },
    { name: "ES6/Javascript", logo: "/javascript-icon.png" },
    { name: "SCSS", logo: "/brand_sass_icon.png" },
    { name: "JSX/HTML", logo: "/jsx.svg" },
    { name: "GraphQL", logo: "/graphql.svg" },
    { name: "GSAP", logo: "/greensock.svg" },
  ];

  return (
    <section className={styles.techStack} id="techstack">
      <div className={styles.inner}>
        <div>
          <h2>Tech Stack</h2>
          <div className={styles.techCards}>
            {stack.map((item, index) => {
              return (
                <div key={index} className={styles.card}>
                  <div className={styles.logo}>
                    <Image src={item.logo} alt={item.name} fill />
                  </div>
                  <div className={styles.content}>
                    <p>{item.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
