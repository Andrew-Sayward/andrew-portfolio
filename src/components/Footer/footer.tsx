import styles from "./footer.module.scss";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <h3>Get in touch</h3>
          <div className={styles.socials}>
            <a href="https://www.linkedin.com/in/andrew-sayward/" target="_blank">
              <Image src="/linkedin-black.png" alt="" fill />
            </a>
            <a href="mailto:andrewsayward@hotmail.co.uk" target="_blank">
              <Image src="/black-email.png" alt="" fill />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
