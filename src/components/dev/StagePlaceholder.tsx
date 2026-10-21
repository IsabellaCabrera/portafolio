import Link from "next/link";
import styles from "./StagePlaceholder.module.css";

/**
 * Temporary stand-in used only while the site is built stage by stage.
 * Each route renders this until its stage replaces it with the real page.
 */
export function StagePlaceholder({
  lang,
  title,
  figmaFrame,
  stage,
}: {
  lang: string;
  title: string;
  figmaFrame: string;
  stage: number;
}) {
  return (
    <main className={styles.wrap}>
      <p className={styles.overline}>Stage {stage} · pending</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.meta}>Figma: {figmaFrame}</p>
      <nav className={styles.links} aria-label="Routes">
        <Link href={`/${lang}`}>Home</Link>
        <Link href={`/${lang}/about`}>About</Link>
        <Link href={`/${lang}/works`}>Works</Link>
        <Link href={`/${lang}/foundations`}>Foundations</Link>
      </nav>
    </main>
  );
}
