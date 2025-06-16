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
import { motion } from "framer-motion";

type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  ogImage?: string; // custom OG image
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
  const ogImage = post.ogImage || post.coverImage || "https://tinkon.in/og-image.jpg";

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
                "logo": { "@type": "ImageObject", "url": "https://tinkon.in/og-image.jpg" }
              },
              "description": post.description,
              "url": url,
              "mainEntityOfPage": { "@type": "WebPage", "@id": url }
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
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Image
              src={post.coverImage}
              alt={`Cover image for blog post '${post.title}'`}
              width={800}
              height={400}
              className="rounded-xl mx-auto shadow-lg"
              style={{ width: "100%", height: "auto" }}
              priority
              placeholder="blur"
              blurDataURL="/images/blur-placeholder.png"
            />
          </motion.div>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 uppercase mb-4">
          <span>{format(new Date(post.date), "dd MMM yyyy")}</span>
          <span>—</span>
          <span>{post.category}</span>
        </div>
        {/* Title + Bookmark + Share */}
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <BookmarkButton slug={post.slug} title={post.title} />
          <SharePopover url={url} title={post.title} />
        </div>
        {/* Description */}
        <p className="text-gray-600 mb-8">{post.description}</p>
        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote {...mdxSource} components={mdxComponents} />
        </div>
        {/* Recommendations */}
        {recommended && recommended.length > 0 && (
          <>
            <hr className="my-10" />
            <div className="text-gray-600 text-base">
              <strong>Liked this?</strong> You might also enjoy:
              <ul className="list-disc list-inside mt-2">
                {recommended.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="underline text-indigo-600">
                      {r.title}
                    </Link>
                    <span className="text-xs text-gray-400 ml-2">
                      ({r.category})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
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

// Fetch post data and serialize MDX at build time, plus recommendations
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const mdxSource = await serialize(content);

  // Get all posts
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

  // Priority 1: Shared Tags
  let recommended: BlogMeta[] = [];
  if (data.tags && Array.isArray(data.tags)) {
    recommended = allPosts.filter(
      (p) =>
        Array.isArray(p.tags) &&
        p.tags.some((tag: string) => data.tags.includes(tag))
    );
  }

  // Priority 2: Same Category
  if (recommended.length < 2) {
    const more = allPosts.filter(
      (p) =>
        p.category === data.category &&
        !recommended.some((rec) => rec.slug === p.slug)
    );
    recommended = [...recommended, ...more];
  }

  // Priority 3: Recent Posts
  if (recommended.length < 2) {
    const more = allPosts
      .filter((p) => !recommended.some((rec) => rec.slug === p.slug))
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    recommended = [...recommended, ...more];
  }

  // Finalize (max 2 posts)
  recommended = recommended.slice(0, 2);

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
