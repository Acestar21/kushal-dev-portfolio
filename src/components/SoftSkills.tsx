import { softSkills } from "@/data/soft-skills";
import styles from "./SoftSkills.module.css";

export default function SoftSkills() {
  return (
    <div className={styles.list}>
      {softSkills.map((skill) => (
        <div key={skill.name} className={styles.card}>
          <p className={styles.name}>{skill.name}</p>
          {skill.note && <p className={styles.note}>{skill.note}</p>}
        </div>
      ))}
    </div>
  );
}   