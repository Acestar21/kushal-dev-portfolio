import styles from "./page.module.css";

const focusItems = [
	"Entering 3rd year of BTech CSE",
	"Building Nexus — a local-first developer dashboard with MCP protocol support",
	"Grinding Neetcode 150, targeting 150/150 by end of August",
	"Targeting paid remote SDE/backend internships",
	"Aiming for 3 merged OSS PRs by end of August",
];

export default function NowPage() {
	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Now</h1>
			<p className={styles.subheading}>
				Here&apos;s what I&apos;m currently focused on:
			</p>

			<ul className={styles.list}>
				{focusItems.map((item) => (
					<li key={item} className={styles.item}>
						{item}
					</li>
				))}
			</ul>

			<p className={styles.updated}>Last updated: 2026-08-02</p>
		</main>
	);
}
