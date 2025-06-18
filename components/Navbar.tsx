import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const categories = [
  "Dogs",
  "Life",
  "Maturity",
  "Tech",
  "Brainstorming",
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
                  <Link
                    key={cat}
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
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
                initial={{ x: 96, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 34, duration: 0.24 }}
              >
                <button
                  className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
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
                  <div className="flex flex-col gap-1 mt-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="block px-2 py-2 text-gray-700 rounded hover:bg-gray-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/blog" className="py-2 hover:underline" onClick={() => setMobileOpen(false)}>
                  Blog
                </Link>
                <Link href="/about" className="py-2 hover:underline" onClick={() => setMobileOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="py-2 hover:underline" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
