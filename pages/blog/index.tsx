import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";

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
  "Dogs",
  "Life",
  "Maturity",
  "Tech",
  "Brainstorming",
  "Spiritual",
  "Personal Stories",
  "Introvert",
];

export default function BlogIndexPage({ posts }: { posts: BlogMeta[] }) {
  const router = useRouter();
  const canonicalUrl = `https://tinkon.in${router.asPath === "/blog" ? "/blog" : router.asPath.split("?")[0]}`;
  const selected =
    typeof router.query.category === "string" ? router.query.category : "All";

  const filtered = useMemo(() => {
    if (selected === "All" || !selected) return posts;
    return posts.filter((post) => post.category === selected);
  }, [selected, posts]);

  return (
    <>
      <Head>
        <title>Blog — Tink On It</title>
        <meta name="description" content="Browse Tushar's real, raw stories on dogs, life, tech, maturity, and more. Filter by category for introverts, thinkers, and dog people." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Blog — Tink On It" />
        <meta property="og:description" content="Browse Tushar's real, raw stories on dogs, life, tech, maturity, and more. Filter by category for introverts, thinkers, and dog people." />
        <meta property="og:image" content="https://tinkon.in/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog — Tink On It" />
        <meta name="twitter:description" content="Browse Tushar's real, raw stories on dogs, life, tech, maturity, and more. Filter by category for introverts, thinkers, and dog people." />
        <meta name="twitter:image" content="https://tinkon.in/og-image.jpg" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10 bg-white dark:bg-gray-950 py-2 transition-colors">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
              shallow
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition
                ${selected === cat
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:text-black dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"}`}
              style={{ textDecoration: "none" }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Blog Cards */}
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
              >
                <motion.div
                  whileHover={{ scale: 1.015, boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 330, damping: 25 }}
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
                >
                  {/* Cover Image */}
                  <div className="w-full sm:w-40 flex-shrink-0 mb-4 sm:mb-0">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={180}
                      height={120}
                      className="rounded-xl object-cover w-full h-28 shadow-sm"
                    />
                  </div>
                  {/* Blog Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-black dark:text-white group-hover:underline transition-colors mb-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                      {format(new Date(post.date), "dd MMM yyyy")} — <span className="uppercase">{post.category}</span>
                    </p>
                    <p className="mb-1 text-gray-800 dark:text-gray-200 line-clamp-3">{post.description}</p>
                  </div>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
        {/* Hide the default focus ring on links (make it accessible, but subtle) */}
        <style jsx global>{`
          a:focus {
            outline: none !important;
          }
        `}</style>
      </div>
    </>
  );
}

// This runs only on the server at build time!
export const getStaticProps: GetStaticProps = async () => {
  const { getAllPosts } = await import("@/lib/blog");
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
