import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/mdx";
import type { ProjectFrontmatter } from "@/lib/mdx";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const allProjects = getAllContent("projects") as {
    slug: string;
    frontmatter: ProjectFrontmatter;
  }[];

  const projects = [...allProjects].sort((a, b) => {
    const aFeatured = a.frontmatter.featured ? 1 : 0;
    const bFeatured = b.frontmatter.featured ? 1 : 0;
    return bFeatured - aFeatured;
  });

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Projects</h1>
      <p className={styles.subheading}>Things I&apos;ve built and am building</p>

      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.slug} className={styles.cardWrapper}>
            {project.frontmatter.featured && (
              <span className={styles.featuredBadge}>Featured</span>
            )}
            <Link href={`/projects/${project.slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={`/images/projects/${project.slug}-preview.png`}
                  alt={project.frontmatter.title}
                  fill
                  sizes="320px"
                  className={styles.image}
                />
              </div>

              <div className={styles.cardBody}>
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
              </div>
            </Link>

            {project.frontmatter.links?.github && (
                <a
                href={project.frontmatter.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                GitHub →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}