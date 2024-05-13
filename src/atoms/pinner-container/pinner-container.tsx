import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "./pinner-container.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import useMediaQuery from "../../hooks/useMediaQuery";
import useDelay from "../../hooks/useDelay";

gsap.registerPlugin(ScrollTrigger);

interface PinnerContainerProps extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
  pinStart?: number;
  pin?: boolean;
  disableOnMobile?: boolean; // New optional prop
  disableOnModalPopup?: boolean; // New optional prop
  disablePinner?: boolean;
  onRefresh?: Function;
  delayTime?: number;
  noShaddow?: boolean;
  animation?: { targets: gsap.TweenTarget; vars: gsap.TweenVars };
}

export default function PinnerContainer({
  className = "",
  style,
  children,
  pinStart,
  pin = true,
  disableOnMobile = false, // Set default value
  disableOnModalPopup = false, // Set default value
  delayTime = 0,
  noShaddow,
  animation,
  disablePinner = false,
}: PinnerContainerProps) {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const delay = useDelay();
  const [height, setHeight] = useState(0);
  const isMobileOrLandscapeTablet = useMediaQuery("(max-height: 480px) and (orientation: landscape)");

  useEffect(() => {
    if (isMobileOrLandscapeTablet) return;
    if (disableOnMobile && isMobile) return; // Skip pinning if disabled on mobile
    if (disableOnModalPopup) return; // Skip pinning if disabled on mobile
    if (disablePinner) return;
    if (!containerRef.current) return;
    const calculatedStart = pinStart || containerRef.current.getBoundingClientRect().height - window.innerHeight;
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${pinStart || calculatedStart > 0 ? calculatedStart : "top"} top`,
          pin: pin,
          pinSpacing: false,
          scrub: animation ? true : false,
          // markers: true
        },
      });
      if (animation) {
        tl.current.to(animation.targets, animation.vars);
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableOnMobile, disableOnModalPopup, isMobile, height]); // Add dependencies

  // Observe height of section
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;
      delay(() => {
        setHeight(height);
      }, delayTime);
    });
    if (childrenRef.current) {
      observer.observe(childrenRef.current);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <div className={className} style={style}>
      {isMobile && disableOnMobile ? (
        <div>{children}</div>
      ) : (
        <div ref={containerRef} className={`${styles.container} ${noShaddow ? styles.noShaddow : ""}`}>
          <div ref={childrenRef}>{children}</div>
        </div>
      )}
    </div>
  );
}
