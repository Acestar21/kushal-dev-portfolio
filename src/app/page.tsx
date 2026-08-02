import Link from "next/link";
import { socials } from "@/data/socials";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Hi, I&apos;m Kushal</h1>
        <p className={styles.tagline}>
          BTech CSE student · Backend &amp; AI engineering · Building things that work
        </p>
        <ul className={styles.socials}>
          {socials.map((social) => (
            <li key={social.label}>
                <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats placeholders — wired to real GitHub/LeetCode data later */}
      <section className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>GitHub activity</p>
          <p className={styles.statPlaceholder}>Coming soon</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>LeetCode progress</p>
          <p className={styles.statPlaceholder}>Coming soon</p>
        </div>
      </section>

      <section className={styles.featured}>
        <div>
          <h2 className={styles.featuredTitle}>Featured Project: Nexus</h2>
          <p className={styles.featuredDesc}>
            Local-first developer dashboard with MCP protocol support and AI integration.
          </p>
        </div>
        <Link href="/projects/nexus" className={styles.featuredLink}>
          View Project →
        </Link>
      </section>
    </main>
  );
}