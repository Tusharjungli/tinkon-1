import Head from "next/head";

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
      <section className="max-w-xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <p className="mb-4 text-lg text-gray-700">
          Got something on your mind? Want to share your own story, ask a question, or just say hi? I’m always open to a good message—even if you’re just here to recommend a dog meme.
        </p>
        <div className="space-y-2 text-base text-gray-800">
          <div>
            <span className="font-semibold">Email: </span>
            <a href="mailto:tusharpanchal@gmail.com" className="underline text-blue-600">
              tusharpanchal@gmail.com
            </a>
          </div>
          <div>
            <span className="font-semibold">LinkedIn: </span>
            <a
              href="https://www.linkedin.com/in/tushar-p-bb6466122/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              linkedin.com/in/tusharpanchal
            </a>
          </div>
        </div>
        <div className="text-gray-500 pt-6 text-sm">
          <span>
            <i>
              P.S. I actually read every email—even the weird ones. Replies might be slow, but they&apos;re real.
            </i>
          </span>
        </div>
      </section>
    </>
  );
}
