import Head from "next/head";
import "../styles/global.scss";
import Footer from "@/components/Footer/footer";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import GridTransition from "@/helpers/page-transition";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      requestAnimationFrame(() => {
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
              if (copy instanceof Element) {
                // Ensure the node is an Element
                document.head.removeChild(copy);
              }
            });
          });
        };

        // Setup cleanup after animation completes
        // Assuming a fixed transition duration, adjust as needed
        setTimeout(cleanup, 3000); // Adjust this timeout to your transition duration
      });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []); // Empty dependency array to run only once

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
      </Head>
      <AnimatePresence>
        <GridTransition>
          <Component {...pageProps} key={router.asPath} />
        </GridTransition>
        <Footer />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
