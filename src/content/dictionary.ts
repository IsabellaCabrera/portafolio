import type { Locale } from "@/i18n/config";

/**
 * Shared UI copy. English is taken verbatim from Figma (page "Web");
 * Spanish is the translation.
 */
const en = {
  nav: { home: "Home", works: "Works", about: "About", contact: "Contact", label: "Main" },
  lang: { label: "Language", en: "Eng", es: "Esp", switchTo: "Cambiar a español" },
  breadcrumb: { label: "Breadcrumb", home: "Home", works: "works", about: "about", back: "Back" },
  footer: {
    script: "Let's talk",
    headline: ["WISH YOU WERE", "IN MY CITY"],
    body: "Open to full-time roles, freelance projects and collaborations in UX/UI, branding and illustration. Write me and I’ll answer within 48 hours.",
    to: "To:",
    email: "Email",
    behance: "Behance",
    linkedin: "LinkedIn",
    postmark: "Postmark: Cali, Colombia, 2026",
    stampCountry: "CREATIVE CITY",
    opensNewTab: "opens in a new tab",
  },
  meta: { role: "Role:", year: "Year:", timeline: "Timeline:", tools: "Tools used:", skills: "Skills" },
  common: { readMore: "Read more on Behance:", skipToContent: "Skip to content" },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  nav: { home: "Inicio", works: "Proyectos", about: "Sobre mí", contact: "Contacto", label: "Principal" },
  lang: { label: "Idioma", en: "Eng", es: "Esp", switchTo: "Switch to English" },
  breadcrumb: { label: "Ruta de navegación", home: "Inicio", works: "proyectos", about: "sobre mí", back: "Volver" },
  footer: {
    script: "Hablemos",
    headline: ["OJALÁ ESTUVIERAS", "EN MI CIUDAD"],
    body: "Disponible para empleo de tiempo completo, proyectos freelance y colaboraciones en UX/UI, branding e ilustración. Escríbeme y te respondo en menos de 48 horas.",
    to: "Para:",
    email: "Email",
    behance: "Behance",
    linkedin: "LinkedIn",
    postmark: "Matasellos: Cali, Colombia, 2026",
    stampCountry: "CIUDAD CREATIVA",
    opensNewTab: "se abre en una pestaña nueva",
  },
  meta: { role: "Rol:", year: "Año:", timeline: "Duración:", tools: "Herramientas:", skills: "Habilidades" },
  common: { readMore: "Ver más en Behance:", skipToContent: "Saltar al contenido" },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const contact = {
  email: "sogamoso.creative@gmail.com",
  behance: { url: "https://www.behance.net/isabellcabrera3", label: "behance.net/isabellcabrera3" },
  linkedin: {
    url: "https://www.linkedin.com/in/isabella-cabrera-ux-ui-design-product",
    label: "in/isabella-cabrera-ux-ui-design-product",
  },
};

/** Bilingual string helper used by page content files. */
export type T = { en: string; es: string };
export const t = (value: T, locale: Locale) => value[locale];
