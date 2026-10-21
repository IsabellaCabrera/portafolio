import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { asset } from "@/content/assets.generated";
import { categories } from "@/content/projects";
import { categoryCopy, worksCopy } from "@/content/works";
import { lobbyCards } from "@/content/stampLayouts";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChipList } from "@/components/ui/Chip";
import { place, stageStyle } from "@/components/ui/stage";
import stage from "@/components/ui/Stage.module.css";
import styles from "./works.module.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "es" ? "Proyectos" : "Works" };
}

/** Figma "Works / Lobby": two stamp piles, one per category. */
export default async function WorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <PageShell lang={lang} current="works">
      <section className={styles.lobby} aria-labelledby="works-title">
        <div className={styles.crumbs}>
          <Breadcrumbs
            label={dict.breadcrumb.label}
            backLabel={dict.breadcrumb.back}
            backHref={`/${lang}?map=1`}
            items={[{ label: dict.breadcrumb.home, href: `/${lang}?map=1` }, { label: dict.breadcrumb.works }]}
          />
        </div>
        <h1 id="works-title" className={styles.title}>
          {worksCopy.title[lang]}
        </h1>

        <ul className={styles.cards}>
          {categories.map((c) => {
            const card = lobbyCards[c.slug];
            const copy = categoryCopy[c.slug];
            return (
              <li key={c.slug} className={styles.card} data-category={c.slug}>
                <Link href={`/${lang}/works/${c.slug}`} className={styles.cardLink}>
                  <div className={`${stage.stage} ${styles.pile}`} style={stageStyle(card.frame)}>
                    {card.stamps.map((s) => {
                      const img = asset(s.src);
                      return (
                        <span key={s.project} className={`${stage.item} ${styles.slot}`} style={place(card.frame, s.box)}>
                          <Image src={img.src} width={img.width} height={img.height} alt="" sizes="(max-width: 767px) 40vw, 230px" className={styles.stamp} />
                        </span>
                      );
                    })}
                  </div>
                  <span className={styles.cardTitle}>{c.name[lang]}</span>
                </Link>
                <ChipList items={copy.lobbyChips.map((t) => t[lang])} />
              </li>
            );
          })}
        </ul>
      </section>
    </PageShell>
  );
}
