"use client";
import { useState, useRef, useEffect } from "react";
import { FaShareAlt, FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";

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
        className="text-gray-500 hover:text-indigo-600 p-2 rounded-full transition border border-gray-200 bg-white shadow-sm"
        type="button"
        whileHover={{ scale: 1.13, boxShadow: "0 4px 18px rgba(99,102,241,0.12)" }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShareAlt size={20} />
      </motion.button>
      {open && (
        <motion.div
          ref={popoverRef}
          className="absolute z-30 mt-2 right-0 bg-white border rounded-lg shadow-xl p-3 flex flex-col gap-2 w-44 animate-fade-in"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-green-600 px-2 py-1 rounded transition"
            whileHover={{ scale: 1.06, backgroundColor: "#f0fff4" }}
            whileTap={{ scale: 0.97 }}
          >
            <FaWhatsapp size={18} /> WhatsApp
          </motion.a>
          <motion.a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 px-2 py-1 rounded transition"
            whileHover={{ scale: 1.06, backgroundColor: "#f0f7ff" }}
            whileTap={{ scale: 0.97 }}
          >
            <FaTwitter size={18} /> X (Twitter)
          </motion.a>
          <motion.a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-700 px-2 py-1 rounded transition"
            whileHover={{ scale: 1.06, backgroundColor: "#f0f7ff" }}
            whileTap={{ scale: 0.97 }}
          >
            <FaLinkedin size={18} /> LinkedIn
          </motion.a>
          <motion.a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 px-2 py-1 rounded transition"
            whileHover={{ scale: 1.06, backgroundColor: "#f0f7ff" }}
            whileTap={{ scale: 0.97 }}
          >
            <FaFacebook size={18} /> Facebook
          </motion.a>
          <motion.button
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 px-2 py-1 rounded transition w-full"
            onClick={() => {
              navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
            type="button"
            whileHover={{ scale: 1.06, backgroundColor: "#f6f0ff" }}
            whileTap={{ scale: 0.97 }}
          >
            <FaRegCopy size={17} /> {copied ? "Copied!" : "Copy Link"}
          </motion.button>
        </motion.div>
      )}
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
