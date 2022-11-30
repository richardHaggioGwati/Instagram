/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../css/global.css';
import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps }: AppProps, { session }: any) => {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Instagram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default MyApp;
