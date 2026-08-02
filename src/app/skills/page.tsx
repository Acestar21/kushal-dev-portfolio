import { skills } from "@/data/skills";
import SkillsGrid from "@/components/SkillsGrid";
import styles from "./page.module.css";

export default function SkillsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Skills</h1>
      <p className={styles.subheading}>Technologies and tools I work with</p>
      <SkillsGrid skills={skills} />
    </main>
  );
}