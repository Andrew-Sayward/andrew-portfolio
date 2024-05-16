import { useEffect } from "react";
import { useRouter } from "next/router";

const useMaintainStyles = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Clone only essential style nodes to reduce overhead
      const nodes = document.querySelectorAll("link[rel=stylesheet], style");
      const copies = Array.from(nodes).map((el) => el.cloneNode(true));

      copies.forEach((copy) => {
        if (copy instanceof Element) {
          // Ensure the node is an Element
          copy.removeAttribute("data-n-p");
          copy.removeAttribute("data-n-href");
          document.head.appendChild(copy);
        }
      });

      // Cleanup function
      const cleanup = () => {
        requestAnimationFrame(() => {
          copies.forEach((copy) => {
            try {
              if (copy instanceof Element) {
                document.head.removeChild(copy);
              }
            } catch (error) {
              console.error("Error during cleanup:", error);
            }
          });
        });
      };

      // Adjust the timeout to match your transition duration
      const transitionDuration = 3000;
      const cleanupTimeout = setTimeout(cleanup, transitionDuration);

      // Clear timeout in case of rapid route changes
      return () => clearTimeout(cleanupTimeout);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.events]);
};

export default useMaintainStyles;
