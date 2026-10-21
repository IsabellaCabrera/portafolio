import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { asset } from "@/content/assets.generated";
import { amphibiaCopy, brandingMeta, caseLabels } from "@/content/cases";
import { caseClusters } from "@/content/stampLayouts";
import { categoryCopy, worksCopy } from "@/content/works";
import { leagueSpartan, museoModerno } from "@/lib/fonts-pages";
import { ProjectStamps } from "@/components/works/ProjectStamps";
import { CaseHeader } from "./CaseHeader";
import styles from "./AmphibiaCase.module.css";

/** Figma "Case / Branding / Amphibia". */
export function AmphibiaCase({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const m = brandingMeta.amphibia;
  const a = amphibiaCopy;
  const isotype = asset("/assets/cases/amphibia/isotype.webp");
  const wordmark = asset("/assets/cases/amphibia/wordmark-xl.webp");
  const bento = asset("/assets/cases/amphibia/bento.webp");
  const fullLogo = asset("/assets/cases/amphibia/full-logo.webp");

  return (
    <div className={`${museoModerno.variable} ${leagueSpartan.variable}`}>
      <CaseHeader
        lang={lang}
        dict={dict}
        backHref={`/${lang}/works/branding`}
        crumbs={[
          { label: dict.breadcrumb.home, href: `/${lang}?map=1` },
          { label: categoryCopy.branding.crumb[lang], href: `/${lang}/works/branding` },
          { label: "Amphibia" },
        ]}
        title={m.title}
        intro={m.intro.map((p) => p[lang])}
        meta={m}
        height={670}
        visualBox={{ x: 641.68, y: 288.2, w: 156.64, h: 93.6 }}
        visual={<Image src={isotype.src} width={isotype.width} height={isotype.height} alt={a.alts.isotype[lang]} sizes="160px" priority className={styles.contain} />}
      />

      <ProjectStamps lang={lang} layout={caseClusters.amphibia!} label={worksCopy.stampsLabel[lang]} className={styles.cluster} />

      <div className={styles.band}>
        <Image src={wordmark.src} width={wordmark.width} height={wordmark.height} alt={a.alts.wordmark[lang]} sizes="(max-width: 767px) 90vw, 973px" className={styles.wordmark} />
      </div>

      <section className={styles.concept}>
        <h2 className={styles.h2}>{caseLabels.BRAND_CONCEPT[lang]}</h2>
        {a.concept.map((p) => (
          <p key={p.en.slice(0, 20)}>{p[lang]}</p>
        ))}
      </section>

      <div className={styles.bento}>
        <Image src={bento.src} width={bento.width} height={bento.height} alt={a.alts.bento[lang]} sizes="(max-width: 767px) 100vw, 1200px" />
      </div>

      <section className={styles.palette}>
        <h2 className={`${styles.h2} ${styles.centered}`}>{a.palette[lang]}</h2>
        <ul className={styles.swatches}>
          {a.swatches.map((hex) => (
            <li key={hex}>
              <span className={styles.swatch} style={{ background: hex }} aria-hidden="true" />
              <code className={styles.hex}>{hex}</code>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.type}>
        <h2 className={`${styles.h2} ${styles.centered}`}>{a.typography[lang]}</h2>
        <div className={styles.specimens}>
          <div className={styles.specimen} data-face="museo">
            <span className={styles.glyphs} aria-hidden="true">
              Mm
            </span>
            <span className={styles.faceName}>MuseoModerno</span>
          </div>
          <div className={styles.specimen} data-face="spartan">
            <span className={styles.glyphs} aria-hidden="true">
              Aa
            </span>
            <span className={styles.faceName}>Spartan</span>
          </div>
          <div className={styles.fullLogo}>
            <Image src={fullLogo.src} width={fullLogo.width} height={fullLogo.height} alt={a.alts.fullLogo[lang]} sizes="(max-width: 767px) 70vw, 425px" />
          </div>
        </div>
        <p className={styles.typeNote}>{a.typeNote[lang]}</p>
      </section>
    </div>
  );
}
