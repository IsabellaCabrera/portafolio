import type { T } from "./dictionary";

/** Copy from Figma "Home / 01 Entrance" and "Home / 02 Scroll" (+ Spanish). */
export const homeCopy = {
  welcome: { en: "welcome", es: "bienvenidos" } satisfies T,
  toMy: { en: "to my creative", es: "a mi ciudad" } satisfies T,
  city: { en: "city.", es: "creativa." } satisfies T,
  sign: { en: "PORTFOLIO", es: "PORTAFOLIO" } satisfies T,
  enter: { en: "Enter the portfolio", es: "Entrar al portafolio" } satisfies T,
  photoAlt: {
    en: "Isabella Cabrera Sogamoso smiling, a black and white photo taped to the map — go to About me",
    es: "Isabella Cabrera Sogamoso sonriendo, una foto en blanco y negro pegada al mapa — ir a Sobre mí",
  } satisfies T,
  postcardAlt: {
    en: "Postcard from Isa Sogamoso: “I'm an interactive media designer, with a multidisciplinary profile, sensibility and empathy.”",
    es: "Postal de Isa Sogamoso: “Soy diseñadora de medios interactivos, con un perfil multidisciplinario, sensibilidad y empatía.”",
  } satisfies T,
  stamps: {
    "product-design": { en: "Product Design stamp — go to Product Design", es: "Estampilla de Diseño de producto — ir a Diseño de producto" } satisfies T,
    branding: { en: "Branding stamp — go to Branding", es: "Estampilla de Branding — ir a Branding" } satisfies T,
    about: { en: "About me stamp — go to About me", es: "Estampilla Sobre mí — ir a Sobre mí" } satisfies T,
  },
  mapLabel: { en: "Map of my creative city", es: "Mapa de mi ciudad creativa" } satisfies T,
};
