import Link from "next/link";
import { getAllContent } from "@/lib/mdx";
import type { ProjectFrontmatter } from "@/lib/mdx";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const projects = getAllContent("projects") as {
    slug: string;
    frontmatter: ProjectFrontmatter;
  }[];

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Projects</h1>
      <p className={styles.subheading}>Things I&apos;ve built and am building</p>

      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{project.frontmatter.title}</h2>
              <span className={styles.status}>{project.frontmatter.status}</span>
            </div>
            <p className={styles.tagline}>{project.frontmatter.tagline}</p>
            <div className={styles.stack}>
              {project.frontmatter.stack.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}