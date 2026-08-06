import Link from "next/link";
import Hero from "@/components/Hero";
import HomeShowcase from "@/components/HomeShowcase";
import GitHubStats from "@/components/GitHubStats";
import LeetCodeStats from "@/components/LeetCodeStats";
import AboutCard from "@/components/AboutCard";
import TopLanguages from "@/components/TopLanguages";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import { getAllContent } from "@/lib/mdx";
import type { BlogFrontmatter } from "@/lib/mdx";
import styles from "./page.module.css";

export default function Home() {
  const posts = getAllContent("blog") as {
    slug: string;
    frontmatter: BlogFrontmatter;
  }[];

  return (
    <main className={styles.main}>
      <Hero />
      <HomeShowcase />

      <div className={styles.content}>
        <section className={styles.statsSection}>
          <h2 className={styles.statsHeading}>Activity</h2>
            <AboutCard />
          <div className={styles.statsLayout}>
            <div className={styles.statsLeft}>
              <div className={styles.statCard}>
                <GitHubStats />
              </div>
              <div className={styles.statsMiniGrid}>
                <div className={styles.statCard}>
                  <LeetCodeStats />
                </div>
                <div className={styles.statCard}>
                  <TopLanguages />
                </div>
              </div>
            </div>

            <div className={styles.blogColumn}>
              <div className={styles.blogHeader}>
                <h3 className={styles.blogHeading}>Featured Blogs</h3>
                <Link href="/blog" className={styles.viewAllBlog}>
                  View all →
                </Link>
              </div>
              <div className={styles.blogScrollArea}>
                {posts.length === 0 ? (
                  <p className={styles.emptyBlog}>No posts yet. Check back soon.</p>
                ) : (
                  posts.map((post) => (
                    <BlogPreviewCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}