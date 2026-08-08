import { getAllContent } from "@/lib/mdx";
import { skills } from "@/data/skills";
import styles from "./page.module.css";

export default function ResumePage() {
	const projects = getAllContent("projects");
	const comfortableSkills = skills.filter(
		(s) => s.tier === "Comfortable",
	).length;

	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<div>
					<h1 className={styles.heading}>Resume</h1>
					<p className={styles.subheading}>
						BTech CSE · Backend &amp; AI Engineering
					</p>
				</div>
				<a href="/resume.pdf" download className={styles.downloadBtn}>
					Download PDF ↓
				</a>
			</div>

			<div className={styles.statsRow}>
				<div className={styles.statCard}>
					<p className={styles.statValue}>{projects.length}</p>
					<p className={styles.statLabel}>Projects shipped</p>
				</div>
				<div className={styles.statCard}>
					<p className={styles.statValue}>{comfortableSkills}+</p>
					<p className={styles.statLabel}>Core technologies</p>
				</div>
				<div className={styles.statCard}>
					<p className={styles.statValue}>9.43</p>
					<p className={styles.statLabel}>CGPA</p>
				</div>
			</div>

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
