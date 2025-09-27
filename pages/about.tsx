import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Tink On It</title>
        <meta
          name="description"
          content="I'm Tushar — builder of websites, storyteller by habit, introvert by DNA. This is my cozy corner of the internet."
        />
        <meta property="og:title" content="About — Tink On It" />
        <meta
          property="og:description"
          content="I'm Tushar — builder of websites, storyteller by habit, introvert by DNA. This is my cozy corner of the internet."
        />
        <meta property="og:image" content="https://tinkon.in/og-image.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinkon.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About — Tink On It" />
        <meta
          name="twitter:description"
          content="I'm Tushar — builder of websites, storyteller by habit, introvert by DNA. This is my cozy corner of the internet."
        />
        <meta name="twitter:image" content="https://tinkon.in/og-image.webp" />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          className="flex flex-col items-center bg-white/70 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 transition-colors"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 220, damping: 17 }}
            className="rounded-full mb-4"
          >
            <Image
              src="/images/profileimg.webp"
              alt="Tushar Panchal smiling, wearing glasses"
              width={120}
              height={120}
              className="rounded-full border-4 border-indigo-500 shadow-lg"
              priority
            />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">Hey, I&apos;m Tushar</h1>
          <div className="space-y-5 text-lg text-gray-800 dark:text-gray-100 text-center">
            <p>
              Welcome to <span className="font-semibold">Tink On It</span> — my cozy corner of the internet.
              I’m that guy who prefers dogs over people, silence over small talk, and markdown over Microsoft Word.
            </p>
            <p>
              Born in Bhiwani. Raised on curiosity, Google, and a little too much chai. I write stories to make sense of the noise inside my head. I build websites, break them (then fix them), and sometimes share the journey.
            </p>
            <p>
              <span className="font-semibold">Things I love:</span> My golden retriever (Harry), quiet mornings, loud playlists, and the smell of fresh blog ideas.
            </p>
            <p>
              If I had a superpower, it’d be overthinking everything. If I had a weakness, it’d be... overthinking everything.
            </p>
            <p>
              <span className="italic">If we meet in real life, I might act awkward. If you like that kind of vibe, you’ll enjoy the rest of this site.</span>
            </p>
            <p>
              <span className="font-semibold">Want to connect?</span> Say hi on{" "}
              <a
                href="https://twitter.com/tushar_tinkon"
                className="text-blue-500 underline hover:text-blue-700"
                target="_blank"
                rel="noopener"
              >
                Twitter/X
              </a>
              {" "}
              or check out my <Link href="/blog" className="underline hover:text-indigo-600">blog</Link>.
            </p>
          </div>
        </motion.div>
      </main>
    </>
  );
}