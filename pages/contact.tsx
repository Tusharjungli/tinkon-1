export default function Contact() {
  return (
    <section className="max-w-xl mx-auto py-24 px-6">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <p className="mb-4 text-lg text-gray-700">
        Got something on your mind? Want to share your own story, ask a question, or just say hi? I’m always open to a good message—even if you’re just here to recommend a dog meme.
      </p>
      <div className="space-y-2 text-base text-gray-800">
        <div>
          <span className="font-semibold">Email: </span>
          <a href="mailto:jungli0beast@gmail.com" className="underline text-blue-600">tusharpanchal@gmail.com</a>
        </div>
        <div>
          <span className="font-semibold">LinkedIn: </span>
          <a href="https://www.linkedin.com/in/tushar-p-bb6466122/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">linkedin.com/in/tusharpanchal</a>
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
  );
}
