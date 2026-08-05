import TimelineView from "@/components/TimelineView";
import styles from "./page.module.css";

export default function TimelinePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Timeline</p>
        <h1 className={styles.heading}>A short path through the work so far.</h1>
        <p className={styles.subheading}>
          A downward timeline of the milestones worth surfacing, with smaller markers tucked into the line.
        </p>
      </header>

      <TimelineView />
    </main>
  );
}