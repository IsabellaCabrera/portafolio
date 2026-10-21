import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { PageShell } from "@/components/layout/PageShell";
import { HomeExperience } from "@/components/home/HomeExperience";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <PageShell lang={lang} current="home" background="home">
      <HomeExperience lang={lang} />
    </PageShell>
  );
}
