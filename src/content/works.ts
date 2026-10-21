import type { T } from "./dictionary";
import type { CategorySlug } from "./projects";

/** Copy from Figma "Works / Lobby", "Category / Product Design", "Category / Branding" (+ Spanish). */
export const worksCopy = {
  title: { en: "WORKS", es: "PROYECTOS" } satisfies T,
  beetleHint: { en: "Drag to rotate", es: "Arrastra para girar" } satisfies T,
  stampsLabel: { en: "Projects", es: "Proyectos" } satisfies T,
};

type CategoryCopy = {
  title: T;
  crumb: T;
  description: T;
  skills: T[];
  lobbyChips: T[];
  beetleAlt: T;
};

export const categoryCopy: Record<CategorySlug, CategoryCopy> = {
  "product-design": {
    title: { en: "PRODUCT DESIGN", es: "DISEÑO DE PRODUCTO" },
    crumb: { en: "product design", es: "diseño de producto" },
    description: {
      en: "Projects designed in Figma, grounded in UX research and brought to life with thoughtful UI design. Projects design end to end.",
      es: "Proyectos diseñados en Figma, con base en investigación UX y llevados a la vida con un diseño UI cuidadoso. Proyectos diseñados de principio a fin.",
    },
    skills: [
      { en: "UX/UI design", es: "Diseño UX/UI" },
      { en: "UX research", es: "Investigación UX" },
      { en: "Wireframes", es: "Wireframes" },
      { en: "Behavioral design", es: "Diseño conductual" },
      { en: "HCI", es: "HCI" },
      { en: "Visual concepting", es: "Conceptualización visual" },
    ],
    lobbyChips: [
      { en: "UX/UI", es: "UX/UI" },
      { en: "Research", es: "Investigación" },
      { en: "Wireframes", es: "Wireframes" },
    ],
    beetleAlt: {
      en: "3D model of a pale green rhinoceros beetle with black spots; drag to rotate it",
      es: "Modelo 3D de un escarabajo rinoceronte verde pálido con manchas negras; arrástralo para girarlo",
    },
  },
  branding: {
    title: { en: "Branding", es: "Branding" },
    crumb: { en: "branding", es: "branding" },
    description: {
      en: "Brand identities from concept to system: logos, color, typography and a clear graphic direction, crafted in Adobe Illustrator with 2D vector illustration.",
      es: "Identidades de marca del concepto al sistema: logos, color, tipografía y una dirección gráfica clara, creadas en Adobe Illustrator con ilustración vectorial 2D.",
    },
    skills: [
      { en: "Logo design", es: "Diseño de logo" },
      { en: "Brand identity", es: "Identidad de marca" },
      { en: "Art direction", es: "Dirección de arte" },
      { en: "Vector illustration", es: "Ilustración vectorial" },
      { en: "Typography", es: "Tipografía" },
      { en: "Color palettes", es: "Paletas de color" },
    ],
    lobbyChips: [
      { en: "Brand creation", es: "Creación de marca" },
      { en: "Conceptualization", es: "Conceptualización" },
      { en: "Packaging", es: "Packaging" },
    ],
    beetleAlt: {
      en: "3D model of a black and white Goliath beetle; drag to rotate it",
      es: "Modelo 3D de un escarabajo Goliat blanco y negro; arrástralo para girarlo",
    },
  },
};
