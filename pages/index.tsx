import Link from "next/link";
import Image from "next/image";
import { getAllPosts, BlogMeta } from "@/lib/blog";

type HomeProps = {
  featured: BlogMeta | null;
};

// Static props for Pages Router
export async function getStaticProps() {
  const posts = getAllPosts();
  const featured = posts.length > 0 ? posts[0] : null;
  return {
    props: {
      featured,
    },
  };
}

export default function Home({ featured }: HomeProps) {
  return (
    <section className="max-w-2xl mx-auto py-20 px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4">Tink On It</h1>
      <p className="text-lg text-gray-600 mb-8">
        Real thoughts, stories & brainstorming by Tushar Panchal.<br />
        Honest. Raw. Gen Z.
      </p>

      {featured && (
        <div className="bg-gray-50 rounded-2xl shadow mb-12 p-6">
          <div className="mb-4">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              width={700}
              height={300}
              className="rounded-lg object-cover w-full h-56"
              priority
            />
          </div>
          <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">
            Featured
          </span>
          <h2 className="text-2xl font-bold mt-2 mb-1">{featured.title}</h2>
          <p className="text-gray-500 text-sm mb-3">{featured.description}</p>
          <Link
            href={`/blog/${featured.slug}`}
            className="inline-block bg-black text-white px-6 py-2 rounded-full font-semibold transition hover:bg-gray-800"
          >
            Read More
          </Link>
        </div>
      )}

      <Link
        href="/blog"
        className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold transition hover:bg-gray-800"
      >
        Read the Blog
      </Link>
    </section>
  );
}
