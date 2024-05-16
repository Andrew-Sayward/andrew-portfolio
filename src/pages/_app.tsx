import Head from "next/head";
import "../styles/global.scss";
import Footer from "@/components/Footer/footer";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import GridTransition from "@/helpers/page-transition";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

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
