import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 py-16 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-indigo-600 mb-6">404</h1>
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Oops! The page you’re looking for doesn’t exist—or maybe it never did.<br />
        Don’t worry, let’s get you back on track!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
          Go Home
        </Link>
        <Link href="/blog" className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          Read the Blog
        </Link>
      </div>
      <p className="text-sm text-gray-400">
        If you think something’s broken, <a href="mailto:tusharpanchal@gmail.com" className="underline hover:text-indigo-600">let me know</a>.
      </p>
      <p className="mt-10 text-xs text-gray-300">
        Or, just take a deep breath. Sometimes, getting lost is the best way to find new ideas ✨
      </p>
    </div>
  );
}