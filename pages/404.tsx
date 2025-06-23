"use client";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Custom404() {
  // (Optional) Use theme if you want a different SVG for light/dark
  // const { theme } = useTheme();

  return (
    <main className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* SVG: A cute lonely dog for 404 (dark mode compatible) */}
        <svg width="120" height="120" viewBox="0 0 120 120" className="mb-4" aria-hidden>
          <circle cx="60" cy="60" r="56" fill="#f3f4f6" className="dark:fill-gray-800" />
          {/* Face */}
          <ellipse cx="60" cy="72" rx="38" ry="28" fill="#fff" className="dark:fill-gray-900" />
          {/* Eyes */}
          <ellipse cx="50" cy="70" rx="6" ry="7" fill="#333" className="dark:fill-gray-100" />
          <ellipse cx="70" cy="70" rx="6" ry="7" fill="#333" className="dark:fill-gray-100" />
          {/* Nose */}
          <ellipse cx="60" cy="84" rx="4" ry="3" fill="#666" className="dark:fill-gray-300" />
          {/* Ears */}
          <ellipse cx="33" cy="62" rx="9" ry="18" fill="#e5e7eb" className="dark:fill-gray-700" transform="rotate(-15 33 62)" />
          <ellipse cx="87" cy="62" rx="9" ry="18" fill="#e5e7eb" className="dark:fill-gray-700" transform="rotate(15 87 62)" />
          {/* Sad mouth */}
          <path d="M53 92 Q60 98 67 92" stroke="#bbb" className="dark:stroke-gray-500" strokeWidth="2.5" fill="none" />
        </svg>

        <h1 className="text-5xl font-black mb-3 tracking-tight">404</h1>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 font-medium">
          Uh oh... This page wandered off.<br />
          <span className="text-sm text-gray-400 dark:text-gray-500">
            (Or maybe I overthought it out of existence.)
          </span>
        </p>
        <motion.div
          whileHover={{ scale: 1.08, backgroundColor: "#1e293b" }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Link
            href="/"
            className="bg-black dark:bg-white dark:text-black text-white px-7 py-2 rounded-full font-semibold shadow hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors"
          >
            Go Home
          </Link>
        </motion.div>
        <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          Or, <Link href="/contact" className="underline hover:text-indigo-500 dark:hover:text-indigo-300">report this broken link</Link>
        </div>
        <blockquote className="italic text-gray-400 mt-12 text-center max-w-xs mx-auto">
          “If you find yourself lost on the internet, you’re just one click away from home.”
        </blockquote>
      </motion.div>
    </main>
  );
}
