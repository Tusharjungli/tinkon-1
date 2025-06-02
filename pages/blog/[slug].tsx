import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  tags?: string[];
  slug: string;
  content: string;
};

export default function BlogDetailPage({ post }: { post: BlogMeta }) {
  // 🚩 THIS MUST BE SYNC!
  if (!post) return <div>Not found</div>;
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-2xl object-cover"
        />
      </div>
      <span className="text-xs text-gray-500 uppercase">{post.category}</span>
      <h1 className="text-4xl font-bold mb-4 mt-2">{post.title}</h1>
      <p className="text-md text-gray-700 mb-6">{post.description}</p>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
      <div className="mt-8 text-xs text-gray-400">{post.date}</div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllPosts } = await import("@/lib/blog");
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { getPostBySlug } = await import("@/lib/blog");
  const post = getPostBySlug(context.params!.slug as string);
  return {
    props: {
      post,
    },
  };
};
