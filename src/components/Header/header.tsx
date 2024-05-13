import { motion } from "framer-motion";
import styles from "./header.module.scss";
import Link from "next/link";

type Props = {
  hasScrolled: boolean;
};

const Header = ({ hasScrolled }: Props) => {
  return (
    <header className={`${styles.header} ${hasScrolled ? styles.mobileHeader : ""}`}>
      <div className={styles.inner}>
        <Link href="#home">
          <div className={styles.logoOutter}>
            <span className={styles.logo}>:{"}"}</span>
            {hasScrolled && (
              <motion.span className={styles.name} layoutId="andrew-h1">
                Andrew
                <br />
                Sayward
              </motion.span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
