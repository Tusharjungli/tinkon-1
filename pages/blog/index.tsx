import { GetStaticProps } from "next";
import Link from "next/link";

type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  tags?: string[];
  slug: string;
};

export default function BlogIndexPage({ posts }: { posts: BlogMeta[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold">{post.title}</h2>
            </Link>
            <p className="text-gray-500">{post.date} — {post.category}</p>
            <p>{post.description}</p>
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
