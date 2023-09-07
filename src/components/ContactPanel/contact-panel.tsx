import Link from "next/link";
import styles from "./contact-panel.module.scss";
import Image from "next/image";

const ContactPanel = () => {
  return (
    <section className={styles.contactPanel}>
      <div className="flex items-center justify-center w-full min-h-screen flex-col">
        <span>Let&apos;s work together</span>
        <Link href="https://www.linkedin.com/in/andrew-sayward/">
          <h2>Get in touch!</h2>
          <Image alt="linkedin logo" src="/linkedin.png" width={150} height={150} className="block mx-auto" />
        </Link>
      </div>
    </section>
  );
};

export default ContactPanel;
