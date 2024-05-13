import { RefObject, useEffect, useState } from "react";

export default function useInViewport(
  ref: RefObject<Element & HTMLElement>,
  threshold: number
): boolean {
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: threshold
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return isInViewport;
}
