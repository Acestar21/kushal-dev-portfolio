import SkillsGrid from "@/components/SkillsGrid";
import SoftSkills from "@/components/SoftSkills";
import styles from "./page.module.css";

export default function SkillsPage() {
	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Skills</h1>
			<p className={styles.subheading}>
				Technologies and tools I work with
			</p>

			<SkillsGrid />

			<section className={styles.softSection}>
				<h2 className={styles.sectionHeading}>Beyond Code</h2>
				<p className={styles.sectionSubheading}>
					Other skills and areas of interest
				</p>
				<SoftSkills />
			</section>
		</main>
	);
}
