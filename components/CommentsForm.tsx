// components/CommentsForm.tsx
import { useState } from "react";

type Props = {
  endpoint: string;   // your Formspree endpoint (full URL)
  postSlug: string;   // post slug so we can identify which post the comment belongs to
};

export default function CommentsForm({ endpoint, postSlug }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState(""); // hidden field for bots

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) {
      // simple bot check - ignore silently
      return;
    }
    if (!comment.trim()) return;
    setStatus("sending");

    try {
      // Formspree accepts JSON. We include postSlug and timestamp for your moderation view.
      const payload = {
        name: name || "Anonymous",
        email: email || "",
        comment: comment.trim(),
        post: postSlug,
        submittedAt: new Date().toISOString()
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setComment("");
      } else {
        setStatus("error");
        console.error("Formspree response not ok:", await res.text());
      }
    } catch (err) {
      setStatus("error");
      console.error("CommentsForm error:", err);
    }
  }

  return (
    <div className="mt-10">
      <div className="mb-3 text-sm font-semibold">Leave a comment</div>

      <form onSubmit={handleSubmit} className="space-y-3 bg-white dark:bg-gray-900 p-4 rounded-lg border">
        <input
          type="text"
          name="hp_name" // visible name field
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />

        <input
          type="email"
          name="hp_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional — for replies)"
          className="w-full rounded-md border px-3 py-2 text-sm"
        />

        {/* honeypot: keep it visually hidden */}
        <div style={{ display: "none" }}>
          <label>Leave this field empty</label>
          <input
            name="extra_field"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
          />
        </div>

        <textarea
          name="hp_comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows={5}
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-4 py-2 rounded-md bg-pink-600 text-white font-medium hover:bg-pink-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Post comment"}
          </button>

          {status === "success" && (
            <div className="text-sm text-green-600">Thanks — comment submitted. I’ll review and publish it soon.</div>
          )}
          {status === "error" && (
            <div className="text-sm text-red-600">Something went wrong. Try again later.</div>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          <div>By submitting, you confirm you’re okay with your comment being moderated and published.</div>
        </div>
      </form>
    </div>
  );
}
