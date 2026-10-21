import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { asset, type AssetPath } from "@/content/assets.generated";
import { brandingMeta, caseLabels, entoCopy } from "@/content/cases";
import { caseClusters } from "@/content/stampLayouts";
import { categoryCopy, worksCopy } from "@/content/works";
import { ProjectStamps } from "@/components/works/ProjectStamps";
import { CaseHeader } from "./CaseHeader";
import { StickerPile } from "./StickerPile";
import { IllustrationGallery } from "./IllustrationGallery";
import styles from "./EntoCase.module.css";

type R = { x: number; y: number; w: number; h: number };

/* Sticker pile — Figma y 1290 → 2030 (stickers are exported already rotated: placed at their render bounds) */
const STICKER_Y = 1290;
const STICKER_H = 740;
const stickers: { src: AssetPath; r: R }[] = [
  { src: "/assets/cases/ento/sticker-flat-art.webp", r: { x: 23, y: 1585, w: 373, h: 273 } },
  { src: "/assets/cases/ento/sticker-group.webp", r: { x: 266, y: 1641, w: 322, h: 319 } },
  { src: "/assets/cases/ento/sticker-vacuum-sealed.webp", r: { x: 738, y: 1508, w: 481, h: 253 } },
  { src: "/assets/cases/ento/sticker-high-contrast.webp", r: { x: 480, y: 1403, w: 458, h: 264 } },
  { src: "/assets/cases/ento/sticker-retail.webp", r: { x: 1098, y: 1709, w: 264, h: 210 } },
  { src: "/assets/cases/ento/sticker-geometric.webp", r: { x: 261, y: 1493, w: 397, h: 295 } },
  { src: "/assets/cases/ento/sticker-tocineta-2.webp", r: { x: 525, y: 1615, w: 305, h: 270 } },
  { src: "/assets/cases/ento/sticker-pata-de-jamon-1.webp", r: { x: 726, y: 1634, w: 402, h: 382 } },
  { src: "/assets/cases/ento/sticker-champinon-2.webp", r: { x: 1130, y: 1508, w: 271, h: 256 } },
  { src: "/assets/cases/ento/sticker-albahca.webp", r: { x: 877, y: 1301, w: 392, h: 392 } },
  { src: "/assets/cases/ento/sticker-midcentury.webp", r: { x: 44, y: 1476, w: 380, h: 117 } },
];

/* Illustrations — interactive mosaic; each tile tinted with an ENTO process colour */
const illustrations: { src: AssetPath; key: keyof typeof entoCopy.illustrationNames; color: string }[] = [
  { src: "/assets/cases/ento/tomate.webp", key: "tomato", color: "#5d5609" },
  { src: "/assets/cases/ento/champinon.webp", key: "mushroom", color: "#045077" },
  { src: "/assets/cases/ento/tocineta.webp", key: "bacon", color: "#820253" },
  { src: "/assets/cases/ento/pata-de-jamon.webp", key: "ham", color: "#045077" },
  { src: "/assets/cases/ento/albahaca.webp", key: "basil", color: "#973102" },
  { src: "/assets/cases/ento/illustration-vectorized.webp", key: "character", color: "#5d5609" },
];

/* Design process: 4 × 2 full-bleed grid; colored cards carry the step, the rest are flavor photos */
const processGrid: ({ kind: "step"; step: 0 | 1 | 2 | 3; label: { x: number; y: number }; text: { x: number; y: number; w: number }; num: { x: number }; tight?: boolean } | { kind: "photo"; src: AssetPath; alt: keyof typeof entoCopy.alts })[] = [
  { kind: "step", step: 0, label: { x: 32, y: 72.8 }, text: { x: 49, y: 173, w: 225 }, num: { x: 139 } },
  { kind: "photo", src: "/assets/cases/ento/flavor-04.webp", alt: "flavor04" },
  { kind: "step", step: 2, label: { x: 38, y: 68 }, text: { x: 49, y: 173, w: 225 }, num: { x: 130 } },
  { kind: "photo", src: "/assets/cases/ento/flavor-07.webp", alt: "flavor07" },
  { kind: "photo", src: "/assets/cases/ento/flavor-01.webp", alt: "flavor01" },
  { kind: "step", step: 1, label: { x: 37, y: 63.6 }, text: { x: 50, y: 166, w: 225 }, num: { x: 147 } },
  { kind: "photo", src: "/assets/cases/ento/flavor-06.webp", alt: "flavor06" },
  { kind: "step", step: 3, label: { x: 20, y: 72 }, text: { x: 53, y: 180, w: 267 }, num: { x: 140 }, tight: true },
];

export function EntoCase({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const m = brandingMeta.ento;
  const e = entoCopy;
  const cards = [asset("/assets/cases/ento/process-01.webp"), asset("/assets/cases/ento/process-02.webp"), asset("/assets/cases/ento/process-03.webp")];
  const cardAlts = [e.alts.process1, e.alts.process2, e.alts.process3];
  const construction = asset("/assets/cases/ento/logo-construction.webp");
  const composition = asset("/assets/cases/ento/composition.webp");

  return (
    <>
      <CaseHeader
        lang={lang}
        dict={dict}
        backHref={`/${lang}/works/branding`}
        crumbs={[
          { label: dict.breadcrumb.home, href: `/${lang}?map=1` },
          { label: categoryCopy.branding.crumb[lang], href: `/${lang}/works/branding` },
          { label: m.title },
        ]}
        title={m.title}
        intro={m.intro.map((p) => p[lang])}
        meta={m}
        height={660}
        visualBox={{ x: 519, y: 234, w: 336.44, h: 231 }}
        visual={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/assets/cases/ento/logo-primary.svg" width={337} height={231} alt={e.alts.logo[lang]} className={styles.logo} />
        }
      />

      <ProjectStamps lang={lang} layout={caseClusters.ento!} label={worksCopy.stampsLabel[lang]} className={styles.cluster} />

      {/* Sticker pile over the ENTO FOOD READY TO EAT pattern (full width, draggable) */}
      <StickerPile
        frame={{ w: 1440, h: STICKER_H }}
        pattern={asset("/assets/cases/ento/pattern.webp")}
        patternY={1451 - STICKER_Y}
        stickers={stickers.map((st) => ({ img: asset(st.src), x: st.r.x, y: st.r.y - STICKER_Y, w: st.r.w, h: st.r.h }))}
        label={e.stickersAlt[lang]}
        hint={e.dragHint[lang]}
      />

      {/* Brand Concept & Inspiration */}
      <section className={styles.concept}>
        <h2 className={styles.h2}>{caseLabels.BRAND_CONCEPT[lang]}</h2>
        {e.concept.map((p) => (
          <p key={p.en.slice(0, 20)}>{p[lang]}</p>
        ))}
      </section>

      <ul className={styles.cards}>
        {cards.map((c, i) => (
          <li key={c.src}>
            <Image src={c.src} width={c.width} height={c.height} alt={cardAlts[i]![lang]} sizes="(max-width: 767px) 90vw, 378px" />
          </li>
        ))}
      </ul>

      <div className={styles.construction}>
        <Image src={construction.src} width={construction.width} height={construction.height} alt={e.alts.logoConstruction[lang]} sizes="100vw" />
      </div>

      {/* Illustrations grid */}
      <section className={styles.illustrations}>
        <h2 className={styles.h2}>{e.illustrationsTitle[lang]}</h2>
        <IllustrationGallery
          items={illustrations.map((it) => ({
            img: asset(it.src),
            alt: e.alts[it.key][lang],
            name: e.illustrationNames[it.key][lang],
            color: it.color,
          }))}
        />
      </section>

      {/* Design Process */}
      <section className={styles.process}>
        <h2 className={styles.h2}>{e.processTitle[lang]}</h2>
        <ul className={styles.processGrid}>
          {processGrid.map((cell, i) => {
            if (cell.kind === "photo") {
              const img = asset(cell.src);
              return (
                <li key={i} className={styles.photoCell}>
                  <Image src={img.src} width={img.width} height={img.height} alt={e.alts[cell.alt][lang]} sizes="(max-width: 767px) 50vw, 25vw" />
                </li>
              );
            }
            const step = e.process[cell.step]!;
            return (
              <li
                key={i}
                className={styles.stepCell}
                data-tight={cell.tight || undefined}
                style={
                  {
                    background: step.color,
                    ["--lx" as string]: cell.label.x,
                    ["--ly" as string]: cell.label.y,
                    ["--tx" as string]: cell.text.x,
                    ["--ty" as string]: cell.text.y,
                    ["--tw" as string]: cell.text.w,
                    ["--nx" as string]: cell.num.x,
                  } as CSSProperties
                }
              >
                <h3 className={styles.stepLabel}>{step.label[lang]}</h3>
                <p className={styles.stepText}>{step.body[lang]}</p>
                <span className={styles.stepNum} aria-hidden="true">
                  {step.n}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className={styles.composition}>
        <Image src={composition.src} width={composition.width} height={composition.height} alt={e.alts.composition[lang]} sizes="(max-width: 767px) 100vw, 1264px" />
      </div>
    </>
  );
}
