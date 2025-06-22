import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const categories = [
  "Dogs",
  "Life",
  "Maturity",
  "Tech",
  "Brainstorming",
  "Spiritual",
  "Personal Stories",
  "Introvert",
];

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

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
    <nav className="w-full border-b bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Tink<span className="font-black text-black">on</span>.in
        </Link>
        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-6 text-sm font-medium relative">
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:underline"
              onClick={() => setCatOpen((open) => !open)}
              onBlur={() => setTimeout(() => setCatOpen(false), 100)}
              aria-haspopup="listbox"
            >
              Categories <FaChevronDown size={13} />
            </button>
            {catOpen && (
              <div className="absolute top-8 left-0 w-44 bg-white border rounded shadow-lg py-2 z-50">
                {categories.map((cat) => (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 370, damping: 24 }}
                  >
                    <Link
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors rounded"
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
        {/* Mobile Hamburger */}
        <motion.button
          className="sm:hidden text-2xl"
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
                className="bg-white w-64 h-full p-6 flex flex-col gap-4 relative shadow-lg"
                initial={{ x: 96, opacity: 0, scale: 0.98 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: 96, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 340, damping: 34, duration: 0.24 }}
              >
                <button
                  className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-800"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
                <Link href="/" className="text-xl font-extrabold mb-2" onClick={() => setMobileOpen(false)}>
                  TinkOnIt
                </Link>
                <div>
                  <span className="text-gray-600 font-semibold">Categories</span>
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
                          className="block px-2 py-2 text-gray-700 rounded hover:bg-gray-100 hover:text-black transition-colors"
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
                        className="py-2 text-gray-700 rounded font-semibold hover:bg-gray-100 hover:text-black block transition-colors"
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
        className="transition-colors duration-150 text-gray-700 hover:text-black"
      >
        {children}
      </Link>
    </motion.div>
  );
}
