import { fetchGitHubContributions } from "@/lib/github";
import styles from "./GitHubStats.module.css";

const WEEKS_TO_SHOW = 40;
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getMonthLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short" });
}

export default async function GitHubStats() {
  const data = await fetchGitHubContributions();

  if (!data) {
    return (
      <div className={styles.card}>
        <p className={styles.fallback}>Could not load GitHub contributions right now.</p>
        <a
          href="https://github.com/Acestar21"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fallbackLink}
        >
          View profile on GitHub →
        </a>
      </div>
    );
  }

  const getIntensity = (count: number) => {
    if (count === 0) return styles.level0;
    if (count <= 2) return styles.level1;
    if (count <= 5) return styles.level2;
    if (count <= 9) return styles.level3;
    return styles.level4;
  };

  const recentWeeks = data.weeks.slice(-WEEKS_TO_SHOW);

  const monthLabels: (string | null)[] = [];
  let lastMonth = "";
  
  for (let i = 0; i < recentWeeks.length; i++) {
    const label = getMonthLabel(recentWeeks[i][0]?.date ?? "");
    if (label !== lastMonth) {
      lastMonth = label;
      monthLabels.push(label);
    } else {
      monthLabels.push(null);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.label}>GitHub activity</p>
        <p className={styles.total}>{data.totalContributions} contributions (past year)</p>
      </div>

      <div className={styles.metaRow}>
        <div className={styles.metaItem}>
          <span className={styles.metaValue}>{data.contributionsThisWeek}</span>
          <span className={styles.metaLabel}>this week</span>
        </div>
      </div>

      <div className={styles.graphWrapper}>
        <div className={styles.monthRow}>
          {monthLabels.map((label, i) =>
            label ? (
              <span key={i} className={styles.monthLabel}>
                {label}
              </span>
            ) : (
              <span key={i} />
            )
          )}
        </div>

        <div className={styles.gridRow}>
          <div className={styles.weekdayColumn}>
            {WEEKDAY_LABELS.map((label, i) => (
              <span key={i} className={styles.weekdayLabel}>
                {label}
              </span>
            ))}
          </div>

          <div className={styles.grid}>
            {recentWeeks.map((week, weekIndex) => (
              <div key={weekIndex} className={styles.week}>
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`${styles.cell} ${getIntensity(day.count)}`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

     <a
        href="https://github.com/Acestar21"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewLink}
      >
        View on GitHub →
      </a>
    </div>
  );
}