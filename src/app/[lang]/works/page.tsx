import type { Metadata } from "next";
import { StagePlaceholder } from "@/components/dev/StagePlaceholder";

export const metadata: Metadata = { title: "Works" };

export default async function WorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <StagePlaceholder lang={lang} stage={5} title="Works" figmaFrame="Works / Lobby (247:5866)" />;
}
