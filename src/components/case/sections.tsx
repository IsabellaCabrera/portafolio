import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { asset, type AssetPath } from "@/content/assets.generated";
import { caseLabels, type BehanceLink, type Insight } from "@/content/cases";
import { RichText } from "./RichText";
import styles from "./sections.module.css";

type Px = number;

/** "Problem" / "Solution" text column (x=124, 361 wide) + screens image on the right. */
export function ProblemSolution({
  lang,
  problem,
  solution,
  image,
  imageAlt,
  imageX,
  imageW,
  imageOffsetY,
  marginTop,
}: {
  lang: Locale;
  problem: string[];
  solution: string[];
  image: AssetPath;
  imageAlt: string;
  imageX: Px;
  imageW: Px;
  imageOffsetY: Px;
  marginTop: Px;
}) {
  const img = asset(image);
  return (
    <section
      className={styles.ps}
      style={{ ["--gap" as string]: imageX - 124 - 361, ["--iw" as string]: imageW, ["--io" as string]: imageOffsetY, ["--mt" as string]: marginTop } as CSSProperties}
    >
      <div className={styles.psText}>
        <h2 className={styles.problem}>{caseLabels.PROBLEM[lang]}</h2>
        {problem.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
        <h2 className={styles.solution}>{caseLabels.SOLUTION[lang]}</h2>
        {solution.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>
      <div className={styles.psImage}>
        <Image src={img.src} width={img.width} height={img.height} alt={imageAlt} sizes="(max-width: 899px) 100vw, 740px" />
      </div>
    </section>
  );
}

/** "Quantitative Insights": three columns between hairline dividers (x=128 · 518 · 917 · 1315). */
export function Insights({
  lang,
  insights,
  tone = "ink",
  marginTop,
}: {
  lang: Locale;
  insights: Insight[];
  tone?: "ink" | "olive";
  marginTop: Px;
}) {
  return (
    <section className={styles.insights} style={{ ["--mt" as string]: marginTop } as CSSProperties}>
      <h2 className={styles.sectionTitle}>{caseLabels.INSIGHTS[lang]}</h2>
      <ul className={styles.insightGrid}>
        {insights.map((it) => (
          <li key={it.title.en} className={styles.insight}>
            <h3 className={styles.insightTitle}>{it.title[lang]}</h3>
            <p className={styles.insightBody} data-tone={tone}>
              <RichText text={it.body[lang]} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Designing a Seamless" + subtitle + wireframe sheet. */
export function Wireframes({
  lang,
  image,
  alt,
  x,
  w,
  gap,
  marginTop,
}: {
  lang: Locale;
  image: AssetPath;
  alt: string;
  x: Px;
  w: Px;
  gap: Px;
  marginTop: Px;
}) {
  const img = asset(image);
  return (
    <section className={styles.wireframes} style={{ ["--mt" as string]: marginTop, ["--x" as string]: x, ["--w" as string]: w, ["--g" as string]: gap } as CSSProperties}>
      <h2 className={styles.sectionTitle}>{caseLabels.DESIGNING[lang]}</h2>
      <p className={styles.subtitle}>{caseLabels.WIREFRAMES_SUB[lang]}</p>
      <div className={styles.wireImage}>
        <Image src={img.src} width={img.width} height={img.height} alt={alt} sizes="(max-width: 899px) 100vw, 1190px" />
      </div>
    </section>
  );
}

/** Full-bleed gradient band with the Behance links as buttons. */
export function BehanceBand({
  lang,
  title,
  gradient,
  links,
  overlap,
  textTop,
  newTab,
}: {
  lang: Locale;
  title: string;
  gradient: [string, string];
  links: BehanceLink[];
  overlap: Px;
  textTop: Px;
  newTab: string;
}) {
  return (
    <section
      className={styles.band}
      style={{ ["--c1" as string]: gradient[0], ["--c2" as string]: gradient[1], ["--ov" as string]: overlap, ["--tt" as string]: textTop } as CSSProperties}
    >
      <div className={styles.bandInner}>
        <h2 className={styles.bandTitle}>{title}</h2>
        <ul className={styles.bandLinks}>
          {links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className={styles.bandButton}>
                <span>{l.label[lang]}</span>
                <span className="visually-hidden"> — Behance ({newTab})</span>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
