import Link from "next/link";
import { getAllContent } from "@/lib/mdx";
import type { ProjectFrontmatter } from "@/lib/mdx";
import Image from "next/image";
import ProjectRow from "@/components/ProjectRow";
import styles from "./HomeShowcase.module.css";

const usesSpecs = [
	{ label: "OS", value: "Windows 11 / Linux" },
	{ label: "Editor", value: "VS Code / Zed" },
	{ label: "Shell", value: "PowerShell / bash" },
	{ label: "Languages", value: "TypeScript, Python, C++" },
	{ label: "Frameworks", value: "Next.js, FastAPI, React, Tauri" },
	{ label: "AI Tools", value: "Claude, Ollama, GitHub Copilot" },
	{ label: "Deploy", value: "Vercel" },
];

const swatchColors = [
	"var(--bg-base)",
	"#ff5f56",
	"#27c93f",
	"#ffbd2e",
	"var(--accent)",
	"var(--accent-hover)",
	"var(--text-secondary)",
];

export default function HomeShowcase() {
	const allProjects = getAllContent("projects") as {
		slug: string;
		frontmatter: ProjectFrontmatter;
	}[];

	const featured = allProjects.filter((p) => p.frontmatter.featured);

	return (
		<section className={styles.section}>
			<div className={styles.sticky}>
				<div className={styles.terminal}>
					<div className={styles.titleBar}>
						<span
							className={styles.dot}
							style={{ background: "#ff5f56" }}
						/>
						<span
							className={styles.dot}
							style={{ background: "#ffbd2e" }}
						/>
						<span
							className={styles.dot}
							style={{ background: "#27c93f" }}
						/>
						<span className={styles.titleBarLabel}>
							kushal@portfolio: ~
						</span>
					</div>

					<div className={styles.specs}>
						<div className={styles.avatar}>
							<Image
								src="/images/avatar.jpg"
								alt="Kushal"
								width={140}
								height={140}
								className={styles.avatarImage}
							/>
						</div>

						<div className={styles.details}>
							<p className={styles.whoami}>kushal@portfolio</p>
							<p className={styles.divider}>------------------</p>
							{usesSpecs.map((spec) => (
								<p key={spec.label} className={styles.specLine}>
									<span className={styles.specLabel}>
										{spec.label}
									</span>
									<span className={styles.specValue}>
										{spec.value}
									</span>
								</p>
							))}
							<div className={styles.colorSwatches}>
								{swatchColors.map((color, i) => (
									<span
										key={i}
										className={styles.swatch}
										style={{ background: color }}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.scrollArea}>
				<h2 className={styles.heading}>Featured Projects</h2>
				{featured.map((project) => (
					<ProjectRow
						key={project.slug}
						slug={project.slug}
						frontmatter={project.frontmatter}
					/>
				))}

				<Link href="/projects" className={styles.viewAll}>
					View all projects →
				</Link>
			</div>
		</section>
	);
}
