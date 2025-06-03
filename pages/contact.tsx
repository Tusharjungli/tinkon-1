export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>
      <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <p>
          Want to connect, collaborate, or just say hi? You can reach me at:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:jungli0beast@gmail.com" className="text-blue-600 underline">tusharpanchal@gmail.com</a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a href="https://www.linkedin.com/in/tushar-p-bb6466122/" target="_blank" rel="noopener" className="text-blue-600 underline">
              linkedin.com/in/tusharpanchal
            </a>
          </li>
        </ul>
        <form className="space-y-4 pt-4">
          <div>
            <label className="block font-semibold mb-1">Your Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Type your message..."
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            disabled
            title="Static demo (add form handler later)"
          >
            Send (demo)
          </button>
        </form>
      </div>
    </main>
  );
}
