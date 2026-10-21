import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { asset } from "@/content/assets.generated";
import { lumiExtra, productCases, type ProductCase as ProductCaseData } from "@/content/cases";
import { caseClusters } from "@/content/stampLayouts";
import { categoryCopy, worksCopy } from "@/content/works";
import { ProjectStamps } from "@/components/works/ProjectStamps";
import { CaseHeader } from "./CaseHeader";
import { BehanceBand, Insights, ProblemSolution, Wireframes } from "./sections";
import styles from "./ProductCase.module.css";

/** Vertical rhythm per case, measured from the Figma frames (px at 1440). */
const layout: Record<ProductCaseData["slug"], {
  header: number;
  problemY: number;
  psTop: number;
  insightsTop: number;
  wire?: { top: number; gap: number; x: number; w: number };
  extraTop?: number;
  band: { overlap: number; textTop: number };
}> = {
  bipbip: { header: 680, problemY: 1450, psTop: 130, insightsTop: 224, wire: { top: 82, gap: 112, x: 141, w: 1184 }, band: { overlap: 154, textTop: 249 } },
  lumi: { header: 700, problemY: 1448, psTop: 128, insightsTop: 37, extraTop: 262, band: { overlap: 274, textTop: 260 } },
  linglink: { header: 680, problemY: 1447, psTop: 147, insightsTop: 190, wire: { top: 82, gap: 89, x: 125, w: 1190 }, band: { overlap: 172, textTop: 255 } },
};

export function ProductCase({ lang, slug }: { lang: Locale; slug: ProductCaseData["slug"] }) {
  const dict = getDictionary(lang);
  const c = productCases[slug];
  const l = layout[slug];
  const hero = asset(c.hero.src);
  const cat = categoryCopy["product-design"];

  return (
    <>
      <CaseHeader
        lang={lang}
        dict={dict}
        backHref={`/${lang}/works/product-design`}
        crumbs={[
          { label: dict.breadcrumb.home, href: `/${lang}?map=1` },
          { label: cat.crumb[lang], href: `/${lang}/works/product-design` },
          { label: c.title },
        ]}
        title={c.title}
        intro={c.intro.map((p) => p[lang])}
        introTone={c.introTone}
        meta={c.meta}
        height={l.header}
        visualBox={c.hero.box}
        visual={
          <Image
            src={hero.src}
            width={hero.width}
            height={hero.height}
            alt={c.hero.alt[lang]}
            sizes="(max-width: 899px) 80vw, 400px"
            priority
            className={c.hero.shadow ? styles.heroShadow : styles.hero}
          />
        }
      />

      <ProjectStamps lang={lang} layout={caseClusters[slug]!} label={worksCopy.stampsLabel[lang]} className={styles.cluster} />

      <ProblemSolution
        lang={lang}
        problem={c.problem.map((p) => p[lang])}
        solution={c.solution.map((p) => p[lang])}
        image={c.screens.src}
        imageAlt={c.screens.alt[lang]}
        imageX={c.screens.box.x}
        imageW={c.screens.box.w}
        imageOffsetY={c.screens.box.y - l.problemY}
        marginTop={l.psTop}
      />

      <Insights lang={lang} insights={c.insights} tone={c.insightsTone} marginTop={l.insightsTop} />

      {c.wireframes && l.wire ? (
        <Wireframes
          lang={lang}
          image={c.wireframes.src}
          alt={c.wireframes.alt[lang]}
          x={l.wire.x}
          w={l.wire.w}
          gap={l.wire.gap}
          marginTop={l.wire.top}
        />
      ) : null}

      {slug === "lumi" ? <LumiInside lang={lang} marginTop={l.extraTop ?? 0} /> : null}

      <BehanceBand
        lang={lang}
        title={dict.common.readMore}
        gradient={c.behance.gradient}
        links={c.behance.links}
        overlap={l.band.overlap}
        textTop={l.band.textTop}
        newTab={dict.footer.opensNewTab}
      />
    </>
  );
}

/** Lumi only: "light-emitting Lumi" + Color code, "Lumi on the inside" + Hardware (y 3168–4534). */
function LumiInside({ lang, marginTop }: { lang: Locale; marginTop: number }) {
  const light = asset("/assets/cases/lumi/light-emitting.webp");
  const hardware = asset("/assets/cases/lumi/hardware.webp");
  const x = lumiExtra;
  return (
    <section className={styles.lumi} style={{ marginTop: `calc(${marginTop} * var(--u))` }}>
      <div className={styles.lumiLight}>
        <Image src={light.src} width={light.width} height={light.height} alt={x.lightAlt[lang]} sizes="(max-width: 899px) 100vw, 742px" />
      </div>
      <div className={styles.lumiHardware}>
        <Image src={hardware.src} width={hardware.width} height={hardware.height} alt={x.hardwareAlt[lang]} sizes="(max-width: 899px) 100vw, 1171px" />
      </div>
      <div className={styles.lumiColor}>
        <h2 className={styles.lumiTitle}>{x.colorCode.title[lang]}</h2>
        <p>{x.colorCode.body[lang]}</p>
      </div>
      <div className={styles.lumiHwText}>
        <h2 className={styles.lumiTitle}>{x.hardware.title[lang]}</h2>
        <p>{x.hardware.body[lang]}</p>
      </div>
    </section>
  );
}
