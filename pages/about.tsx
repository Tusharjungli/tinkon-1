import Head from "next/head";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Tink On It</title>
        <meta
          name="description"
          content="Meet Tushar Panchal, the mind behind Tink On It—a raw, real, slightly stubborn introvert sharing stories on life, dogs, tech, and more."
        />
        <meta property="og:title" content="About — Tink On It" />
        <meta
          property="og:description"
          content="Meet Tushar Panchal, the mind behind Tink On It—a raw, real, slightly stubborn introvert sharing stories on life, dogs, tech, and more."
        />
        <meta property="og:image" content="https://tinkon.in/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinkon.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About — Tink On It" />
        <meta
          name="twitter:description"
          content="Meet Tushar Panchal, the mind behind Tink On It—a raw, real, slightly stubborn introvert sharing stories on life, dogs, tech, and more."
        />
        <meta name="twitter:image" content="https://tinkon.in/og-image.jpg" />
      </Head>
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          <Image
            src="/images/profile.png"
            alt="Tushar Panchal"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">About Me</h1>
          <div className="space-y-5 text-lg text-gray-700 text-center">
            <p>
              Hi, I&apos;m <b>Tushar</b>—born and raised in Bhiwani, Haryana: a city with just enough chaos to keep life interesting, and enough peace on the edges for an introvert like me to hide out and recharge.
            </p>
            <p>
              As a kid, I was that quiet observer in the back of the class, watching people&apos;s habits and gestures like I was studying for a final exam in &ldquo;How to Be Human.&rdquo; <span className="italic">(Spoiler: I still haven&apos;t passed.)</span> Teachers always said, &ldquo;Don&apos;t copy.&rdquo; I say, <span className="font-semibold">&ldquo;What is life but a remix?&rdquo;</span> Even Apple copied nature.
            </p>
            <p>
              I&apos;m stubborn in a calm way—a weird combo that means I won&apos;t fight you, but I definitely won&apos;t agree with you either. I fake it in social situations because it&apos;s easier than explaining why I&apos;d rather hang out with my dog than a group of loud humans. <span className="italic">(Sometimes I even fake conversations when I&apos;m alone, just for practice. I know—it&apos;s a work in progress.)</span>
            </p>
            <p>
              Writing isn&apos;t just my escape—it&apos;s my sanity button. My brain buzzes 24/7, and dumping those thoughts onto a page is the only way I can get a little peace. Turns out, putting your feelings into words is the cheapest therapy out there, and no one interrupts you with unwanted &ldquo;just think positive!&rdquo; advice.
            </p>
            <p>
              These days, you&apos;ll catch me soaking in the quiet—reading under a tree, counting stars, or having deep, one-sided conversations with my dog (Harry). <span className="font-semibold">Dogs just get it, you know?</span> They don&apos;t judge if you overthink everything, or if your idea of a good time is watching leaves fall instead of scrolling through Reels.
            </p>
            <p>
              <span className="font-semibold">If you take anything from my writing, let it be this:</span>
              <br />
              Squeeze out your thoughts like ketchup. Let the mess out, put it on paper, and see what happens. Life isn&apos;t meant to be bottled up or perfectly filtered—<span className="italic">(that&apos;s what Instagram is for.)</span>
            </p>
            <p>
              So, welcome to <b>Tink On It</b>—my little patch of the internet for raw thoughts, unfinished stories, dog wisdom, and the kind of honesty you usually only share with Google Search at 2 am.
            </p>
          </div>
          <p className="text-gray-500 text-center mt-8 italic">
            <span>
              Still here? Thanks for reading the unfiltered me. If we ever meet, I&apos;ll probably act awkward and forget how to end the conversation. But hey, that&apos;s why I have a blog.
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
