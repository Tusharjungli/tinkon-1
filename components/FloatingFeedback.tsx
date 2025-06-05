"use client";
import { useState } from "react";

// SVG icon (chat bubble)
const ChatIcon = (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

export default function FloatingFeedback() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* FAB BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-8 right-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl hover:scale-105 transition-transform
                   text-white rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-lg bg-opacity-80 border-none"
        aria-label="Feedback"
        style={{
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          border: "1.5px solid rgba(255,255,255,0.1)",
        }}
      >
        {ChatIcon}
      </button>

      {/* GLASSY MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-end items-end">
          <div
            className="relative w-[90vw] max-w-md m-6 rounded-2xl p-8 shadow-2xl
                      bg-white/80 backdrop-blur-xl border border-white/40"
          >
            {/* Close (X) */}
            <button
              onClick={() => { setOpen(false); setSent(false); }}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
              style={{ background: "transparent", border: "none" }}
            >
              &times;
            </button>
            <div className="mb-3">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
                {ChatIcon}
                Feedback
              </div>
              <p className="text-sm text-gray-500 mt-1">Your words land directly in my inbox. No bots, just me.</p>
            </div>
            {!sent ? (
              <form
                action="https://formspree.io/f/manjnpzn" // <-- Replace with your real Formspree endpoint!
                method="POST"
                target="_blank"
                onSubmit={() => setSent(true)}
                className="flex flex-col gap-3"
                autoComplete="off"
              >
                <input type="text" name="name" required placeholder="Your name" className="rounded-lg p-3 bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-300 transition" />
                <input type="email" name="email" required placeholder="Your email" className="rounded-lg p-3 bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-300 transition" />
                <textarea name="message" required placeholder="Your feedback or story..." rows={4} className="rounded-lg p-3 bg-white/90 border border-gray-200 focus:ring-2 focus:ring-indigo-300 transition" />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg py-2 mt-2 shadow-lg hover:opacity-90 transition"
                >
                  Send
                </button>
              </form>
            ) : (
              <div className="text-green-600 font-semibold py-8 text-center animate-pulse">
                Thank you for your feedback!<br />
                I’ll read it soon.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
