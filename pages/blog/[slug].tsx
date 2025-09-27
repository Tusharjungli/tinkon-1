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
      </Head>
      <ReadingProgress />

      <NewsletterPopup
        slug={post.slug}
        showAfterPercent={45}
        SHEET_ENDPOINT="https://script.google.com/macros/s/AKfycbxCe1yKf0pNIAI-2za0R3yUqFVbaSe4bsrwWO4Xbe7YUY0xN-Am9mj_lAQucFZNntuBNg/exec"
        FORMSPREE_ENDPOINT="https://formspree.io/f/xeolqlle"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto px-4 py-16"
        >
          <motion.div initial={false} whileHover="hover" whileTap="tap" className="mb-7">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-100 group transition"
              style={{ textDecoration: "none" }}
              aria-label="Back to all blogs"
            >
              <motion.span
                variants={{
                  hover: { x: -4, color: "#EC4899" },
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
            {post.lastUpdated && (
              <>
                <span>•</span>
                <time dateTime={post.lastUpdated} title={`Last updated on ${format(new Date(post.lastUpdated), "dd MMM yyyy")}`}>
                  Last updated {format(new Date(post.lastUpdated), "dd MMM yyyy")}
                </time>
              </>
            )}
            <span>•</span>
            <span>{readingTime} min read</span>
            <span>•</span>
            <span className="uppercase">{post.category}</span>
          </div>

          {/* Tags as clickable chips */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-block bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-100 text-xs font-semibold px-3 py-1 rounded-full hover:bg-pink-200 dark:hover:bg-pink-700 transition"
                  style={{ textDecoration: "none" }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <div className="mb-2">
            <Breadcrumbs title={post.title} />
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

          {/* --- Dynamic Author Box (uses data/authors.json) --- */}
          <div className="flex items-center gap-4 mt-10 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 shadow-sm">
            <Image
              src={authorData.avatar || "/images/profile.webp"}
              alt={authorData.name}
              width={60}
              height={60}
              className="rounded-full border border-gray-300"
            />
            <div>
              <p className="text-sm font-bold text-black dark:text-white">{authorData.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {authorData.bio}
              </p>
              <Link
                href={authorData.url || "/about"}
                className="text-xs text-blue-500 hover:underline"
              >
                Read more about me →
              </Link>
            </div>
          </div>

          <PostActionsBar />

          <CommentsForm endpoint="https://formspree.io/f/xldwzloz" postSlug={post.slug} />

          {/* --- Previous/Next Navigation --- */}
          {(previousPost || nextPost) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-14">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.slug}`}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 px-4 py-4 rounded-lg hover:shadow transition hover:scale-[1.04] text-left"
                  style={{ textDecoration: "none" }}
                >
                  <div className="text-xs text-gray-500 mb-1">← Previous</div>
                  <div className="font-semibold text-black dark:text-white">{previousPost.title}</div>
                </Link>
              ) : <div className="flex-1" />}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 px-4 py-4 rounded-lg hover:shadow transition hover:scale-[1.04] text-right"
                  style={{ textDecoration: "none" }}
                >
                  <div className="text-xs text-gray-500 mb-1">Next →</div>
                  <div className="font-semibold text-black dark:text-white">{nextPost.title}</div>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          )}

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

// Fetch post data and serialize MDX at build time, plus recommendations, prev/next
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.dx`); // fallback in case of extension mismatch
  const filePathMdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const actualPath = fs.existsSync(filePathMdx) ? filePathMdx : filePath;
  const source = fs.readFileSync(actualPath, "utf8");
  const { data, content } = matter(source);

  const mdxSource = await serialize(content);

  // Calculate reading time using `reading-time`
  const readStats = readingTime(content);

  // Get all posts, sorted by date DESC (newest first)
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
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Find current index for prev/next
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = idx > 0 ? allPosts[idx - 1] : null;
  const nextPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;

  // Remove current post for recommendations
  const otherPosts = allPosts.filter((p) => p.slug !== slug);

  // ---- Smart Recommendation Logic ----
  let recommended: BlogMeta[] = [];
  if (data.tags && Array.isArray(data.tags)) {
    recommended = otherPosts.filter(
      (p) =>
        Array.isArray(p.tags) &&
        p.tags.some((tag: string) => data.tags.includes(tag))
    );
  }
  if (recommended.length < 2) {
    const more = otherPosts.filter(
      (p) =>
        p.category === data.category &&
        !recommended.some((rec) => rec.slug === p.slug)
    );
    recommended = [...recommended, ...more];
  }
  if (recommended.length < 2) {
    const more = otherPosts
      .filter((p) => !recommended.some((rec) => rec.slug === p.slug))
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    recommended = [...recommended, ...more];
  }
  recommended = recommended
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return {
    props: {
      post: {
        ...data,
        date: data.date ? String(data.date) : "",
        lastUpdated: data.lastUpdated || data.updated || "",
        slug,
      },
      mdxSource,
      recommended,
      readingTime: Math.round(readStats.minutes),
      previousPost,
      nextPost,
    },
  };
};