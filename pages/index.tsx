import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, BlogMeta } from "@/lib/blog";
import dynamic from "next/dynamic";
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
  return (
    <>
      <Head>
        <title>Tink On It — Think, Feel, Write. By Tushar Panchal</title>
        <meta
          name="description"
          content="The homepage of Tink On It. Real, raw stories, life as an introvert, dogs, failures, late-night ideas, and the unfiltered journey of Tushar Panchal."
        />
      </Head>

      {/* HERO */}
      <section className="max-w-2xl mx-auto py-20 px-6 text-center">
  <h1 className="text-5xl font-black mb-4 tracking-tight">Tink On It</h1>
  <p className="text-base text-gray-700 mb-6">
    Hi, I’m <span className="font-semibold text-gray-900">Tushar</span>.
  </p>
  <p className="text-lg text-gray-700 mb-8">
    This place isn’t just a blog—it’s where I think out loud. I share what’s on my mind, the good and the bad. Sometimes I talk about feeling lost, sometimes about the funny side of failing, or just stories about life with my dog and family.
  </p>
  <p className="text-lg text-gray-700 mb-8">
    If you like honest stories and simple thoughts (sometimes a little messy), you’ll probably feel at home here. 
    Welcome to Tink On It—read, relate, smile, or just chill.
  </p>
  <span className="inline-block bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-medium shadow-sm">
    Real talk. Simple words. No filters.
  </span>
</section>


      {/* FEATURED STORY */}
      {featured && (
        <section className="max-w-3xl mx-auto px-6 mb-16">
          <div className="bg-gray-50 rounded-2xl shadow p-6">
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
            <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">
              In the Spotlight
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-1">{featured.title}</h2>
            <p className="text-gray-500 text-sm mb-3">{featured.description}</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-block bg-black text-white px-6 py-2 rounded-full font-semibold transition hover:bg-gray-800"
            >
              Dive In
            </Link>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS */}
      {highlights && highlights.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <h3 className="text-xl font-semibold mb-6 text-left text-gray-900">
            Fresh from the mind...
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {highlights.map((post) => (
              <div key={post.slug} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={180}
                  className="rounded-lg object-cover w-full h-36 mb-4"
                />
                <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">{post.category}</span>
                <h4 className="text-lg font-bold mb-1">{post.title}</h4>
                <p className="text-gray-500 text-sm flex-1">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-indigo-600 font-semibold hover:underline"
                >
                  Read
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TINY ABOUT ME */}
      <section className="max-w-md mx-auto text-center my-16">
        <div className="bg-indigo-50 rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-1">A little about me</h4>
          <p className="text-gray-700 text-base">
            I’m Tushar—professional overthinker, lifelong dog lover, part-time philosopher.<br />
            If you ever spot me outside, I probably lost internet at home.
          </p>
          <Link
            href="/about"
            className="inline-block mt-3 text-indigo-700 font-medium hover:underline"
          >
            Read the full story &rarr;
          </Link>
        </div>
      </section>

      {/* HUMOROUS QUOTE */}
      <section className="max-w-xl mx-auto text-center my-10">
        <blockquote className="italic text-gray-500">
          “If you’re reading this, you’re officially in my inner circle of Internet introverts.”

        </blockquote>
      </section>

      {/* MAIN BLOG CTA */}
      <section className="max-w-xl mx-auto text-center mb-12">
        <Link
          href="/blog"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold transition hover:bg-gray-800"
        >
          Start Reading
        </Link>
        <p className="mt-4 text-gray-500 text-sm">
          Or scroll down and get lost in the chaos of my head.
        </p>
      </section>
      <FloatingFeedback />
    </>
  );
}
