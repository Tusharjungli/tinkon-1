// pages/contact.tsx
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState(""); // invisible field for bots

  // Your existing Formspree endpoint (change if you want)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeolqlle";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) {
      // bot detected, silently ignore
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Head>
        <title>Contact — Tink On It</title>
        <meta name="description" content="Contact Tushar Panchal at tinkon.in — email or use the contact form." />
        {/* ContactPoint JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Tushar Panchal",
              "url": "https://tinkon.in/",
              "sameAs": [
                "https://twitter.com/Tusharjungli"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "email": "tusharpanchal@gmail.com",
                  "contactType": "customer support",
                  "areaServed": "IN",
                  "availableLanguage": ["English"]
                }
              ]
            }),
          }}
        />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">Say hi — contact me</h1>
        <p className="text-gray-700 mb-6">
          I read every message. For short things, email me directly:{" "}
          <a href="mailto:jungli0beast@gmail.com" className="text-blue-600 hover:underline">
            tusharpanchal@gmail.com
          </a>
          . Or use this form below and I’ll reply to your email.
        </p>

        <section className="mb-10 bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} aria-label="Contact form">
            <label className="block mb-2 text-sm font-semibold">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 mb-3"
              placeholder="Your name"
            />

            <label className="block mb-2 text-sm font-semibold">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 mb-3"
              placeholder="name@domain.com"
            />

            {/* honeypot field - hidden from users, traps naive bots */}
            <input
              type="text"
              name="phone"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <label className="block mb-2 text-sm font-semibold">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full rounded-md border px-3 py-2 mb-4"
              placeholder="Write your message…"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 disabled:opacity-60"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "success" && <span className="text-green-600">Thanks — I’ll reply soon.</span>}
              {status === "error" && <span className="text-red-600">Something went wrong. Try again later.</span>}
            </div>
          </form>
        </section>

        <div className="text-sm text-gray-600">
          <p>If you prefer, you can also reach me on <Link href="/about" className="text-blue-600 hover:underline">About</Link>
 (social links) or reply to my newsletter if you’re subscribed.</p>
        </div>
      </main>
    </>
  );
}
