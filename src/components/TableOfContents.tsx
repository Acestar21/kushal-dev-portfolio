"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./TableOfContents.module.css";

type Heading = {
	id: string;
	text: string;
	level: number;
};

export default function TableOfContents() {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeId, setActiveId] = useState<string>("");
	const [isExpanded, setIsExpanded] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const elements = Array.from(
			document.querySelectorAll("article h2, article h3"),
		);
		const items: Heading[] = elements.map((el) => ({
			id: el.id,
			text: el.textContent ?? "",
			level: el.tagName === "H2" ? 2 : 3,
		}));

		queueMicrotask(() => setHeadings(items));

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "-80px 0px -70% 0px" },
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);

	// Mobile behavior: show the indicator on scroll, auto-hide after
	// a few seconds of no scrolling. Desktop hover/click handles its own
	// visibility separately via isExpanded, so this only matters on touch.
	useEffect(() => {
		function handleScroll() {
			setIsVisible(true);
			if (hideTimeout.current) clearTimeout(hideTimeout.current);
			hideTimeout.current = setTimeout(() => setIsVisible(false), 2500);
		}

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (hideTimeout.current) clearTimeout(hideTimeout.current);
		};
	}, []);

	if (headings.length === 0) return null;

	return (
		<nav
			className={`${styles.toc} ${isExpanded ? styles.expanded : ""} ${!isVisible && !isExpanded ? styles.hidden : ""}`}
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
			onClick={() => setIsExpanded((open) => !open)}
		>
			<ul className={styles.lineList}>
				{headings.map((heading) => (
					<li key={heading.id} className={styles.lineItem}>
						<a
							href={`#${heading.id}`}
							onClick={(e) => e.stopPropagation()}
							className={styles.lineLink}
						>
							<span
								className={`${styles.line} ${heading.level === 3 ? styles.lineIndent : ""} ${
									activeId === heading.id
										? styles.lineActive
										: ""
								}`}
							/>
							<span className={styles.text}>{heading.text}</span>
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
