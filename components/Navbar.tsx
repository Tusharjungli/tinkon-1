import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
/*import { useTheme } from "@/lib/useTheme";*/

const categories = [
  "All",
  "Mind & Emotions",
  "Life & Growth",
  "Tech & Tools",
  "Spiritual & Beliefs",
  "Addiction & Escape",
  "Personal Stories",
  "Society & Culture",
];

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileCats, setShowMobileCats] = useState(false);
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
                      href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
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
        {/* <button> ... </button> */}
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
                className="bg-white dark:bg-gray-900 w-64 h-full max-h-screen p-6 flex flex-col gap-1 relative shadow-lg overflow-y-auto"
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
                <Link
                  href="/"
                  className="text-xl font-extrabold mb-4 mt-2 dark:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  TinkOnIt
                </Link>
                {/* --- Main nav links --- */}
                <nav className="flex flex-col gap-1">
                  {/* Categories collapsible */}
                  <button
                    className="flex items-center justify-between w-full px-1 py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded focus:outline-none"
                    onClick={() => setShowMobileCats(open => !open)}
                  >
                    <span>Categories</span>
                    <FaChevronDown
                      className={`ml-2 transition-transform ${showMobileCats ? "rotate-180" : ""}`}
                      size={16}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {showMobileCats && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {categories.map(cat => (
                          <Link
                            key={cat}
                            href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                            className="block pl-4 pr-2 py-2 text-gray-700 dark:text-gray-300 text-base hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                            onClick={() => {
                              setMobileOpen(false);
                              setShowMobileCats(false);
                            }}
                          >
                            {cat}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Other main links */}
                  <Link
                    href="/blog"
                    className="px-1 py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="px-1 py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="px-1 py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
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
