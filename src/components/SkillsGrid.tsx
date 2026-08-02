"use client";

import { useState } from "react";
import type { Skill, SkillDomain } from "@/data/skills";
import styles from "./SkillsGrid.module.css";

const domains: (SkillDomain | "All")[] = [
  "All",
  "Backend",
  "Frontend",
  "AI/Agentic",
  "Security",
  "Tools",
];

const tierClass: Record<Skill["tier"], string> = {
  Comfortable: styles.tierComfortable,
  "Working knowledge": styles.tierWorking,
  "Currently learning": styles.tierLearning,
};

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const [activeDomain, setActiveDomain] = useState<SkillDomain | "All">("All");

  const filtered =
    activeDomain === "All"
      ? skills
      : skills.filter((skill) => skill.domain === activeDomain);

  return (
    <div>
      <div className={styles.filters}>
        {domains.map((domain) => (
          <button
            key={domain}
            onClick={() => setActiveDomain(domain)}
            className={`${styles.filterBtn} ${
              activeDomain === domain ? styles.filterBtnActive : ""
            }`}
          >
            {domain}
          </button>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={`${styles.legendDot} ${styles.tierComfortable}`} />
        Comfortable
        <span className={`${styles.legendDot} ${styles.tierWorking}`} />
        Working knowledge
        <span className={`${styles.legendDot} ${styles.tierLearning}`} />
        Currently learning
      </div>

      <div className={styles.grid}>
        {filtered.map((skill) => (
          <span
            key={skill.name}
            className={`${styles.badge} ${tierClass[skill.tier]}`}
          >
            {skill.name}
            {skill.projectRefs && skill.projectRefs.length > 0 && (
              <span className={styles.linkIcon} title="Demonstrated in a project">
                ↗
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}