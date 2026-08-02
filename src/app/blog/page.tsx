import Link from "next/link";
import { getAllContent } from "@/lib/mdx";
import type { BlogFrontmatter } from "@/lib/mdx";
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

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet. Check back soon.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{post.frontmatter.title}</h2>
                <span className={styles.date}>{post.frontmatter.date}</span>
              </div>
              <p className={styles.summary}>{post.frontmatter.summary}</p>
              <div className={styles.tags}>
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}