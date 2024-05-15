import Head from "next/head";
import "../styles/global.scss";
import Footer from "@/components/Footer/footer";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: any) {
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
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;
