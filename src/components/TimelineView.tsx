"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { motion } from "framer-motion";
import { timelineEntries, type TimelineEntry } from "@/data/timeline";
import styles from "./TimelineView.module.css";

const categoryLabels: Record<TimelineEntry["category"], string> = {
  Education: "🎓 Education",
  Project: "🛠️ Project",
  Work: "💼 Work",
  Learning: "📚 Learning",
  Achievement: "🏆 Achievement",
};

const categoryClasses: Record<TimelineEntry["category"], string> = {
  Education: styles.education,
  Project: styles.project,
  Work: styles.work,
  Learning: styles.learning,
  Achievement: styles.achievement,
};

function TimelineNode({ entry, index, activeId, setActiveId }: {
  entry: TimelineEntry;
  index: number;
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}) {
  const isActive = activeId === `${entry.date}-${entry.title}`;
  const isMajor = entry.kind === "major";
  const side = index % 2 === 0 ? styles.left : styles.right;

  if (!isMajor) {
    return (
      <motion.li
        className={styles.minorItem}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index * 0.04, 0.18) }}
      >
        <div className={styles.minorNode}>
          <button
            type="button"
            className={`${styles.marker} ${styles.minorMarker} ${isActive ? styles.markerActive : ""}`}
            aria-expanded={isActive}
            aria-controls={`${entry.date}-${entry.title}`}
            aria-label={`${entry.title}, ${entry.date}`}
            onClick={() => setActiveId(isActive ? null : `${entry.date}-${entry.title}`)}
            onFocus={() => setActiveId(`${entry.date}-${entry.title}`)}
            onBlur={() => setActiveId((current) => (current === `${entry.date}-${entry.title}` ? null : current))}
          />

          <div
            id={`${entry.date}-${entry.title}`}
            className={`${styles.minorPopover} ${isActive ? styles.popoverOpen : ""}`}
            role="status"
            aria-live="polite"
          >
            <span className={`${styles.badge} ${categoryClasses[entry.category]}`}>{categoryLabels[entry.category]}</span>
            <div className={styles.minorPopoverBody}>
              <div className={styles.minorPopoverTop}>
                <h3 className={styles.minorTitle}>{entry.title}</h3>
                <span className={styles.date}>{entry.date}</span>
              </div>
              <p className={styles.minorDescription}>{entry.description}</p>
            </div>
          </div>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      className={`${styles.item} ${isMajor ? side : styles.minorItem}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: Math.min(index * 0.06, 0.24) }}
    >
      <div className={`${styles.markerWrap} ${isMajor ? styles.majorMarkerWrap : styles.minorMarkerWrap}`}>
        <span className={`${styles.marker} ${styles.majorMarker}`} aria-hidden="true" />
        {isMajor && <span className={styles.connector} aria-hidden="true" />}
      </div>

      <div className={`${styles.contentWrap} ${isMajor ? styles.majorContentWrap : styles.minorContentWrap}`}>
        <div className={`${styles.card} ${isMajor ? styles.majorCard : styles.minorCard}`}>
          <div className={styles.cardTop}>
            <span className={`${styles.badge} ${categoryClasses[entry.category]}`}>{categoryLabels[entry.category]}</span>
            <span className={styles.date}>{entry.date}</span>
          </div>
          <h2 className={styles.title}>{entry.title}</h2>
          <p className={styles.description}>{entry.description}</p>
        </div>
      </div>
    </motion.li>
  );
}

export default function TimelineView() {
  const [activeId, setActiveId] = useState<string | null>(timelineEntries[0] ? `${timelineEntries[0].date}-${timelineEntries[0].title}` : null);

  return (
    <section className={styles.timelineShell}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.nowDot} aria-hidden="true">
        <span className={styles.nowPulse} />
        <span className={styles.nowCore} />
      </div>

      <ol className={styles.timeline}>
        {timelineEntries.map((entry, index) => (
          <TimelineNode
            key={`${entry.date}-${entry.title}`}
            entry={entry}
            index={index}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </ol>
    </section>
  );
}