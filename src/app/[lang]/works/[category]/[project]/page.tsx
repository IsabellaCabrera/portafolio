import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getProject, projects } from "@/content/projects";
import { brandingMeta, productCases } from "@/content/cases";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCase } from "@/components/case/ProductCase";
import { EntoCase } from "@/components/case/EntoCase";
import { AmphibiaCase } from "@/components/case/AmphibiaCase";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, category: p.category, project: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string; project: string }>;
}): Promise<Metadata> {
  const { lang, category, project } = await params;
  const p = getProject(category, project);
  if (!p) return {};
  const l = lang === "es" ? "es" : "en";
  const intro =
    p.slug in productCases
      ? productCases[p.slug as keyof typeof productCases].intro[0]?.[l]
      : brandingMeta[p.slug as keyof typeof brandingMeta]?.intro[0]?.[l];
  return { title: p.name, description: intro };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; category: string; project: string }>;
}) {
  const { lang, category, project } = await params;
  const p = getProject(category, project);
  if (!p || !isLocale(lang)) notFound();

  let body: React.ReactNode;
  if (p.slug === "bipbip" || p.slug === "lumi" || p.slug === "linglink") body = <ProductCase lang={lang} slug={p.slug} />;
  else if (p.slug === "ento") body = <EntoCase lang={lang} />;
  else if (p.slug === "amphibia") body = <AmphibiaCase lang={lang} />;
  else notFound();

  return (
    <PageShell lang={lang} current="works">
      {body}
    </PageShell>
  );
}
