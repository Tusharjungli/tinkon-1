"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* SVG icon (monochrome, inherit currentColor) */
const ChatIcon = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

export default function FloatingFeedback() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Close on ESC
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        // example: quick open using Cmd/Ctrl+K
        e.preventDefault();
        setOpen(true);
        setTimeout(() => {
          modalRef.current?.querySelector<HTMLInputElement>("input, textarea")?.focus();
        }, 100);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // click-outside to close
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && !triggerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    // lock body scroll when modal is open
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/manjnpzn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError("Something went wrong. Please try again!");
      }
    } catch {
      setError("Could not send feedback. Check your connection!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* SIMPLE TEXT BUTTON */}
      <motion.button
        ref={triggerRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => { setShowTooltip(false); setOpen(true); }}
        className="fixed z-50 bottom-8 right-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-800 shadow-lg hover:shadow-xl transition text-black dark:text-white rounded-lg h-12 px-4 flex items-center gap-2 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-gray-300"
        aria-label="Open feedback modal"
        aria-haspopup="dialog"
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {ChatIcon}
        <span className="text-sm font-semibold select-none">Share feedback</span>

        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: -36, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bottom-full right-1/2 translate-x-1/2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-lg text-xs shadow-md border border-gray-200 dark:border-gray-800 whitespace-nowrap pointer-events-none"
              style={{ marginBottom: 8, zIndex: 9999 }}
            >
              Got a thought? I read every one!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* FEEDBACK MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 flex justify-end items-end sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="presentation"
            onClick={(e) => {
              // prevent clicking overlay from immediately stealing focus in some cases;
              // click-outside handled in doc listener for more robust behavior
              if (e.target === e.currentTarget) {
                setOpen(false);
              }
            }}
          >
            <motion.div
              ref={modalRef}
              className="relative w-[95vw] max-w-md m-4 rounded-2xl p-8 shadow-2xl bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl border border-white/40 dark:border-gray-700 transition-colors"
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Feedback form"
            >
              <button
                onClick={() => { setOpen(false); setSent(false); setError(""); setLoading(false); }}
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
                aria-label="Close feedback form"
              >
                &times;
              </button>

              <div className="mb-3">
                <div className="flex items-center gap-2 text-black dark:text-white font-bold text-lg">
                  {ChatIcon}
                  Feedback
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  Your words land directly in my inbox. No bots, just me.
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    I promise I’m the only one reading this.
                  </span>
                </p>
              </div>

              {!sent ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" autoComplete="off">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      disabled={loading}
                      placeholder="Your name"
                      className="rounded-lg p-3 bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-gray-600 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email (Just to say Thank You)</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={loading}
                      placeholder="Your email"
                      className="rounded-lg p-3 bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-gray-600 transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      disabled={loading}
                      placeholder="Your feedback, story, or comment"
                      rows={4}
                      className="rounded-lg p-3 bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-gray-600 transition"
                    />
                  </div>

                  {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-black dark:bg-gray-500 text-white font-semibold rounded-lg py-2 mt-2 shadow-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>
              ) : (
                <motion.div
                  className="text-green-600 dark:text-green-300 font-semibold py-8 text-center animate-pulse"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  Thank you for your feedback!<br />
                  I’ll read it soon. You made my day.
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
