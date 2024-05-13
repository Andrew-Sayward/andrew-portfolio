import Head from "next/head";

function MyApp({ Component, pageProps, router }: any) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
