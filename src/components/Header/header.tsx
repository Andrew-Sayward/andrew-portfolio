import { motion } from "framer-motion";
import styles from "./header.module.scss";

type Props = {
  hasScrolled: boolean;
};

const Header = ({ hasScrolled }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
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
      </div>
    </header>
  );
};

export default Header;
