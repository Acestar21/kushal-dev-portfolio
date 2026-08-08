"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import type { BlogFrontmatter } from "@/lib/mdx";
import styles from "./BlogFilterList.module.css";

type Post = {
	slug: string;
	frontmatter: BlogFrontmatter;
};

const QUICK_FILTER_COUNT = 4;

export default function BlogFilterList({ posts }: { posts: Post[] }) {
	const [activeTag, setActiveTag] = useState<string>("All");
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const allTags = useMemo(() => {
		const tagCounts = new Map<string, number>();
		posts.forEach((post) =>
			post.frontmatter.tags.forEach((tag) =>
				tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1),
			),
		);
		return Array.from(tagCounts.entries())
			.sort((a, b) => b[1] - a[1])
			.map(([tag]) => tag);
	}, [posts]);

	const quickTags = allTags.slice(0, QUICK_FILTER_COUNT);
	const moreTags = allTags.slice(QUICK_FILTER_COUNT);

	// Close the dropdown when clicking outside it
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const filtered =
		activeTag === "All"
			? posts
			: posts.filter((post) => post.frontmatter.tags.includes(activeTag));

	return (
		<div>
			<div className={styles.filters}>
				<button
					onClick={() => setActiveTag("All")}
					className={`${styles.filterBtn} ${activeTag === "All" ? styles.filterBtnActive : ""}`}
				>
					All
				</button>

				{quickTags.map((tag) => (
					<button
						key={tag}
						onClick={() => setActiveTag(tag)}
						className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ""}`}
					>
						{tag}
					</button>
				))}

				{moreTags.length > 0 && (
					<div className={styles.dropdownWrapper} ref={dropdownRef}>
						<button
							onClick={() => setDropdownOpen((open) => !open)}
							className={`${styles.filterBtn} ${moreTags.includes(activeTag) ? styles.filterBtnActive : ""}`}
						>
							{moreTags.includes(activeTag)
								? activeTag
								: "More filters"}{" "}
							▾
						</button>

						{dropdownOpen && (
							<div className={styles.dropdown}>
								{moreTags.map((tag) => (
									<button
										key={tag}
										onClick={() => {
											setActiveTag(tag);
											setDropdownOpen(false);
										}}
										className={`${styles.dropdownItem} ${activeTag === tag ? styles.dropdownItemActive : ""}`}
									>
										{tag}
									</button>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{filtered.length === 0 ? (
				<p className={styles.empty}>No posts with this tag yet.</p>
			) : (
				<div className={styles.list}>
					{filtered.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className={styles.card}
						>
							<div className={styles.cardHeader}>
								<h2 className={styles.cardTitle}>
									{post.frontmatter.title}
								</h2>
								<span className={styles.date}>
									{post.frontmatter.date}
								</span>
							</div>
							<p className={styles.summary}>
								{post.frontmatter.summary}
							</p>
							<div className={styles.tags}>
								{post.frontmatter.tags.map((tag) => (
									<span key={tag} className={styles.tag}>
										{tag}
									</span>
								))}
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
