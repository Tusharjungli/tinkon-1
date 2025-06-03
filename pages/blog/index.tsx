import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

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
  "Personal Stories",
  "Introvert",
];

export default function BlogIndexPage({ posts }: { posts: BlogMeta[] }) {
  // Category filter from query (?category=...)
  const router = useRouter();
  const selected =
    typeof router.query.category === "string" ? router.query.category : "All";

  const filtered = useMemo(() => {
    if (selected === "All" || !selected) return posts;
    return posts.filter((post) => post.category === selected);
  }, [selected, posts]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="flex flex-wrap gap-3 mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
            shallow
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
              selected === cat
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
      <ul>
        {filtered.length === 0 && (
          <div className="text-gray-500 italic text-center py-16">
            No posts found for this category.
          </div>
        )}
        {filtered.map((post) => (
          <li key={post.slug} className="mb-8 border-b pb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold hover:underline">{post.title}</h2>
            </Link>
            <p className="text-gray-400 text-sm mt-1 mb-2">
              {post.date} — <span className="uppercase">{post.category}</span>
            </p>
            <p className="mb-1">{post.description}</p>
            {/* You can add a cover image preview here if you want */}
          </li>
        ))}
      </ul>
    </div>
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
