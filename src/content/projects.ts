import type { AssetPath } from "./assets.generated";

/**
 * Site map for Works: categories → projects. Drives routes,
 * generateStaticParams, breadcrumbs and the stamp stacks.
 * Page copy is added per stage (from the matching Figma frame).
 */

export type CategorySlug = "product-design" | "branding";

export type Project = {
  slug: string;
  name: string;
  category: CategorySlug;
  stamp: AssetPath;
  /** Figma frame the case page is built from. */
  figmaFrame: string;
};

export type Category = {
  slug: CategorySlug;
  name: { en: string; es: string };
  beetleModel: string;
  beetleFallback: AssetPath;
  homeStamp: AssetPath;
  figmaFrame: string;
};

export const categories: Category[] = [
  {
    slug: "product-design",
    name: { en: "Product Design", es: "Diseño de producto" },
    beetleModel: "/models/beetle-product-design.glb",
    beetleFallback: "/assets/works/beetle-product-design.webp",
    homeStamp: "/assets/home/stamp-product-design.webp",
    figmaFrame: "Category / Product Design (199:128)",
  },
  {
    slug: "branding",
    name: { en: "Branding", es: "Branding" },
    beetleModel: "/models/beetle-branding.glb",
    beetleFallback: "/assets/works/beetle-branding.webp",
    homeStamp: "/assets/home/stamp-branding.webp",
    figmaFrame: "Category / Branding (230:2936)",
  },
];

export const projects: Project[] = [
  { slug: "lumi", name: "Lumi", category: "product-design", stamp: "/assets/stamps/lumi.webp", figmaFrame: "Case / Product Design / Lumi (221:2751)" },
  { slug: "bipbip", name: "Bipbip", category: "product-design", stamp: "/assets/stamps/bipbip.webp", figmaFrame: "Case / Product Design / Bipbip (213:2643)" },
  { slug: "linglink", name: "LingLink", category: "product-design", stamp: "/assets/stamps/linglink.webp", figmaFrame: "Case / Product Design / Linglink (228:2866)" },
  { slug: "ento", name: "ENTO", category: "branding", stamp: "/assets/stamps/ento.webp", figmaFrame: "Case / Branding / ENTO (247:5656)" },
  { slug: "amphibia", name: "Amphibia", category: "branding", stamp: "/assets/stamps/amphibia.webp", figmaFrame: "Case / Branding / Amphibia (247:5726)" },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProject(category: string, slug: string): Project | undefined {
  return projects.find((p) => p.category === category && p.slug === slug);
}

export function projectsIn(category: CategorySlug): Project[] {
  return projects.filter((p) => p.category === category);
}
