import { useMemo } from "react";
import { gsap } from "gsap";

function useGsapContext(scope?: string | object | Element | undefined) {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return ctx;
}

export default useGsapContext;
