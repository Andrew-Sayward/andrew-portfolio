import { useState, useEffect } from "react";

/**
 * A hook that checks if the window width is below a specified breakpoint.
 * @param breakpoint The breakpoint (in pixels) to compare the window width against.
 * @returns True if the window width is below the breakpoint, false otherwise.
 */

export function useMediaQuery(mediaQueryString: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window and matchMedia are available to avoid SSR issues
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQueryList = window.matchMedia(mediaQueryString);
      const updateMatches = ({ matches }: MediaQueryListEvent) => {
        setMatches(matches);
      };

      // Set initial state based on the media query
      setMatches(mediaQueryList.matches);

      // Listen for changes in the media query
      mediaQueryList.addEventListener("change", updateMatches);

      // Clean up by removing the event listener
      return () => mediaQueryList.removeEventListener("change", updateMatches);
    }
  }, [mediaQueryString]);

  return matches;
}

function useWindowWidthBelowBreakpoint(breakpoint: number): boolean {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    function checkWindowSize() {
      // Check if the window width is below the breakpoint and update state
      setIsBelowBreakpoint(window.innerWidth < breakpoint);
    }

    // Add resize event listener
    window.addEventListener("resize", checkWindowSize);

    // Check initial window size
    checkWindowSize();

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [breakpoint]); // Dependency on breakpoint ensures that the effect updates if the breakpoint changes

  return isBelowBreakpoint;
}

export default useWindowWidthBelowBreakpoint;
