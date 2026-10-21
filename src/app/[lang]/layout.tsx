import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { siteFontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import "@/styles/globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const es = lang === "es";
  const description = es
    ? "Diseñadora de medios interactivos en Cali, Colombia. UX/UI, branding e ilustración."
    : "Interactive media designer in Cali, Colombia. UX/UI, branding and illustration.";
  return {
    metadataBase: new URL(siteUrl()),
    openGraph: {
      type: "website",
      siteName: "Isabella Cabrera Sogamoso",
      locale: es ? "es_CO" : "en_US",
      title: es ? "Bienvenidos a mi ciudad creativa" : "Welcome to my creative city",
      description,
    },
    title: {
      default: "Isabella Cabrera Sogamoso — Portfolio",
      template: "%s · Isabella Cabrera Sogamoso",
    },
    description: es
      ? "Diseñadora de medios interactivos en Cali, Colombia. UX/UI, branding e ilustración."
      : "Interactive media designer in Cali, Colombia. UX/UI, branding and illustration.",
    alternates: { languages: { en: "/en", es: "/es" } },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f2f2",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={siteFontVariables}>
      <body>{children}</body>
    </html>
  );
}
