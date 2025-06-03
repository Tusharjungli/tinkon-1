// pages/index.tsx

import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-2xl mx-auto py-32 px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-6">
        Tink On It
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Real thoughts, stories & brainstorming by Tushar Panchal.
        <br />
        Honest. Raw. Gen Z.
      </p>
      <Link
        href="/blog"
        className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold transition hover:bg-gray-800"
      >
        Read the Blog
      </Link>
    </section>
  );
}
