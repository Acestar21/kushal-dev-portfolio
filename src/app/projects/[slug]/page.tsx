import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { getContentBySlug } from "@/lib/mdx";
import { mdxOptions } from "@/lib/mdx-options";
import styles from "./page.module.css";

export function generateStaticParams() {
	const dir = path.join(process.cwd(), "content", "projects");
	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
	return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let content: string;
	let frontmatter;

	try {
		({ content, frontmatter } = getContentBySlug("projects", slug));
	} catch {
		notFound();
	}

	return (
		<main className={styles.main}>
			<Link href="/projects" className={styles.back}>
				← Back to projects
			</Link>

			<div className={styles.heroImageWrapper}>
				<Image
					src={`/images/projects/${slug}-preview.png`}
					alt={frontmatter.title}
					fill
					sizes="720px"
					className={styles.heroImage}
					priority
				/>
			</div>

			<h1 className={styles.title}>{frontmatter.title}</h1>
			<p className={styles.tagline}>{frontmatter.tagline}</p>

			<div className={styles.meta}>
				<span className={styles.status}>{frontmatter.status}</span>
				{frontmatter.stack.map((tech: string) => (
					<span key={tech} className={styles.tech}>
						{tech}
					</span>
				))}
			</div>

			{frontmatter.links?.github && (
				<a
					href={frontmatter.links.github}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.sourceLink}
				>
					View Source
				</a>
			)}

			<article className={styles.article}>
				<MDXRemote source={content} options={mdxOptions} />
			</article>
		</main>
	);
}
