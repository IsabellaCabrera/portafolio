import type { CSSProperties, ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/dictionary";
import type { CaseMeta } from "@/content/cases";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { ChipList } from "@/components/ui/Chip";
import styles from "./CaseHeader.module.css";

/**
 * Header shared by every "Case / …" frame: breadcrumbs, title, intro (x=124),
 * hero visual (free position from Figma), meta list and chips (x=974).
 */
export function CaseHeader({
  lang,
  dict,
  crumbs,
  backHref,
  title,
  intro,
  introTone = "ink",
  visual,
  visualBox,
  meta,
  height = 660,
}: {
  lang: Locale;
  dict: Dictionary;
  crumbs: Crumb[];
  backHref: string;
  title: string;
  intro: string[];
  introTone?: "ink" | "olive";
  visual: ReactNode;
  visualBox: { x: number; y: number; w: number; h: number };
  meta: CaseMeta;
  height?: number;
}) {
  const rows: [string, string][] = [
    [dict.meta.role, meta.role[lang]],
    [dict.meta.year, meta.year],
    [dict.meta.timeline, meta.timeline[lang]],
    [dict.meta.tools, meta.tools[lang]],
  ];
  return (
    <section className={styles.header} style={{ ["--h" as string]: height } as CSSProperties}>
      <div className={styles.crumbs}>
        <Breadcrumbs label={dict.breadcrumb.label} backLabel={dict.breadcrumb.back} backHref={backHref} items={crumbs} />
      </div>
      <div className={styles.intro}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.text} data-tone={introTone}>
          {intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
      <div
        className={styles.visual}
        style={
          {
            ["--x" as string]: visualBox.x,
            ["--y" as string]: visualBox.y,
            ["--w" as string]: visualBox.w,
            ["--vh" as string]: visualBox.h,
          } as CSSProperties
        }
      >
        {visual}
      </div>
      <div className={styles.side}>
        <dl className={styles.meta}>
          {rows.map(([k, v]) => (
            <div key={k} className={styles.metaRow}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <ChipList items={meta.chips.map((c) => c[lang])} />
      </div>
    </section>
  );
}
