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
  mdxSource: MDXRemoteSerializeResult;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// MDX custom components mapping
const mdxComponents = {
  Image,
  Quote,
  Note,
  Warning,
  Divider,
};

export default function BlogDetailPage({ post, mdxSource }: BlogDetailProps) {
  return (
    <>
      <Head>
        <title>{`${post.title} — Tink On It`}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} — Tink On It`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.coverImage || "https://tinkon.in/og-image.jpg"} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://tinkon.in/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Tink On It`} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.coverImage || "https://tinkon.in/og-image.jpg"} />
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": post.coverImage,
              "author": {
                "@type": "Person",
                "name": "Tushar Panchal"
              },
              "datePublished": post.date,
              "publisher": {
                "@type": "Organization",
                "name": "Tink On It",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://tinkon.in/og-image.jpg"
                }
              },
              "description": post.description,
              "url": `https://tinkon.in/blog/${post.slug}`,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://tinkon.in/blog/${post.slug}`
              }
            }),
          }}
        />
      </Head>
      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-400 mb-3">
          <Link href="/" className="hover:underline">Home</Link> /{" "}
          <Link href="/blog" className="hover:underline">Blog</Link> /{" "}
          <span className="text-gray-500">{post.title}</span>
        </nav>
        {/* Back link */}
        <Link href="/blog" className="text-blue-600 underline text-sm mb-6 inline-block">
          ← Back to all blogs
        </Link>
        {/* Blog cover image */}
        {post.coverImage && (
          <div className="mb-8">
            <Image
              src={post.coverImage}
              alt={`Cover image for blog post '${post.title}'`}
              width={800}
              height={400}
              className="rounded-xl object-contain w-full max-h-[400px] bg-gray-100"
              priority
            />
          </div>
        )}
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 uppercase mb-4">
        <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
        <span>—</span>
        <span>{post.category}</span>
      </div>
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {/* Description */}
        <p className="text-gray-600 mb-8">{post.description}</p>
        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote {...mdxSource} components={mdxComponents} />
        </div>
        {/* Internal linking - Related posts (customize these links) */}
        <hr className="my-10" />
        <div className="text-gray-600 text-base">
          <strong>Liked this?</strong> You might also enjoy:
          <ul className="list-disc list-inside mt-2">
            <li>
              <Link href="/blog/building-tinkon" className="underline text-indigo-600">
                Building Tinkon: The Messy, Honest Truth
              </Link>
            </li>
            <li>
              <Link href="/blog/hello-world" className="underline text-indigo-600">
                Hello World (First Blog)
              </Link>
            </li>
            {/* Add/change links as you write more blogs */}
          </ul>
        </div>
      </article>
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

// Fetch post data and serialize MDX at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const mdxSource = await serialize(content);

  return {
    props: {
      post: {
        ...data,
        date: data.date ? String(data.date) : "",
        slug,
      },
      mdxSource,
    },
  };
};
