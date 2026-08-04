import { getAllContent } from "@/lib/mdx";
import type { BlogFrontmatter } from "@/lib/mdx";
import BlogFilterList from "@/components/BlogFilterList";
import styles from "./page.module.css";

export default function BlogPage() {
  const posts = getAllContent("blog") as {
    slug: string;
    frontmatter: BlogFrontmatter;
  }[];

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Blog</h1>
      <p className={styles.subheading}>Thoughts, learnings, and technical deep-dives</p>
      <BlogFilterList posts={posts} />
    </main>
  );
}