// components/SeoHead.tsx
import Head from "next/head";
import { useRouter } from "next/router";

export default function SeoHead({
  title,
  description,
  robots = "index,follow",
  cover,              // absolute or relative
  type = "article",   // "website" | "article"
  siteName = "Tink On It",
}: {
  title: string;
  description: string;
  robots?: string;
  cover?: string;
  type?: "website" | "article";
  siteName?: string;
}) {
  const { asPath } = useRouter();
  const path = (asPath?.split("?")[0] || "/");
  const canonical = `https://tinkon.in${path.endsWith("/") ? path : path + "/"}`;
  const ogImage = cover
    ? (cover.startsWith("http") ? cover : `https://tinkon.in${cover}`)
    : "https://tinkon.in/og-image.webp";

  return (
    <Head>
      {/* Basic */}
      <title>{`${title} — ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={`${title} — ${siteName}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} — ${siteName}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
