// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic SEO */}
        <meta name="description" content="Tink On It – Real, raw stories on life, dogs, tech, and the journey of an introvert." />
        <meta name="keywords" content="blog, introvert, dogs, tech, life, maturity, brainstorming, personal stories, Tushar Panchal" />
        <meta name="author" content="Tushar Panchal" />
        <link rel="canonical" href="https://tinkon.in/" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content="Tink On It" />
        <meta property="og:description" content="Real, raw stories for introverts, dog lovers, and anyone seeking honest connection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinkon.in/" />
        <meta property="og:image" content="https://tinkon.in/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tink On It" />
        <meta name="twitter:description" content="Real, raw stories for introverts, dog lovers, and more." />
        <meta name="twitter:image" content="https://tinkon.in/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
