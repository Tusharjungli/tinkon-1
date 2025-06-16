// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts (Poppins fallback for older browsers) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Basic SEO */}
        <meta
          name="description"
          content="Tink On It – Real, raw stories on life, dogs, tech, and the journey of an introvert."
        />
        <meta
          name="keywords"
          content="blog, introvert, dogs, tech, life, maturity, brainstorming, personal stories, Tushar Panchal"
        />
        <meta name="author" content="Tushar Panchal" />
        <link rel="canonical" href="https://tinkon.in/" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Tink On It" />
        <meta
          property="og:description"
          content="Real, raw stories for introverts, dog lovers, and anyone seeking honest connection."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinkon.in/" />
        <meta property="og:image" content="https://tinkon.in/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tink On It" />
        <meta
          name="twitter:description"
          content="Real, raw stories for introverts, dog lovers, and more."
        />
        <meta name="twitter:image" content="https://tinkon.in/og-image.jpg" />

        {/* Google AdSense code for site verification */}
        <Script
          id="adsense-init"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2523023048414648"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
