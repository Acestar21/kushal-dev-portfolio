"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProjectFrontmatter } from "@/lib/mdx";
import styles from "./ProjectRow.module.css";

type Props = {
    slug: string;
    frontmatter: ProjectFrontmatter;
};

export default function ProjectRow({ slug, frontmatter }: Props) {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rowRef = useRef<HTMLDivElement>(null);

    // Clear the hover preview on any scroll — prevents a stale preview
    // from lingering in the wrong position after the user scrolls away
    // mid-hover, since scroll events don't trigger onMouseMove.
    useEffect(() => {
        const handleScroll = () => setIsHovering(false);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={rowRef}
            className={`${styles.row} ${isHovering ? styles.rowHovering : ""}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }}
        >
            {isHovering && (
                <div
                    className={styles.preview}
                    style={{ left: mousePos.x + 24, top: mousePos.y - 100 }}
                >
                    <Image
                        src={`/images/projects/${slug}-preview.png`}
                        alt={`${frontmatter.title} preview`}
                        fill
                        sizes="340px"
                        className={styles.previewImage}
                    />
                </div>
            )}

            <div className={styles.info}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{frontmatter.title}</h3>
                    <span className={styles.status}>{frontmatter.status}</span>
                </div>

                <p className={styles.tagline}>{frontmatter.tagline}</p>

                <div className={styles.stack}>
                    {frontmatter.stack.map((tech) => (
                        <span key={tech} className={styles.tech}>
                            {tech}
                        </span>
                    ))}
                </div>

                <div className={styles.links}>
                    <Link
                        href={`/projects/${slug}`}
                        className={styles.linkBubble}
                    >
                        View Details →
                    </Link>
                    {frontmatter.links?.github && (
                        <a
                            href={frontmatter.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.linkBubbleSecondary}
                        >
                            GitHub
                        </a>
                    )}
                    {frontmatter.relatedBlogSlug && (
                        <Link
                            href={`/blog/${frontmatter.relatedBlogSlug}`}
                            className={styles.linkBubbleSecondary}
                        >
                            Read the writeup
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
