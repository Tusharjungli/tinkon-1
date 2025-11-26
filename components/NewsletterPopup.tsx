"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  slug: string;
  showAfterPercent?: number; // default 50
  SHEET_ENDPOINT?: string;
  FORMSPREE_ENDPOINT?: string;
  delayMs?: number;
  /** Optional: force open for testing on mount */
  forceOnMount?: boolean;
};

const easeSoft = [0.22, 1, 0.36, 1] as const;

export default function NewsletterPopup({
  slug,
  showAfterPercent = 50,
  SHEET_ENDPOINT,
  FORMSPREE_ENDPOINT,
  delayMs = 150,
  forceOnMount = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  // shown flag for THIS page view only
  const shownRef = useRef(false);

  const openOnce = useCallback(() => {
    if (shownRef.current) return;
    shownRef.current = true;
    setOpen(true);
    try { document.body.style.overflow = "hidden"; } catch {}
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try { document.body.style.overflow = ""; } catch {}
  }, []);

  // FORCE (testing) and query param ?nl=open
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("nl") === "open" || forceOnMount) {
      // ensure we can test repeatedly on reload
      shownRef.current = false;
      setTimeout(openOnce, 50);
    }
  }, [forceOnMount, openOnce]);

  // Show at X% scroll (with low-height fallback)
  useEffect(() => {
    if (open || shownRef.current) return;

    const trigger = () => setTimeout(openOnce, delayMs);

    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const dh =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (dh < 800) {
        // very short page: show after a small delay
        window.removeEventListener("scroll", onScroll);
        setTimeout(trigger, 3000);
        return;
      }
      const pct = dh > 0 ? (st / dh) * 100 : 0;
      if (pct >= showAfterPercent) {
        window.removeEventListener("scroll", onScroll);
        trigger();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // in case user reloads mid-page
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, showAfterPercent, delayMs, openOnce]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, close]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string)?.trim();
    if (!email) { setStatus("error"); setError("Please enter a valid email."); return; }

    // frontend-only mode if endpoints not provided
    if (!SHEET_ENDPOINT && !FORMSPREE_ENDPOINT) {
      setStatus("done");
      setTimeout(close, 1200);
      form.reset();
      return;
    }

    setStatus("loading");
    setError("");

    const body = new URLSearchParams({
      email,
      slug,
      ref: document.referrer || "",
      ua: navigator.userAgent || "",
    });

    const reqs: Promise<Response>[] = [];
    if (SHEET_ENDPOINT) reqs.push(fetch(SHEET_ENDPOINT, { method: "POST", body }));
    if (FORMSPREE_ENDPOINT) {
      reqs.push(
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        })
      );
    }

    try {
      const results = await Promise.allSettled(reqs);
      const ok = results.some(r => r.status === "fulfilled" && r.value.ok);
      if (ok) {
        setStatus("done");
        setTimeout(close, 1400);
        form.reset();
      } else {
        setStatus("error");
        setError("Couldn’t submit right now. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeSoft }}
            className="fixed inset-0 z-[80] bg-black"
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            key="card"
            role="dialog"
            aria-modal="true"
            aria-label="Subscribe to Tink On It"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: easeSoft }}
            className="fixed inset-x-4 bottom-6 z-[90] mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl backdrop-blur-[2px] dark:border-gray-800 dark:bg-zinc-900/95 sm:inset-x-0"
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
              Can we stay in touch..?
            </h3>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Hey, If this piece is meeting you at the right moment,
              drop your email. I’ll send you the next ones and no noise. It&apos;s my promise.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-100"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto rounded-xl bg-black px-5 py-3 font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-gray-800 active:translate-y-0 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {status === "loading" ? "Sending…" : "Click here!"}
              </button>
            </form>

            {status === "error" && (
              <div className="mt-2 text-center text-sm text-red-600">{error}</div>
            )}
            {status === "done" && (
              <div className="mt-3 text-center text-sm font-medium text-green-600">
                thank you for trusting me... you just made my day ! ❤️
              </div>
            )}

            <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-500">
              unsubscribe anytime • thanks for being here
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
