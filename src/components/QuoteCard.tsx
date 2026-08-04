import styles from "./QuoteCard.module.css";

const quotes = [
  {
    text: "It turns out that style matters in programming for the same reason that it matters in writing. It makes for better reading.",
    author: "Douglas Crockford",
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  {
    text: "The only way to go fast is to go well.",
    author: "Robert C. Martin",
  },
];

// Deterministic "pick" based on the current day, not Math.random() —
// avoids calling an impure function during render, while still rotating
// the quote day to day rather than showing the same one forever.
function getQuoteForToday() {
  const dayIndex = new Date().getDate();
  return quotes[dayIndex % quotes.length];
}

export default function QuoteCard() {
  const quote = getQuoteForToday();

  return (
    <div className={styles.card}>
      <p className={styles.mark}>&ldquo;</p>
      <p className={styles.text}>{quote.text}</p>
      <p className={styles.author}>— {quote.author}</p>
    </div>
  );
}