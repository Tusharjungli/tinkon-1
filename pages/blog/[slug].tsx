import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";

// Blog post meta type
type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  slug: string;
};

type BlogDetailProps = {
  post: BlogMeta;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export default function BlogDetailPage({ post, content }: BlogDetailProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-blue-600 underline text-sm mb-6 inline-block">
        ← Back to all blogs
      </Link>
      {post.coverImage && (
        <div className="mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-xl object-cover w-full h-72"
            priority
          />
        </div>
      )}
      <div className="flex items-center gap-4 mb-2 text-xs text-gray-500 uppercase">
        <span>{post.category}</span>
        <span>•</span>
        <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">{post.description}</p>
      <div className="prose prose-lg max-w-none">
        {/* MDX content goes here */}
        <MDXProvider>{React.createElement("div", { dangerouslySetInnerHTML: { __html: content } })}</MDXProvider>
      </div>
    </article>
  );
}

// Generate static paths
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(BLOG_DIR);
  const paths = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      params: { slug: file.replace(/\.mdx$/, "") },
    }));
  return { paths, fallback: false };
};

// Get static props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
  props: {
    post: {
      ...data,
      date: data.date ? String(data.date) : "",
      slug,
    },
    content,
  },
};

};
