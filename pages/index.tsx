import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-extrabold mb-8">Welcome to Tink On It</h1>
      <Link href="/blog" className="text-xl underline text-blue-600">Go to Blog</Link>
    </main>
  );
}
