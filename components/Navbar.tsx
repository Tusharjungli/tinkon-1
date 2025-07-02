import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import { FaChevronDown, FaBars, FaTimes, /*FaMoon, FaSun*/ } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
/*import { useTheme } from "@/lib/useTheme";*/

const categories = [
  "All",
  "Dogs",
  "Life",
  "Growth",
  "Mind",
  "Tech",
  "School",
  "City",
  "Village",
  "Failures",
  "Love",
  "Faith",
  "Spiritual",
  "Thoughts",
  "Personal Stories",
];

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  {/*const { theme, toggle } = useTheme();*/}

  // Prevent background scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on ESC key
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [mobileOpen]);

  // Prevent click-outside bug
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === mobileDrawerRef.current) setMobileOpen(false);
  }

  return (
    <nav className="w-full border-b bg-white dark:bg-gray-950 sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight dark:text-white">
          Tink<span className="font-black text-black dark:text-white">on</span>.in
        </Link>
        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-6 text-sm font-medium relative">
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:underline dark:text-gray-200"
              onClick={() => setCatOpen((open) => !open)}
              onBlur={() => setTimeout(() => setCatOpen(false), 100)}
              aria-haspopup="listbox"
            >
              Categories <FaChevronDown size={13} />
            </button>
            {catOpen && (
              <div className="absolute top-8 left-0 w-44 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded shadow-lg py-2 z-50">
                {categories.map((cat) => (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 370, damping: 24 }}
                  >
                    <Link
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white transition-colors rounded"
                    >
                      {cat}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <NavBounceLink href="/blog">Blog</NavBounceLink>
          <NavBounceLink href="/about">About</NavBounceLink>
          <NavBounceLink href="/contact">Contact</NavBounceLink>
        </div>
        {/* Theme Toggle Button */}
        {/*<button
  onClick={toggle}
  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  className="ml-3 p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  type="button"
  style={{ overflow: "hidden", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}
>
  <AnimatePresence mode="wait" initial={false}>
    {theme === "dark" ? (
      <motion.span
        key="sun"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
        style={{ display: "inline-block" }}
      >
        <FaSun size={20} />
      </motion.span>
    ) : (
      <motion.span
        key="moon"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
        style={{ display: "inline-block" }}
      >
        <FaMoon size={20} />
      </motion.span>
    )}
  </AnimatePresence>
</button>*/}
        {/* Mobile Hamburger */}
        <motion.button
          className="sm:hidden text-2xl ml-2 text-gray-700 dark:text-gray-200"
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.14 }}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <FaBars />
        </motion.button>
        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={mobileDrawerRef}
              className="fixed inset-0 z-50 bg-black/30 flex justify-end"
              onClick={handleOverlayClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.19, ease: "easeOut" }}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 w-64 h-full max-h-screen p-6 flex flex-col gap-4 relative shadow-lg overflow-y-auto"
                initial={{ x: 96, opacity: 0, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 96, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 34, duration: 0.24 }}
              >
                <button
                  className="absolute top-4 right-4 text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
                <Link href="/" className="text-xl font-extrabold mb-2 dark:text-white" onClick={() => setMobileOpen(false)}>
                  TinkOnIt
                </Link>
                <div>
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">Categories</span>
                  <motion.div
                    className="flex flex-col gap-1 mt-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.055
                        }
                      }
                    }}
                  >
                    {categories.map((cat, i) => (
                      <motion.div
                        key={cat}
                        variants={{
                          hidden: { opacity: 0, x: 18 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.01 * i }}
                      >
                        <Link
                          href={`/blog?category=${encodeURIComponent(cat)}`}
                          className="block px-2 py-2 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {cat}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                {/* Stagger in main links below */}
                <motion.div
                  className="flex flex-col gap-1 mt-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.07
                      }
                    }
                  }}
                >
                  {["/blog", "/about", "/contact"].map((path, idx) => (
                    <motion.div
                      key={path}
                      variants={{
                        hidden: { opacity: 0, x: 18 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.13 + 0.06 * idx }}
                    >
                      <Link
                        href={path}
                        className="py-2 text-gray-700 dark:text-gray-100 rounded font-semibold hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white block transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {path === "/blog" ? "Blog" : path === "/about" ? "About" : "Contact"}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// --- Desktop nav bounce link helper ---
function NavBounceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.09 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      style={{ display: "inline-block" }}
    >
      <Link
        href={href}
        className="transition-colors duration-150 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
      >
        {children}
      </Link>
    </motion.div>
  );
}
