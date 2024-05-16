import { useEffect } from "react";
import { useRouter } from "next/router";

const useMaintainStyles = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      requestAnimationFrame(() => {
        const nodes = document.querySelectorAll("link[rel=stylesheet], style");
        const copies = Array.from(nodes).map((el) => el.cloneNode(true));

        copies.forEach((copy) => {
          if (copy instanceof Element) {
            copy.removeAttribute("data-n-p");
            copy.removeAttribute("data-n-href");
            document.head.appendChild(copy);
          }
        });

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

        return () => clearTimeout(cleanupTimeout);
      });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);
};

export default useMaintainStyles;
