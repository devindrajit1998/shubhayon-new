import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Parisienne&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#b30006" />
      </Head>
      <body className="bg-[#fcfaf7] text-[#2d2a2a] antialiased selection:bg-[#c8102e] selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
