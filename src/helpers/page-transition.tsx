import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import useMaintainStyles from "@/hooks/useMaintainStyles";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [showBlock, setShowBlock] = useState(false);
  const hasMountedRef = useRef(false);
  const router = useRouter();
  const pathWithoutQuery = router.asPath.split("?")[0];
  useMaintainStyles();

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setShowBlock(true);

    const timer = setTimeout(() => {
      setShowBlock(false);
    }, 1500); // This includes a buffer for the transition duration

    return () => clearTimeout(timer);
  }, [pathWithoutQuery]);

  const transition = { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] };

  return (
    <>
      <AnimatePresence mode="wait">
        {showBlock && (
          <>
            <motion.div
              className={styles.block}
              key="page-transition-top"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={transition}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                backgroundColor: "#000", // Customize your color
                zIndex: 1000,
                width: "50%",
              }}
            />
            <motion.div
              className={styles.block}
              key="page-transition-bottom"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={transition}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#000", // Customize your color
                zIndex: 1000,
                width: "50%",
              }}
            />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathWithoutQuery}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={styles.container}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
