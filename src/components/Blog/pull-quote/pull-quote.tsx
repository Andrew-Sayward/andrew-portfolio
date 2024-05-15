import { FC } from "react";
import styles from "./pull-quote.module.scss";

interface PullQuoteProps {
  quote: string;
}

const PullQuote: FC<PullQuoteProps> = ({ quote }) => (
  <>
    <div className={`${styles.quote}`}>
      <p>{quote}</p>
    </div>
  </>
);

export default PullQuote;
