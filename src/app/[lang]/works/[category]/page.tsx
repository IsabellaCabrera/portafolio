import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { asset } from "@/content/assets.generated";
import { categories, getCategory } from "@/content/projects";
import { categoryCopy, worksCopy } from "@/content/works";
import { brandingCluster, productDesignCluster } from "@/content/stampLayouts";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChipList } from "@/components/ui/Chip";
import { Beetle3D } from "@/components/works/Beetle3D";
import { BeetleHint } from "@/components/works/BeetleHint";
import { ProjectStamps } from "@/components/works/ProjectStamps";
import styles from "./category.module.css";

export function generateStaticParams() {
  return locales.flatMap((lang) => categories.map((c) => ({ lang, category: c.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string }> }): Promise<Metadata> {
  const { lang, category } = await params;
  const c = getCategory(category);
  const l = lang === "es" ? "es" : "en";
  return c ? { title: c.name[l], description: categoryCopy[c.slug].description[l] } : {};
}

/** Figma "Category / Product Design" and "Category / Branding". */
export default async function CategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params;
  const c = getCategory(category);
  if (!c || !isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const copy = categoryCopy[c.slug];
  const layout = c.slug === "branding" ? brandingCluster : productDesignCluster;

  return (
    <PageShell lang={lang} current="works">
      <section className={styles.hero} data-category={c.slug}>
        <div className={styles.crumbs}>
          <Breadcrumbs
            label={dict.breadcrumb.label}
            backLabel={dict.breadcrumb.back}
            backHref={`/${lang}/works`}
            items={[
              { label: dict.breadcrumb.home, href: `/${lang}?map=1` },
              { label: dict.breadcrumb.works, href: `/${lang}/works` },
              { label: copy.crumb[lang] },
            ]}
          />
        </div>

        <div className={styles.intro}>
          <h1 className={styles.title}>{copy.title[lang]}</h1>
          <p className={styles.description}>{copy.description[lang]}</p>
          <BeetleHint className={styles.hint}>{worksCopy.beetleHint[lang]}</BeetleHint>
        </div>

        <div className={styles.beetle}>
          <Beetle3D
            model={c.beetleModel}
            fallback={asset(c.beetleFallback)}
            alt={copy.beetleAlt[lang]}
            yaw={c.slug === "branding" ? -0.55 : 0.6}
          />
        </div>

        <div className={styles.skills}>
          <h2 className={styles.skillsTitle}>{dict.meta.skills}</h2>
          <ChipList items={copy.skills.map((s) => s[lang])} />
        </div>
      </section>

      <section className={styles.stamps} aria-label={worksCopy.stampsLabel[lang]}>
        <ProjectStamps lang={lang} layout={layout} label={worksCopy.stampsLabel[lang]} />
      </section>
    </PageShell>
  );
}
