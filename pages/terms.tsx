import Link from "next/link";

export default function Terms() {
  return (
    <section className="max-w-2xl mx-auto py-24 px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-6">Terms of Use</h2>
      <p className="mb-3"><b>Last updated:</b> June 2025</p>
      <p className="mb-3">
        Welcome to <b>Tink On It</b>! By using this site (“the Site”), you agree to these terms. If you don’t agree, please don’t use the site.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Content & Use</h3>
      <p className="mb-3">
        Everything here is for information and inspiration only—not official advice. Please use your own judgment before acting on anything you read. For privacy info, see our <Link href="/privacy-policy" className="underline text-indigo-600 hover:text-indigo-800">Privacy Policy</Link>.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Originality & Copyright</h3>
      <p className="mb-3">
        All writing and images are original unless otherwise credited. Please don’t copy or reuse without permission—just <a href="mailto:jungli0beast@gmail.com" className="underline text-indigo-600 hover:text-indigo-800">contact me</a> if you want to share!
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Respectful Conduct</h3>
      <p className="mb-3">
        Treat this space and other readers with respect. No spam, hate, or abuse. We reserve the right to moderate comments or content.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">No Liability</h3>
      <p className="mb-3">
        We try to keep info accurate and up-to-date, but can’t promise perfection. Use the site at your own risk; we aren’t responsible for any loss or damage from using the site or its content.
      </p>
      <h3 className="text-xl font-semibold mt-8 mb-2">Updates</h3>
      <p className="mb-8">
        Terms may change any time. Check this page for updates if you care about the fine print.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="text-indigo-600 underline hover:text-indigo-800">Home</Link>
        <Link href="/blog" className="text-indigo-600 underline hover:text-indigo-800">Blog</Link>
      </div>
    </section>
  );
}