import styles from "./AboutCard.module.css";

export default function AboutCard() {
  return (
    <div className={styles.card}>
      <div className={styles.section}>
        <p className={styles.label}>What I build</p>
        <p className={styles.text}>
          Local-first developer tools and AI-assisted systems — dashboards, RAG pipelines, and MCP-based agent tooling that keep data on-device rather than in someone else&apos;s cloud.
        </p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Currently</p>
        <p className={styles.text}>
          3rd year BTech CSE, grinding Neetcode 150, and looking for a paid remote backend or AI engineering internship.
        </p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Background</p>
        <p className={styles.text}>
          Computer Science &amp; Engineering Undergraduate Student.
        </p>
      </div>
    </div>
  );
}