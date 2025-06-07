"use client";
import { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function BookmarkButton({ slug, }: { slug: string; title: string }) {
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
    <button
      onClick={toggleBookmark}
      aria-label={saved ? "Remove Bookmark" : "Save this post"}
      className={`transition ml-2 text-xl ${saved ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
      title={saved ? "Saved!" : "Save this post"}
      type="button"
    >
      {saved ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}
