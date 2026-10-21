import type { Metadata } from "next";
import { StagePlaceholder } from "@/components/dev/StagePlaceholder";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <StagePlaceholder lang={lang} stage={4} title="About me" figmaFrame="About / 01 Intro · 02 Skillsets · 03 Experiences · 04 Passions" />;
}
