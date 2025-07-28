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



type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  ogImage?: string;
  slug: string;
  tags?: string[];
};

type BlogDetailProps = {
  post: BlogMeta;
  mdxSource: MDXRemoteSerializeResult;
  recommended: BlogMeta[];
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const mdxComponents = {
  Image,
  Quote,
  Note,
  Warning,
  Divider,
};

export default function BlogDetailPage({ post, mdxSource, recommended }: BlogDetailProps) {
  const url = `https://tinkon.in/blog/${post.slug}`;
  const ogImage = post.ogImage || post.coverImage || "https://tinkon.in/og-image.webp";
  const canonicalUrl = `https://tinkon.in/blog/${post.slug}`;

  
  return (
    <>
      <Head>
        <title>{`${post.title} — Tink On It`}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} — Tink On It`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `https://tinkon.in${ogImage}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Tink On It`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `https://tinkon.in${ogImage}`} />
        <link rel="canonical" href={canonicalUrl} />
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": ogImage.startsWith('http') ? ogImage : `https://tinkon.in${ogImage}`,
              "author": { "@type": "Person", "name": "Tushar Panchal" },
              "datePublished": post.date,
              "publisher": {
                "@type": "Organization",
                "name": "Tink On It",
                "logo": { "@type": "ImageObject", "url": "https://tinkon.in/og-image.webp" }
              },
              "description": post.description,
              "url": url,
              "mainEntityOfPage": { "@type": "WebPage", "@id": url }
            }),
          }}
        />
        {/* Breadcrumb JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://tinkon.in/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://tinkon.in/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": url
                }
              ]
            })
          }}
        />
      </Head>
      <ReadingProgress />
      <AnimatePresence mode="wait">
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto px-4 py-16"
        >
          

          <motion.div
  initial={false}
  whileHover="hover"
  whileTap="tap"
  className="mb-7"
>
  <Link
    href="/blog"
    className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-100 group transition"
    style={{ textDecoration: "none" }}
    aria-label="Back to all blogs"
  >
    <motion.span
      variants={{
        hover: { x: -4, color: "#EC4899" }, // move arrow left & pink on hover
        tap: { x: -1 },
        initial: { x: 0 },
      }}
      transition={{ type: "spring", stiffness: 320, damping: 25 }}
      className="transition-colors"
    >
      ←
    </motion.span>
    <span
      className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-pink-500 after:transition-all after:duration-200 group-hover:after:w-full"
    >
      Back to all blogs
    </span>
  </Link>
</motion.div>

          {/* Blog cover image */}
          {post.coverImage && (
            <div className="mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={400}
                className="rounded-xl mx-auto shadow-lg"
                style={{ width: "100%", height: "auto" }}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/blur-placeholder.png"
              />
            </div>
          )}


          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>
              Published on {format(new Date(post.date), "dd MMM yyyy")}
            </time>
            <span>—</span>
            <span className="uppercase">{post.category}</span>
          </div>


          {/* Title */}
          <div className="mb-2">
            <h1 className="text-4xl font-bold text-black dark:text-white">{post.title}</h1>
          </div>
          {/* Bookmark and Share */}
          <div className="flex items-center gap-2 mb-2">
            <BookmarkButton slug={post.slug} title={post.title} />
            <SharePopover url={url} title={post.title} />
          </div>

          {/* Description */}
          <p className="text-gray-800 dark:text-gray-200 mb-8">{post.description}</p>
          {/* Blog Content (prose) */}
          <div className="prose prose-lg max-w-none dark:prose-invert dark:text-gray-100">
            <MDXRemote {...mdxSource} components={mdxComponents} />
          </div>
          {/* Recommendations */}
          {recommended && recommended.length > 0 && (
            <>
              <hr className="my-10 border-gray-200 dark:border-gray-700" />
              <div className="mb-2 text-gray-700 dark:text-gray-300 text-lg font-semibold">
                <span>Featured Reads</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                {recommended.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all p-5 group focus:outline-none"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="font-bold text-lg text-black dark:text-white group-hover:text-indigo-500 mb-1 transition-colors">{r.title}</div>
                    <div className="text-xs text-gray-400 uppercase mb-2 tracking-wide">{r.category}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{r.description}</div>
                  </Link>
                ))}
              </div>
            </>
          )}


          {/* --- Post Actions Bar (universal like, bookmark, share) --- */}
          <hr className="my-10 border-gray-200 dark:border-gray-700" />
<div className="flex items-center gap-4 mt-10">
  <Image
    src="/images/profile.webp"
    alt="Tushar Panchal"
    width={60}
    height={60}
    className="rounded-full border border-gray-400"
  />
  <div>
    <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold">Tushar Panchal</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      I&apos;m a chai-fueled introvert writing about whatever comes into mind and the wild world inside our heads.
    </p>
    <Link
      href="/about"
      className="text-xs text-blue-500 hover:underline"
    >
      Read more →
    </Link>
  </div>
</div>

          <PostActionsBar
          />
          <Script id="twitter-event-pixel" strategy="afterInteractive">
            {`
              twq('event', 'tw-q87ph-q87pi', {
                value: null,
                conversion_id: null,
                email_address: null
              });
            `}
          </Script>



          
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Generate static paths for blog posts
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(BLOG_DIR);
  const paths = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      params: { slug: file.replace(/\.mdx$/, "") },
    }));
  return { paths, fallback: false };
};

// Fetch post data and serialize MDX at build time, plus recommendations
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const mdxSource = await serialize(content);

  // Get all posts except current
  const allFiles = fs.readdirSync(BLOG_DIR);
  const allPosts: BlogMeta[] = allFiles
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        ...data,
        slug: file.replace(/\.mdx$/, ""),
        date: data.date ? String(data.date) : "",
      } as BlogMeta;
    })
    .filter((p) => p.slug !== slug);

  // ---- NEW: Smart Recommendation Logic ----
  let recommended: BlogMeta[] = [];

  // 1. Try shared tags
  if (data.tags && Array.isArray(data.tags)) {
    recommended = allPosts.filter(
      (p) =>
        Array.isArray(p.tags) &&
        p.tags.some((tag: string) => data.tags.includes(tag))
    );
  }

  // 2. Same category but not already picked
  if (recommended.length < 2) {
    const more = allPosts.filter(
      (p) =>
        p.category === data.category &&
        !recommended.some((rec) => rec.slug === p.slug)
    );
    recommended = [...recommended, ...more];
  }

  // 3. Recent posts, but not already picked
  if (recommended.length < 2) {
    const more = allPosts
      .filter((p) => !recommended.some((rec) => rec.slug === p.slug))
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    recommended = [...recommended, ...more];
  }

  // ---- Optional: Shuffle or sort by recency to avoid always showing same ----
  recommended = recommended
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return {
    props: {
      post: {
        ...data,
        date: data.date ? String(data.date) : "",
        slug,
      },
      mdxSource,
      recommended,
    },
  };
};
