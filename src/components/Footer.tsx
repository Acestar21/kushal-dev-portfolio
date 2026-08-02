import { socials } from "@/data/socials";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} Kushal. Built with Next.js.
      </p>
      <ul className={styles.links}>
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              >  
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}