import SeoHead from "@/components/SeoHead";

export default function MDXPostLayout({
  frontMatter,
  children,
}: {
  frontMatter: {
    title: string;
    description: string;
    date?: string;
    lastUpdated?: string;
    coverImage?: string;
    author?: string;
    tags?: string[];
  };
  children: React.ReactNode;
}) {
  return (
    <>
      <SeoHead title={frontMatter.title} description={frontMatter.description} />
      <article className="prose dark:prose-invert max-w-3xl mx-auto px-4">
        {children}
      </article>
    </>
  );
}
