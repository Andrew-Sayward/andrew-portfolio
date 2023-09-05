"use client";

import { useEffect } from "react";
import styles from "./three-columns.module.scss";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const ThreeColumns = () => {
  return (
    <section className={`${styles.threeColumns} min-h-screen`}>
      <div className={styles.column1}></div>
      <div className={styles.column2}></div>
      <div className={styles.column3}></div>
    </section>
  );
};

export default ThreeColumns;
