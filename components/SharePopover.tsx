"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaShareAlt,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaRegCopy,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function SharePopover({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const shareText = encodeURIComponent(`${title} — Tink On It`);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Share"
        className="text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-full transition border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
        type="button"
        whileHover={{
          scale: 1.13,
          boxShadow: "0 4px 18px rgba(99,102,241,0.13)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShareAlt size={20} />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            className="absolute z-30 mt-2 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3 flex flex-col gap-2 w-44 animate-fade-in"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-200 px-2 py-1 rounded transition font-medium
                hover:bg-[#e9fbf1] dark:hover:bg-[#193c2c]"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaWhatsapp
                size={18}
                className="text-gray-500 group-hover:text-green-600 transition"
              />{" "}
              <span className="group-hover:text-green-700 dark:group-hover:text-green-400 transition">WhatsApp</span>
            </motion.a>
            {/* X (Twitter) */}
            <motion.a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-200 px-2 py-1 rounded transition font-medium
                hover:bg-[#eaf3fb] dark:hover:bg-[#182539]"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaTwitter
                size={18}
                className="text-gray-500 group-hover:text-blue-500 transition"
              />{" "}
              <span className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition">X (Twitter)</span>
            </motion.a>
            {/* LinkedIn */}
            <motion.a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-200 px-2 py-1 rounded transition font-medium
                hover:bg-[#e7f2fa] dark:hover:bg-[#192a36]"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaLinkedin
                size={18}
                className="text-gray-500 group-hover:text-blue-700 transition"
              />{" "}
              <span className="group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">LinkedIn</span>
            </motion.a>
            {/* Facebook */}
            <motion.a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-200 px-2 py-1 rounded transition font-medium
                hover:bg-[#e9f0fb] dark:hover:bg-[#192136]"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaFacebook
                size={18}
                className="text-gray-500 group-hover:text-blue-600 transition"
              />{" "}
              <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">Facebook</span>
            </motion.a>
            {/* Copy */}
            <motion.button
              className="group flex items-center gap-2 text-gray-700 dark:text-gray-200 px-2 py-1 rounded transition w-full font-medium
                hover:bg-[#f3e9fb] dark:hover:bg-[#2d2136]"
              onClick={() => {
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1400);
              }}
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaRegCopy
                size={17}
                className="text-gray-500 group-hover:text-purple-600 transition"
              />{" "}
              <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease;
        }
      `}</style>
    </div>
  );
}
