import { fetchLeetCodeStats } from "@/lib/leetcode";
import styles from "./LeetCodeStats.module.css";

export default async function LeetCodeStats() {
  const stats = await fetchLeetCodeStats();

  const bars = [
    { label: "Easy", count: stats.easySolved, className: styles.easy },
    { label: "Medium", count: stats.mediumSolved, className: styles.medium },
    { label: "Hard", count: stats.hardSolved, className: styles.hard },
  ];

  const maxCount = Math.max(...bars.map((b) => b.count), 1);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.label}>LeetCode progress</p>
        <p className={styles.total}>
          {stats.totalSolved} <span className={styles.totalUnit}>solved</span>
        </p>
      </div>

      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <span className={styles.metaValue}>{stats.streak}</span>
          <span className={styles.metaLabel}>day streak</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaValue}>{stats.totalActiveDays}</span>
          <span className={styles.metaLabel}>active days</span>
        </div>
      </div>

      <div className={styles.bars}>
        {bars.map((bar) => (
          <div key={bar.label} className={styles.barRow}>
            <div className={styles.barLabelRow}>
              <span className={styles.barLabel}>{bar.label}</span>
              <span className={styles.barCount}>{bar.count}</span>
            </div>
            <div className={styles.track}>
              <div
                className={`${styles.fill} ${bar.className}`}
                style={{ width: `${(bar.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {!stats.isLive && (
        <p className={styles.staleNotice}>
          Showing cached data as of {stats.lastUpdated}
        </p>
      )}
    </div>
  );
}