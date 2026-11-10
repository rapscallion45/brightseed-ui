import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png?v=2"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png?v=2"
      />
      <link rel="manifest" href="/favicon/site.webmanifest?v=2" />
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico?v=2" />
      <meta name="msapplication-TileColor" content="#009EE3" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#009EE3" />
      <link rel="preload" href="/design/agency/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/Questrial-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Head>
  );
}
