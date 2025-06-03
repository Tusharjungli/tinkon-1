import Image from "next/image";

export default function AboutPage() {
  return (
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
            As a kid, I was that quiet observer in the back of the class, watching people&apos;s habits and gestures like I was studying for a final exam in “How to Be Human.” (Spoiler: I still haven&apos;t passed.) Teachers said, “Don’t copy.” I say, “What is life but a remix?” Even Apple copied nature.
          </p>
          <p>
            I’m stubborn in a calm way—a weird combo that means I won’t fight you, but I definitely won’t agree with you either. I fake it in social situations because it’s easier than explaining why I’d rather hang out with my dog than a group of loud humans. Sometimes I fake it when I’m alone, just for practice. (I know, it’s a work in progress.)
          </p>
          <p>
            Writing isn’t just my escape—it’s my sanity button. My brain buzzes 24/7, and dumping those thoughts onto a page is the only way I can get a little peace. Turns out, putting your feelings into words is the cheapest therapy out there, and no one tries to fix you with “just think positive!” advice.
          </p>
          <p>
            These days, you’ll catch me soaking in the quiet—reading under a tree, counting stars, or having deep, one-sided conversations with dogs. Dogs just get it, you know? They don’t judge if you overthink everything, or if your idea of a good time is watching leaves fall instead of scrolling through Reels.
          </p>
          <p>
            If you take anything from my writing, let it be this: squeeze out your thoughts like ketchup. Let the mess out, put it on paper, and see what happens. Life isn’t meant to be bottled up or perfectly filtered. (That’s what Instagram is for.)
          </p>
          <p>
            So, welcome to <b>Tink On It</b>—my little patch of the internet for raw thoughts, unfinished stories, dog wisdom, and the kind of honesty you usually only share with Google Search at 2am.
          </p>
        </div>
        <p className="text-gray-500 text-center mt-8 italic">
          <span>
            Still here? Thanks for reading the unfiltered me. If we ever meet, I’ll probably act awkward and forget how to end a conversation. But hey, that’s why I have a blog.
          </span>
        </p>
      </div>
    </main>
  );
}
