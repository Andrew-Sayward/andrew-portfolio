import styles from "./hero.module.scss";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container mx-auto lg:flex h-full items-center relative min-h-screen">
        <div className="py-10 lg:py-0 absolute lg:relative z-10 w-full lg:w-6/12" style={{ background: "#f9cf15;" }}>
          <h1 className="font-bold text-3xl lg:text-6xl w-full">
            Hi!
            <br />
            My Name Is
            <br />
            <span>Andrew</span>
          </h1>
        </div>
        <div className="w-full lg:w-6/12">
          <div className="w-full min-h-mob lg:min-h-screen absolute bottom-0 lg:relative">
            <Image fill src="/andrew.jpeg" alt="" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
