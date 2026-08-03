"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

const links = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/projects", label: "Projects", icon: "◫" },
  { href: "/blog", label: "Blog", icon: "✎" },
  { href: "/skills", label: "Skills", icon: "◆" },
  { href: "/now", label: "Now", icon: "●" },
  { href: "/resume", label: "Resume", icon: "▤" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={styles.toggle}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className={styles.hamburger}>☰</span>
      </button>

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={styles.link}>
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.label}>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}