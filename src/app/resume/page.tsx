import styles from "./page.module.css";

export default function ResumePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Resume</h1>
      <p className={styles.subheading}>
        <a href="/resume.pdf" download className={styles.downloadLink}>
          Download PDF ↓
        </a>
      </p>

      <div className={styles.viewer}>
        <iframe
          src="/resume.pdf"
          title="Resume"
          className={styles.iframe}
        />
      </div>
    </main>
  );
}