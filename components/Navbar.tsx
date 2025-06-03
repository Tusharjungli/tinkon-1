import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          Tink<span className="font-black text-black">On</span>It
        </Link>
        <div className="flex gap-6 text-sm font-medium relative">
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
      </div>
    </nav>
  );
}
