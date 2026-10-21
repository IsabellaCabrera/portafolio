import { StagePlaceholder } from "@/components/dev/StagePlaceholder";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <StagePlaceholder lang={lang} stage={3} title="Home" figmaFrame="Home / 01 Entrance → 02 Scroll → 03 Active" />;
}
