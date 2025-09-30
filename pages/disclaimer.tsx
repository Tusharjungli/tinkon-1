import Link from "next/link";

export default function Disclaimer() {
  return (
    <section className="max-w-2xl mx-auto py-24 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">Disclaimer</h2>
      <p className="mb-3"><b>Last updated:</b> June 2025</p>
      <p className="mb-3">
        The content on <b>Tink On It</b> is for sharing ideas and personal experiences. I try my best to keep everything honest and accurate, but I can’t guarantee all information will always be perfect or up-to-date. Always double-check before making decisions based on anything you read here.
      </p>
      <p className="mb-3">
        <b>Tink On It</b> (and me, Tushar Panchal) are not responsible for any losses, injuries, or damages as a result of using this site or its content. Links to other websites are just for reference—I can’t control what’s on them.
      </p>
      <p className="mb-3">
        Nothing here is legal, financial, medical, or professional advice; it’s just my personal perspective. If something isn’t clear, feel free to <a href="mailto:jungli0beast@gmail.com" className="underline text-indigo-600 hover:text-indigo-800">contact me</a> for clarification.
      </p>
      <p className="mb-8">
        This disclaimer might change without notice, so check back if you’re concerned.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="text-indigo-600 underline hover:text-indigo-800">Home</Link>
        <Link href="/blog" className="text-indigo-600 underline hover:text-indigo-800">Blog</Link>
      </div>
    </section>
  );
}