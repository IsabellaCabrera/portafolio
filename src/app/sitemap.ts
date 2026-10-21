import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { categories, projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = [
    "",
    "/about",
    "/works",
    ...categories.map((c) => `/works/${c.slug}`),
    ...projects.map((p) => `/works/${p.category}/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${base}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])) },
    })),
  );
}
