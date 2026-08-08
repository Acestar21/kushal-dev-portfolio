import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { getContentBySlug } from "@/lib/mdx";
import { mdxOptions } from "@/lib/mdx-options";
import TableOfContents from "@/components/TableOfContents";
import styles from "./page.module.css";

export function generateStaticParams() {
	const dir = path.join(process.cwd(), "content", "blog");
	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
	return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	let content: string;
	let frontmatter;

	try {
		({ content, frontmatter } = getContentBySlug("blog", slug));
	} catch {
		notFound();
	}

	return (
		<div className={styles.layout}>
			<main className={styles.main}>
				<Link href="/blog" className={styles.back}>
					← Back to blog
				</Link>

				{frontmatter.coverImage && (
					<div className={styles.heroImageWrapper}>
						<Image
							src={frontmatter.coverImage}
							alt={frontmatter.title}
							fill
							sizes="720px"
							className={styles.heroImage}
							priority
						/>
					</div>
				)}

				<h1 className={styles.title}>{frontmatter.title}</h1>

				<div className={styles.meta}>
					<span>{frontmatter.date}</span>
					{frontmatter.tags.map((tag: string) => (
						<span key={tag} className={styles.tag}>
							{tag}
						</span>
					))}
				</div>

				<article className={styles.article}>
					<MDXRemote source={content} options={mdxOptions} />
				</article>
			</main>
			<TableOfContents />
		</div>
	);
}
