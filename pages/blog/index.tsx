// pages/blog/index.tsx
import Head from "next/head";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";

// Breadcrumb component
const Breadcrumbs = () => (
  <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
    <ol className="list-reset flex">
      <li>
        <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
      </li>
      <li>
        <span className="mx-2">/</span>
      </li>
      <li className="text-black dark:text-white font-semibold">Blog</li>
    </ol>
  </nav>
);

type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  tags?: string[];
  slug: string;
};

const CATEGORIES = [
  "All",
  "Mind & Emotions",
  "Life & Growth",
  "Tech & Tools",
  "Spiritual & Beliefs",
  "Addiction & Escape",
  "Personal Stories",
  "Society & Culture",
];

// Helper: Count posts per category
const getCategoryCounts = (posts: BlogMeta[]) => {
  const counts: { [cat: string]: number } = { All: posts.length };
  posts.forEach((post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
  });
  return counts;
};

export default function BlogIndexPage({
  posts,
  allPosts,
  tag,
  noindex,
}: {
  posts: BlogMeta[];
  allPosts: BlogMeta[];
  tag?: string | null;
  noindex?: boolean;
}) {
  const router = useRouter();
  const selected =
    typeof router.query.category === "string"
      ? router.query.category
      : tag || "All";

  const categoryCounts = useMemo(() => getCategoryCounts(allPosts), [allPosts]);
  const filtered = posts; // posts already filtered on server

  const canonicalUrl = "https://tinkon.in/blog";

  return (
    <>
      <Head>
        <title>Read Real Blogs on Life, Growth, Dogs, and Thoughts — Tink On It</title>
        <meta
          name="description"
          content="Read raw, real blogs from Tushar on life, dogs, introversion, personal growth, and the noisy mind of a thinker. Honest stories, no filters."
        />
        <meta name="keywords" content="Tushar blog, life stories, introvert blog, thoughts, personal growth, dog lover, Haryana blog, real experiences, overthinking, tinkon.in" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Read Real Blogs on Life, Growth, Dogs, and Thoughts — Tink On It" />
        <meta property="og:description" content="Raw thoughts and real blogs from Tushar — covering life, dogs, personal growth, introvert musings and more." />
        <meta property="og:image" content="https://tinkon.in/og-image.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Read Real Blogs on Life, Growth, Dogs, and Thoughts — Tink On It" />
        <meta name="twitter:description" content="Raw thoughts and real blogs from Tushar — covering life, dogs, personal growth, introvert musings and more." />
        <meta name="twitter:image" content="https://tinkon.in/og-image.webp" />

        {/* Structured Data: Website Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Tink On It",
              "description": "Honest blogs from Tushar Panchal on life, growth, introversion, dogs, and deep thoughts.",
              "url": "https://tinkon.in/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Tink On It",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://tinkon.in/og-image.webp"
                }
              }
            })
          }}
        />
        {noindex && <meta name="robots" content="noindex,follow" />}
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="mb-8 text-gray-700 dark:text-gray-300 text-base max-w-2xl">
          Explore real, unfiltered blogs by me on life, growth, dogs, introversion, mental health, and surviving the chaos of modern life. Every post is hand-written and 100% original.
        </p>
        {/* Category Filter with Counts */}
        <div className="flex flex-wrap gap-3 mb-10 bg-white dark:bg-gray-950 py-2 transition-colors">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
              scroll={false}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition
                ${selected === cat
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"}
              `}
              style={{ textDecoration: "none" }}
              aria-label={`Show posts in category ${cat}`}
            >
              {cat}
              <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-400">({categoryCounts[cat] || 0})</span>
            </Link>
          ))}
        </div>
        {/* Blog Cards */}
        <section aria-label="Blog posts">
          <ul>
            {filtered.length === 0 && (
              <div className="text-gray-600 dark:text-gray-400 italic text-center py-16">
                No posts found for this category.
              </div>
            )}
            {filtered.map((post) => (
              <li key={post.slug} className="mb-8 pb-6 border-b last:border-b-0 last:pb-0 list-none">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group focus:outline-none cursor-pointer transition"
                  style={{ textDecoration: "none" }}
                  tabIndex={0}
                  aria-label={`Read blog: ${post.title}`}
                >
                  <article
                    className={`
                      flex flex-col sm:flex-row items-start gap-6
                      bg-white dark:bg-gray-950 rounded-xl shadow-sm transition-colors
                      px-5 py-4
                      border border-transparent
                      group-hover:bg-gray-50 dark:group-hover:bg-gray-900
                      group-focus:ring-2 group-focus:ring-indigo-200 dark:group-focus:ring-gray-800
                    `}
                    style={{
                      boxShadow: "0 1px 4px rgba(20,20,20,0.04)",
                    }}
                    aria-label={`Blog post: ${post.title}`}
                  >
                    {/* Cover Image */}
                    <div className="w-full sm:w-40 flex-shrink-0 mb-4 sm:mb-0">
                      <Image
                        src={post.coverImage}
                        alt={`Cover for: ${post.title} — ${post.category}`}
                        width={180}
                        height={120}
                        className="rounded-xl object-cover w-full h-28 shadow-sm"
                        loading="lazy"
                      />
                    </div>
                    {/* Blog Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-black dark:text-white group-hover:underline transition-colors mb-1">
                        {post.title}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                        {post.date ? format(new Date(post.date), "dd MMM yyyy") : ""} — <span className="uppercase">{post.category}</span>
                      </p>
                      <p className="mb-1 text-gray-800 dark:text-gray-200 line-clamp-3">{post.description}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.tags.map(tag => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="inline-block bg-gray-100 dark:bg-gray-800 text-xs px-2 py-1 rounded-full text-gray-600 dark:text-gray-300 font-medium"
                              style={{ textDecoration: "none" }}
                              aria-label={`Show posts tagged ${tag}`}
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {/* Improved Focus ring style for accessibility */}
        <style jsx global>{`
          a:focus-visible {
            outline: 2px solid #6366F1 !important;
            outline-offset: 2px;
          }
        `}</style>
        <div className="mt-10 flex justify-center">
          <Link href="/" className="text-indigo-600 underline hover:text-indigo-800 text-sm" aria-label="Back to Home">
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

// This runs on each request so we can detect query (category) and decide noindex
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { getAllPosts } = await import("@/lib/blog");
  const allPosts: BlogMeta[] = getAllPosts();

  const category = typeof context.query.category === "string" ? context.query.category : null;

  // Filter posts server-side if a category query param is present (and not "All")
  const posts = category && category !== "All"
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  // Decide whether to noindex: tag pages with fewer than 3 posts
  const noindex = !!category && posts.length < 3;

  return {
    props: {
      posts,
      allPosts,
      tag: category,
      noindex
    },
  };
};