import Link from "next/link";
import Image from "next/image";
import type { BlogFrontmatter } from "@/lib/mdx";
import styles from "./BlogPreviewCard.module.css";

type Props = {
  slug: string;
  frontmatter: BlogFrontmatter;
};

export default function BlogPreviewCard({ slug, frontmatter }: Props) {
  return (
    <Link href={`/blog/${slug}`} className={styles.card}>
      {frontmatter.coverImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            sizes="200px"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.info}>
        <p className={styles.date}>{frontmatter.date}</p>
        <h3 className={styles.title}>{frontmatter.title}</h3>
        <p className={styles.summary}>{frontmatter.summary}</p>
        <div className={styles.tags}>
          {frontmatter.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}