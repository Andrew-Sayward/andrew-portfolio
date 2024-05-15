import { FC } from "react";
import styles from "./subheading.module.scss";

interface SubheadingProps {
  subheading: string;
}

const Subheading: FC<SubheadingProps> = ({ subheading }) => (
  <>
    <div className={`${styles.subheading}`}>
      <h2>{subheading}</h2>
    </div>
  </>
);

export default Subheading;
