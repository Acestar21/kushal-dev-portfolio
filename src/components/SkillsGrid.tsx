"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { skills } from "@/data/skills";
import type { SkillDomain } from "@/data/skills";
import styles from "./SkillsGrid.module.css";

const QUICK_FILTER_COUNT = 3;
const ALL_DOMAINS: SkillDomain[] = ["Backend", "Frontend", "AI/Agentic", "Security", "Tools"];

const tierClass: Record<string, string> = {
  Comfortable: styles.tierComfortable,
  "Working knowledge": styles.tierWorking,
  "Currently learning": styles.tierLearning,
};

export default function SkillsGrid() {
  const [activeDomain, setActiveDomain] = useState<SkillDomain | "All">("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Only show domains that actually have skills in them, in a stable order
  const domainsWithSkills = useMemo(
    () => ALL_DOMAINS.filter((domain) => skills.some((s) => s.domain === domain)),
    []
  );

  const quickDomains = domainsWithSkills.slice(0, QUICK_FILTER_COUNT);
  const moreDomains = domainsWithSkills.slice(QUICK_FILTER_COUNT);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered =
    activeDomain === "All" ? skills : skills.filter((s) => s.domain === activeDomain);

  return (
    <div>
      <div className={styles.filters}>
        <button
          onClick={() => setActiveDomain("All")}
          className={`${styles.filterBtn} ${activeDomain === "All" ? styles.filterBtnActive : ""}`}
        >
          All
        </button>

        {quickDomains.map((domain) => (
          <button
            key={domain}
            onClick={() => setActiveDomain(domain)}
            className={`${styles.filterBtn} ${activeDomain === domain ? styles.filterBtnActive : ""}`}
          >
            {domain}
          </button>
        ))}

        {moreDomains.length > 0 && (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              className={`${styles.filterBtn} ${moreDomains.includes(activeDomain as SkillDomain) ? styles.filterBtnActive : ""}`}
            >
              {moreDomains.includes(activeDomain as SkillDomain) ? activeDomain : "More"} ▾
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                {moreDomains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => {
                      setActiveDomain(domain);
                      setDropdownOpen(false);
                    }}
                    className={`${styles.dropdownItem} ${activeDomain === domain ? styles.dropdownItemActive : ""}`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.legend}>
        <span className={`${styles.legendSwatch} ${styles.tierComfortable}`} />
        Comfortable
        <span className={`${styles.legendSwatch} ${styles.tierWorking}`} />
        Working knowledge
        <span className={`${styles.legendSwatch} ${styles.tierLearning}`} />
        Currently learning
      </div>

      <div className={styles.grid}>
        {filtered.map((skill) => {
          const Icon = skill.icon;
          return (
            <div key={skill.name} className={`${styles.iconTile} ${tierClass[skill.tier]}`}>
              <Icon
                className={styles.icon}
                style={{ color: skill.color ?? "var(--text-secondary)" }}
              />
              <span className={styles.tooltip}>
                {skill.name} · {skill.tier}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}