"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { socials } from "@/data/socials";
import styles from "./Hero.module.css";

const roles = ["Software Developer", "Backend Engineer", "AI Engineer", "Problem Solver"];

function useTypingEffect(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 40 : 90;
    const pauseBeforeDelete = 1400;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 0);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          isDeleting ? currentWord.slice(0, t.length - 1) : currentWord.slice(0, t.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typedText = useTypingEffect(roles);
  const letters = "Kushal".split("");

  return (
    <section className={styles.hero}>
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hi, I am
      </motion.p>

      <h1 className={styles.name} aria-label="Kushal">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: "easeOut" }}
            aria-hidden="true"
          >
            {char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className={styles.typing}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 + letters.length * 0.05 + 0.3, duration: 0.6 }}
      >
        {typedText}
        <span className={styles.cursor}>|</span>
      </motion.p>

      <motion.ul
        className={styles.socials}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 + letters.length * 0.05 + 0.6, duration: 0.6 }}
      >
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {social.label}
            </a>
          </li>
        ))}
      </motion.ul>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 + letters.length * 0.05 + 0.9, duration: 0.6 }}
      >
        Scroll to explore ↓
      </motion.div>
    </section>
  );
}