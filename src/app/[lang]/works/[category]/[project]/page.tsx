import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StagePlaceholder } from "@/components/dev/StagePlaceholder";
import { getProject, projects } from "@/content/projects";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, category: p.category, project: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ category: string; project: string }> }): Promise<Metadata> {
  const { category, project } = await params;
  return { title: getProject(category, project)?.name };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; category: string; project: string }> }) {
  const { lang, category, project } = await params;
  const p = getProject(category, project);
  if (!p) notFound();
  return <StagePlaceholder lang={lang} stage={6} title={p.name} figmaFrame={p.figmaFrame} />;
}
