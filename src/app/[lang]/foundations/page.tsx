import type { Metadata } from "next";
import Image from "next/image";
import { assets } from "@/content/assets.generated";
import styles from "./foundations.module.css";

export const metadata: Metadata = { title: "Foundations", robots: { index: false } };

/** Mirrors Figma frame "UI Kit / 01 Foundations" (513:2658) for review. */

const colors = [
  ["color/brand/olive", "--color-brand-olive", "#5e5b26"],
  ["color/brand/teal", "--color-brand-teal", "#008e77"],
  ["color/brand/teal-dark", "--color-brand-teal-dark", "#017966"],
  ["color/text/ink", "--color-text-ink", "#2b2904"],
  ["color/text/muted", "--color-text-muted", "#bfbfbf"],
  ["color/bg/page", "--color-bg-page", "#f3f2f2"],
  ["color/bg/footer", "--color-bg-footer", "#f8f4e8"],
  ["color/bg/white", "--color-bg-white", "#ffffff"],
] as const;

const typeStyles = [
  ["Display/Title", "Work Sans Black 50", styles.tDisplay, "PRODUCT DESIGN"],
  ["Heading/H2", "Work Sans SemiBold 50", styles.tH2, "Brand Concept & Inspiration"],
  ["Heading/H3", "Work Sans SemiBold 25 · 117.5% · −2%", styles.tH3, "Skills"],
  ["Label/Meta", "Work Sans Medium 25", styles.tMeta, "Role:"],
  ["Body/L", "Work Sans Regular 20 · 117.5% · −2%", styles.tBodyL, "Projects designed in Figma, grounded in UX research."],
  ["Body/M", "Work Sans Regular 18 · 150%", styles.tBodyM, "Open to full-time roles, freelance projects and collaborations."],
  ["Body/S", "Work Sans Regular 15", styles.tBodyS, "Home › product design"],
  ["Nav/Link", "Work Sans Regular 27.63", styles.tNav, "Works"],
  ["Link/Contact", "Work Sans Medium 18", styles.tLink, "behance.net/isabellcabrera3"],
  ["Button/Label", "Work Sans SemiBold 20", styles.tButton, "sogamoso.creative@gmail.com"],
  ["Chip/Label", "Afacad Medium 18", styles.tChip, "UX research"],
  ["Overline/Label", "Afacad Medium 14 · 6% · UPPER", styles.tOverline, "Linkedin"],
  ["Script/L", "Homemade Apple 34", styles.tScriptL, "Let's talk"],
  ["Script/S", "Homemade Apple 20", styles.tScriptS, "To:"],
  ["Footer/Headline", "Work Sans Black 54 · 92%", styles.tFooter, "WISH YOU WERE IN MY CITY"],
  ["Stamp/Postmark", "Work Sans SemiBold 13 · 120% · 8%", styles.tPostmark, "CALI COLOMBIA 2026"],
] as const;

const spacing = [
  ["spacing/xs", 4], ["spacing/sm", 8], ["spacing/md", 16], ["spacing/lg", 24],
  ["spacing/xl", 48], ["spacing/2xl", 56], ["layout/content-margin", 128],
] as const;

const radii = [["radius/pill", "var(--radius-pill)", 60], ["About panel", "var(--radius-panel)", 85], ["Entrance sign", "var(--radius-sign)", 43], ["Entrance tile", "var(--radius-tile)", 19]] as const;

const models = [
  ["/models/beetle-product-design.glb", "38,470 vertices · 3 × 2048px textures · 2.5 MB"],
  ["/models/beetle-branding.glb", "41,071 vertices · 3 × 2048px textures · 2.9 MB"],
] as const;

export default function FoundationsPage() {
  const imageEntries = Object.values(assets);
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.overline}>UI Kit / 01 Foundations</p>
        <h1 className={styles.tDisplay}>Foundations</h1>
        <p className={styles.tBodyL}>Tokens from the Figma page “Web”, rendered with the CSS variables in <code>src/styles/tokens.css</code>.</p>
      </header>

      <section className={styles.section} aria-labelledby="colors">
        <h2 id="colors" className={styles.tH3}>Color</h2>
        <ul className={styles.swatches}>
          {colors.map(([name, token, hex]) => (
            <li key={token} className={styles.swatch}>
              <span className={styles.chipColor} style={{ background: `var(${token})` }} />
              <span className={styles.swatchName}>{name}</span>
              <code className={styles.swatchHex}>{hex}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="type">
        <h2 id="type" className={styles.tH3}>Typography</h2>
        <dl className={styles.typeList}>
          {typeStyles.map(([name, spec, cls, sample]) => (
            <div key={name} className={styles.typeRow}>
              <dt>
                <span className={styles.typeName}>{name}</span>
                <span className={styles.typeSpec}>{spec}</span>
              </dt>
              <dd className={cls}>{sample}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.typeRow}>
          <span>
            <span className={styles.typeName}>Wheel number</span>
            <span className={styles.typeSpec}>JetBrains Mono Bold · slashed zero</span>
          </span>
          <span className={styles.tMono}>00 01 02</span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="space">
        <h2 id="space" className={styles.tH3}>Spacing &amp; radius</h2>
        <ul className={styles.spaceList}>
          {spacing.map(([name, px]) => (
            <li key={name} className={styles.spaceRow}>
              <span className={styles.spaceBar} style={{ width: px }} />
              <span className={styles.typeName}>{name}</span>
              <code className={styles.swatchHex}>{px}px</code>
            </li>
          ))}
        </ul>
        <ul className={styles.radii}>
          {radii.map(([name, value, px]) => (
            <li key={name} className={styles.radius}>
              <span className={styles.radiusBox} style={{ borderRadius: value }} />
              <span className={styles.typeName}>{name}</span>
              <code className={styles.swatchHex}>{px}px</code>
            </li>
          ))}
        </ul>
        <div className={styles.components}>
          <span className={styles.chip}>UX research</span>
          <span className={styles.chip}>Wireframes</span>
          <span className={styles.button}>sogamoso.creative@gmail.com <span aria-hidden="true">→</span></span>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="assets">
        <h2 id="assets" className={styles.tH3}>Assets ({imageEntries.length} images · 2 models)</h2>
        <ul className={styles.assetGrid}>
          {imageEntries.map((a) => (
            <li key={a.src} className={styles.asset}>
              <div className={styles.assetThumb}>
                <Image src={a.src} alt="" width={a.width} height={a.height} sizes="160px" className={styles.assetImg} />
              </div>
              <code className={styles.assetPath}>{a.src.replace("/assets/", "")}</code>
              <span className={styles.typeSpec}>{a.width}×{a.height}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.modelList}>
          {models.map(([src, info]) => (
            <li key={src}>
              <code className={styles.assetPath}>{src}</code> <span className={styles.typeSpec}>{info}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
