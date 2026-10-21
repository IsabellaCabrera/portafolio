"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { CircularNav } from "./CircularNav";
import { toNavItems, type Experience } from "./experiences";
import styles from "./ExperienceWheel.module.css";

export type ExperienceWheelProps = {
  experiences: Experience[];
  marker?: "index" | "year";
  eyebrow?: string | null;
  /** CSS height of the dial on desktop (mobile uses ~58svh, max 460px) */
  height?: string;
  captureWheel?: boolean;
  initialIndex?: number;
  onSelect?: (index: number) => void;
  ariaLabel?: string;
  /** "{n} of {total}" wording for the live region */
  ofLabel?: string;
};

/** Circular dial + live detail panel (dial | panel on desktop, stacked on mobile). */
export function ExperienceWheel({
  experiences,
  marker = "index",
  eyebrow,
  height = "100%",
  captureWheel = false,
  initialIndex = 0,
  onSelect,
  ariaLabel = "Experiences",
  ofLabel = "of",
}: ExperienceWheelProps) {
  const reduced = useReducedMotion() ?? false;
  const items = useMemo(() => toNavItems(experiences, marker), [experiences, marker]);
  const [active, setActive] = useState(() => (experiences.length ? Math.min(Math.max(initialIndex, 0), experiences.length - 1) : 0));
  const onActiveChange = useCallback((i: number) => setActive(i), []);

  if (!experiences.length) return null;
  const exp = experiences[active]!;

  return (
    <section className={styles.wheel} role="group" aria-label={ariaLabel} style={{ ["--dial-h" as string]: height }}>
      <div className={styles.dial}>
        <CircularNav
          items={items}
          variant="section"
          captureWheel={captureWheel}
          initialIndex={initialIndex}
          onActiveChange={onActiveChange}
          onSelect={onSelect}
          ariaLabel={ariaLabel}
          announce={(item, i, n) => `${item.marker ?? ""} ${item.label}, ${i + 1} ${ofLabel} ${n}`.trim()}
        />
      </div>

      <div className={styles.panel} aria-live="polite">
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={exp.id}
            className={styles.card}
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {exp.period ? <p className={styles.period}>{exp.period}</p> : null}
            <h3 className={styles.role}>{exp.role}</h3>
            {exp.company ? <p className={styles.company}>{exp.company}</p> : null}
            {exp.description ? <p className={styles.description}>{exp.description}</p> : null}
            {exp.highlights.length ? (
              <ul className={styles.highlights}>
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
            {exp.tags.length ? (
              <ul className={styles.tags}>
                {exp.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
