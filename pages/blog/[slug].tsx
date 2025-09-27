// pages/blog/[slug].tsx
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Quote from "../../components/Quote";
import Note from "../../components/Note";
import Warning from "../../components/Warning";
import Divider from "../../components/Divider";
import BookmarkButton from "../../components/BookmarkButton";
import SharePopover from "../../components/SharePopover";
import { AnimatePresence, motion } from "framer-motion";
import ReadingProgress from "../../components/ReadingProgress";
import PostActionsBar from "../../components/PostActionsBar";
import Script from "next/script";
import readingTime from "reading-time";
import NewsletterPopup from "../../components/NewsletterPopup";
import CommentsForm from "../../components/CommentsForm";

// Import authors data (create data/authors.json at repo root)
import authorsData from "../../data/authors.json";

type Author = {
  name: string;
  title?: string;
  bio?: string;
  avatar?: string;
  url?: string;
  twitter?: string;
};

const authors: Record<string, Author> = authorsData as Record<string, Author>;

type BlogMeta = {
  title: string;
  description: string;
  date: string;
  lastUpdated?: string;
  category: string;
  coverImage?: string;
  ogImage?: string;
  slug: string;
  tags?: string[];
  author?: string;
};

type BlogDetailProps = {
  post: BlogMeta;
  mdxSource: MDXRemoteSerializeResult;
  recommended: BlogMeta[];
  readingTime: number;
  previousPost?: BlogMeta | null;
  nextPost?: BlogMeta | null;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const mdxComponents = {
  Image,
  Quote,
  Note,
  Warning,
  Divider,
};

const Breadcrumbs = ({ title }: { title: string }) => (
  <nav className="text-xs text-gray-400 dark:text-gray-500 mb-4" aria-label="breadcrumb">
    <ol className="flex items-center gap-1">
      <li>
        <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
      </li>
      <li><span>/</span></li>
      <li>
        <Link href="/blog" className="hover:text-black dark:hover:text-white">Blog</Link>
      </li>
      <li><span>/</span></li>
      <li className="text-black dark:text-white font-semibold">{title.length > 25 ? title.slice(0, 25) + "..." : title}</li>
    </ol>
  </nav>
);

export default function BlogDetailPage({ post, mdxSource, recommended, readingTime, previousPost, nextPost }: BlogDetailProps) {
  const url = `https://tinkon.in/blog/${post.slug}`;
  const ogImage = post.ogImage || post.coverImage || "https://tinkon.in/og-image.webp";
  const canonicalUrl = `https://tinkon.in/blog/${post.slug}`;

  // pick author data from data/authors.json, fallback to default "tushar-panchal"
  const authorSlug = post.author || "tushar-panchal";
  const authorData: Author =
    authors[authorSlug] ||
    authors["tushar-panchal"] || {
      name: "Tushar Panchal",
      title: "Writer",
      bio: "I write about life, growth and dogs.",
      avatar: "/images/profile.webp",
      url: "/about",
      twitter: "",
    };

  // JSON-LD for structured data - include author info
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: ogImage.startsWith("http") ? ogImage : `https://tinkon.in${ogImage}`,
    author: { "@type": "Person", name: authorData.name, url: `https://tinkon.in${authorData.url || "/about"}` },
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
    publisher: {
      "@type": "Organization",
      name: "Tink On It",
      logo: { "@type": "ImageObject", url: "https://tinkon.in/og-image.webp" },
    },
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tinkon.in/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://tinkon.in/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <> 
      <Head>
        <title>{`${post.title} — Tink On It`}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} — Tink On It`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `https://tinkon.in${ogImage}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Tink On It`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage.startsWith("http") ? ogImage : `https://tinkon.in${ogImage}`} />
        <link rel="canonical" href={canonicalUrl} />
        {/* SEO Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Breadcrumb JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>
      <ReadingProgress />
      {/* ...rest of the file remains unchanged... */}
    </>
  );
}

// ...rest of the file remains unchanged...