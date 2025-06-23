"use client";
import { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BookmarkButton({ slug }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
      setSaved(savedPosts.includes(slug));
    }
  }, [slug]);

  const toggleBookmark = () => {
    if (typeof window !== "undefined") {
      let savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
      if (savedPosts.includes(slug)) {
        savedPosts = savedPosts.filter((s: string) => s !== slug);
        setSaved(false);
      } else {
        savedPosts.push(slug);
        setSaved(true);
      }
      localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    }
  };

  return (
    <motion.button
      onClick={toggleBookmark}
      aria-label={saved ? "Remove Bookmark" : "Save this post"}
      title={saved ? "Saved!" : "Save this post"}
      type="button"
      className={`ml-2 text-xl transition focus:outline-none
        ${
          saved
            ? "text-yellow-500"
            : "text-gray-600 dark:text-gray-300 hover:text-yellow-500"
        }
      `}
      whileHover={{
        scale: 1.18,
        boxShadow: saved
          ? "0 4px 18px rgba(250,204,21,0.11)"
          : "0 4px 18px rgba(156,163,175,0.10)",
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      style={{
        background: "transparent",
        border: "none",
        borderRadius: "999px",
        padding: 3,
        cursor: "pointer",
      }}
    >
      {saved ? <FaBookmark /> : <FaRegBookmark />}
    </motion.button>
  );
}
