import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StagePlaceholder } from "@/components/dev/StagePlaceholder";
import { categories, getCategory } from "@/content/projects";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((lang) => categories.map((c) => ({ lang, category: c.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string }> }): Promise<Metadata> {
  const { lang, category } = await params;
  const c = getCategory(category);
  return { title: c ? c.name[lang === "es" ? "es" : "en"] : undefined };
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang, category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return <StagePlaceholder lang={lang} stage={5} title={c.name[lang === "es" ? "es" : "en"]} figmaFrame={c.figmaFrame} />;
}
