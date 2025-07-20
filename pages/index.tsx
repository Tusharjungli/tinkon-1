import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, BlogMeta } from "@/lib/blog";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const FloatingFeedback = dynamic(() => import("@/components/FloatingFeedback"), { ssr: false });

type HomeProps = {
  featured: BlogMeta | null;
  highlights: BlogMeta[];
};

export async function getStaticProps() {
  const posts = getAllPosts();
  const featured = posts.length > 0 ? posts[0] : null;
  const highlights = posts.slice(1, 4);
  return {
    props: {
      featured,
      highlights,
    },
  };
}

export default function Home({ featured, highlights }: HomeProps) {
  const router = useRouter();
  const canonicalUrl =
    router.asPath === "/" || router.asPath === ""
      ? "https://tinkon.in/"
      : `https://tinkon.in${router.asPath.split("?")[0]}`;

  return (
    <>
      <Head>
        <title>Tink On It — Think, Feel, Write. By Tushar Panchal</title>
        <meta
          name="description"
          content="The homepage of Tink On It. Real, raw stories, life as an introvert, dogs, failures, late-night ideas, and the unfiltered journey of Tushar Panchal."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      {/* HERO */}
      <section className="max-w-2xl mx-auto py-20 px-6 text-center">
  <h1 className="text-5xl font-black mb-4 tracking-tight text-black dark:text-white">
    Tink On It
  </h1>
  <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
    Hi, I’m <span className="font-semibold text-gray-900 dark:text-gray-100">Tushar</span>.
  </p>
  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
    This place isn’t just a blog—it’s where I think out loud...
  </p>
  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
    If you like honest stories and simple thoughts...
  </p>
  <span className="inline-block bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-5 py-2 rounded-full text-sm font-medium shadow-sm">
    Real talk. Simple words. No filters.
  </span>
</section>

      {/* FEATURED STORY */}
      {featured && (
        <motion.section
          className="max-w-3xl mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-gray-300 dark:bg-gray-700 rounded-2xl shadow p-6 transition-colors">
            <div className="mb-4">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                width={900}
                height={360}
                className="rounded-lg object-cover w-full h-64"
                priority
              />
            </div>
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-1">
              In the Spotlight
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-1 text-black dark:text-white">{featured.title}</h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-3">{featured.description}</p>
            <motion.div
              whileHover={{ scale: 1.07, boxShadow: "0 4px 18px rgba(30,30,30,0.12)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full font-semibold transition hover:bg-gray-900 dark:hover:bg-gray-100"
              >
                Dive In
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* HIGHLIGHTS */}
      {highlights && highlights.length > 0 && (
        <motion.section
          className="max-w-4xl mx-auto px-6 mb-20"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h3 className="text-xl font-semibold mb-6 text-left text-gray-700 dark:text-white">
            Fresh from the mind...
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {highlights.map((post) => (
              <motion.div
                key={post.slug}
                className="bg-gray-300 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col cursor-pointer group"
                whileHover={{ y: -5, scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.11)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.location.href = `/blog/${post.slug}`}
                tabIndex={0}
                onKeyPress={e => {
                  if (e.key === "Enter") window.location.href = `/blog/${post.slug}`;
                }}
                style={{ outline: "none" }}
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={180}
                  className="rounded-lg object-cover w-full h-36 mb-4"
                />
                <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-300 mb-1">{post.category}</span>
                <h4 className="text-lg font-bold mb-1 text-black dark:text-white">{post.title}</h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm flex-1">{post.description}</p>
                <span
                  className="inline-block mt-4 text-black dark:text-white font-semibold group-hover:underline"
                >
                  Read
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* TINY ABOUT ME */}
      <motion.section
        className="max-w-md mx-auto text-center my-16"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 shadow-sm transition-colors">
          <h4 className="text-lg font-semibold mb-1 text-black dark:text-white">A little about me</h4>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            I’m Tushar—professional overthinker, lifelong dog lover, part-time philosopher.<br />
            If you ever spot me outside, I probably lost internet at home.
          </p>
          <motion.div
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="/about"
              className="inline-block mt-3 text-black dark:text-white font-medium hover:underline"
            >
              Read the full story &rarr;
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* HUMOROUS QUOTE */}
      <section className="max-w-xl mx-auto text-center my-10">
        <blockquote className="italic text-gray-500 dark:text-gray-300">
          “If you’re reading this, you’re officially in my inner circle of Internet introverts.”
        </blockquote>
      </section>

      {/* MAIN BLOG CTA */}
      <motion.section
        className="max-w-xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ scale: 1.09, boxShadow: "0 6px 24px rgba(30,30,30,0.12)" }}
          whileTap={{ scale: 0.98 }}
          className="inline-block"
        >
          <Link
            href="/blog"
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-semibold transition hover:bg-gray-900 dark:hover:bg-gray-100"
          >
            Start Reading
          </Link>
        </motion.div>
        <p className="mt-4 text-gray-500 dark:text-gray-300 text-sm">
          Or scroll down and get lost in the chaos of my head.
        </p>
      </motion.section>
      <FloatingFeedback />
    </>
  );
}
