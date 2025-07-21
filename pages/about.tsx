import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

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
              src="/images/profile.webp"
              alt="Tushar Panchal"
              width={120}
              height={120}
              className="rounded-full"
              priority
            />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">Hey, I&apos;m Tushar</h1>
          <div className="space-y-5 text-lg text-gray-800 dark:text-gray-100 text-center">
            <p>
              I’m that guy who prefers dogs over people, silence over small talk, and markdown over Microsoft Word. Born in Bhiwani. Raised on curiosity and Google.
            </p>
            <p>
              I build websites. I break them too (then fix them, mostly). I write stories because otherwise my head would be too loud to sleep at night.
            </p>
            <p>
              If I had a superpower, it’d be overthinking everything. If I had a weakness, it’d be... overthinking everything.
            </p>
            <p>
              I&apos;m not here to give you perfect life advice or productivity hacks. I’m here to share what it feels like to be lost, to try, to fail, to write, to rebuild, and occasionally—win.
            </p>
            <p>
              <strong>Things I love:</strong> My golden retriever (Harry), quiet mornings, loud playlists, and the smell of fresh blog ideas.
            </p>
            <p>
              Tink On It is my digital journal. My raw, chaotic, semi-organized brain poured into bytes. Expect late-night thoughts, unfinished ideas, funny rants, and maybe a few things you’ll relate to.
            </p>
            <p>
              Welcome to my corner of the internet. No filters, no gurus. Just a guy trying to make sense of it all—one blog at a time.
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-8 italic">
            If we meet in real life, I might act awkward. If you like that kind of vibe, you’ll enjoy the rest of this site.
          </p>
        </motion.div>
      </main>
    </>
  );
}