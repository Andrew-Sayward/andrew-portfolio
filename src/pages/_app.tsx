import Head from "next/head";
import "../styles/global.scss";
import Footer from "@/components/Footer/footer";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: any) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default MyApp;
