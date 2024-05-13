import Head from "next/head";
import "../styles/global.scss";
import Footer from "@/components/Footer/footer";
import PinnerContainer from "@/atoms/pinner-container/pinner-container";

function MyApp({ Component, pageProps, router }: any) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
