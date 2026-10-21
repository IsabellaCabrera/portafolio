import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { aboutCopy } from "@/content/about";
import { parseExperienceFile, type ParsedExperienceFile } from "@/components/circular-nav/experiences";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AboutExperience } from "@/components/about/AboutExperience";
import styles from "./about.module.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: aboutCopy.title[lang === "es" ? "es" : "en"] };
}

/** Reads /public/content/<name>.<lang>.txt (falls back to English). Never throws. */
async function readContent(name: "experiences" | "passions", lang: Locale): Promise<ParsedExperienceFile> {
  const dir = path.join(process.cwd(), "public", "content");
  for (const file of [`${name}.${lang}.txt`, `${name}.en.txt`]) {
    try {
      return parseExperienceFile(await readFile(path.join(dir, file), "utf8"));
    } catch {
      /* try the next file */
    }
  }
  return { eyebrow: null, items: [] };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const [experiences, passions] = await Promise.all([readContent("experiences", lang), readContent("passions", lang)]);

  return (
    <PageShell lang={lang} current="about" background="about">
      <section className={styles.section} aria-labelledby="about-title">
        <h1 id="about-title" className="visually-hidden">
          {aboutCopy.title[lang]}
        </h1>
        <div className={styles.crumbs}>
          <Breadcrumbs
            label={dict.breadcrumb.label}
            backLabel={dict.breadcrumb.back}
            backHref={`/${lang}?map=1`}
            items={[{ label: dict.breadcrumb.home, href: `/${lang}?map=1` }, { label: dict.breadcrumb.about }]}
          />
        </div>
        <AboutExperience lang={lang} experiences={experiences} passions={passions} />
      </section>
    </PageShell>
  );
}
