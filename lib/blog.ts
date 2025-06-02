import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: string;
  tags?: string[];
  slug: string;
};

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);
      return {
        ...(data as Omit<BlogMeta, "slug" | "date">),
        date: data.date ? String(data.date) : "",
        slug,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  return {
    ...(data as Omit<BlogMeta, "slug" | "date">),
    date: data.date ? String(data.date) : "",
    slug,
    content,
  };
}
