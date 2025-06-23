import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact — Tink On It</title>
        <meta name="description" content="Contact Tushar Panchal, the introvert and writer behind Tink On It. Email or LinkedIn is just a click away!" />
        <meta property="og:title" content="Contact — Tink On It" />
        <meta property="og:description" content="Contact Tushar Panchal, the introvert and writer behind Tink On It. Email or LinkedIn is just a click away!" />
        <meta property="og:image" content="https://tinkon.in/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinkon.in/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact — Tink On It" />
        <meta name="twitter:description" content="Contact Tushar Panchal, the introvert and writer behind Tink On It. Email or LinkedIn is just a click away!" />
        <meta name="twitter:image" content="https://tinkon.in/og-image.jpg" />
      </Head>
      <main className="max-w-xl mx-auto py-24 px-6">
        <section className="bg-white/70 dark:bg-gray-900/85 backdrop-blur-md rounded-2xl p-8 flex flex-col transition-colors">
          <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Contact</h1>
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
            Got something on your mind? Want to share your own story, ask a question, or just say hi? I’m always open to a good message—even if you’re just here to recommend a dog meme.
          </p>
          <div className="space-y-2 text-base text-gray-800 dark:text-gray-100">
            <div>
              <span className="font-semibold">Email: </span>
              <a
                href="mailto:tusharpanchal@gmail.com"
                className="text-black dark:text-white hover:underline focus:underline transition-colors"
                style={{ textDecoration: "none" }}
              >
                tusharpanchal@gmail.com
              </a>
            </div>
            <div>
              <span className="font-semibold">LinkedIn: </span>
              <Link
                href="/get-linkedin"
                className="text-black dark:text-white hover:underline focus:underline transition-colors"
                aria-label="LinkedIn"
                style={{ textDecoration: "none" }}
              >
                linkedin.com/in/tusharpanchal
              </Link>
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400 pt-6 text-sm">
            <span>
              <i>
                P.S. I actually read every email—even the weird ones. Replies might be slow, but they&apos;re real.
              </i>
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
