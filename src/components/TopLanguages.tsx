import { fetchGitHubLanguages } from "@/lib/github";
import styles from "./TopLanguages.module.css";

export default async function TopLanguages() {
	const languages = await fetchGitHubLanguages();

	if (!languages || languages.length === 0) {
		return (
			<div className={styles.card}>
				<p className={styles.fallback}>
					Language stats unavailable right now.
				</p>
			</div>
		);
	}

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<p className={styles.label}>Top Languages</p>
				<p className={styles.total}>{languages.length}</p>
			</div>

			<div className={styles.stackedBar}>
				{languages.map((lang) => (
					<div
						key={lang.name}
						className={styles.stackedSegment}
						style={{
							width: `${lang.percentage}%`,
							background: lang.color,
						}}
						title={`${lang.name}: ${lang.percentage}%`}
					/>
				))}
			</div>

			<div className={styles.list}>
				{languages.map((lang) => (
					<div key={lang.name} className={styles.langRow}>
						<span
							className={styles.dot}
							style={{ background: lang.color }}
						/>
						<span className={styles.langName}>{lang.name}</span>
						<span className={styles.langPercent}>
							{lang.percentage}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
