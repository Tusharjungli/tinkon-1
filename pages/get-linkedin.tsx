// pages/get-linkedin.tsx
import Head from "next/head";
import { useState } from "react";

export default function GetLinkedIn() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Update the endpoint below with your own Formspree or email handler!
      const res = await fetch("https://formspree.io/f/manjnpzn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError("Something went wrong. Please try again later!");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Request My LinkedIn | Tink On It</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="max-w-lg mx-auto py-28 px-6 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-2"> LinkedIn On Request</h1>
        <p className="mb-8 text-gray-600">
          I only share my LinkedIn with genuine people and collaborators.<br />
          If you’re looking to connect for real, <b>just drop your email and a short note</b> below.<br />
          If we vibe, I’ll personally reply with my LinkedIn link!
        </p>
        {!sent ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full max-w-sm"
            autoComplete="off"
          >
            <input
              type="email"
              name="email"
              required
              disabled={loading}
              placeholder="Your email"
              className="rounded-lg p-3 bg-white border border-gray-200 w-full focus:ring-2 focus:ring-indigo-200 transition"
            />
            <textarea
              name="message"
              required
              disabled={loading}
              placeholder="Why do you want to connect? (Short intro)"
              rows={3}
              className="rounded-lg p-3 bg-white border border-gray-200 w-full focus:ring-2 focus:ring-indigo-200 transition"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white font-semibold rounded-lg py-2 px-8 shadow hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Request Access"}
            </button>
          </form>
        ) : (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm text-green-700">
            <p className="font-semibold text-lg mb-2">Thanks for reaching out!</p>
            <p>
              If we vibe, I’ll reply to your email soon with my LinkedIn.<br />
              (If not, nothing personal—just keeping things real!)
            </p>
            <p className="mt-4 text-xs text-gray-500 italic">Want a faster reply? Tell me where you found this page!</p>
          </div>
        )}
      </main>
    </>
  );
}
