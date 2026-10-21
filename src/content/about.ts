import type { T } from "./dictionary";

/** Copy from Figma "About / 01 Intro" and "About / 02 Skillsets" (+ Spanish). */
export const aboutCopy = {
  title: { en: "About me", es: "Sobre mí" } satisfies T,
  clickToRead: { en: "Click to read", es: "Haz clic para leer" } satisfies T,
  signs: {
    intro: { en: "Intro — who I am", es: "Intro — quién soy" } satisfies T,
    skillsets: { en: "Skillsets", es: "Habilidades" } satisfies T,
    experiences: { en: "Experiences", es: "Experiencias" } satisfies T,
    passions: { en: "Passions", es: "Pasiones" } satisfies T,
  },
  signPostAlt: {
    en: "A street sign post with my portrait on the stop sign and three signs: Skillsets, Experiences and Passions",
    es: "Un poste de señales con mi retrato en la señal de pare y tres letreros: Skillsets, Experiences y Passions",
  } satisfies T,
  intro: {
    location: { en: "Cali, Colombia", es: "Cali, Colombia" } satisfies T,
    localTime: { en: "Local time:", es: "Hora local:" } satisfies T,
    role: { en: "Interactive media designer", es: "Diseñadora de medios interactivos" } satisfies T,
    p1: {
      en: "I'm Isabella Cabrera Sogamoso, an interactive media designer passionate about building purposeful visual universes and digital experiences. My work is not limited to a single discipline: it spans from graphic design, brand identity creation, packaging, and illustration, to the heart of UX/UI and information architecture.",
      es: "Soy Isabella Cabrera Sogamoso, diseñadora de medios interactivos apasionada por construir universos visuales y experiencias digitales con propósito. Mi trabajo no se limita a una sola disciplina: va desde el diseño gráfico, la creación de identidades de marca, el packaging y la ilustración, hasta el corazón del UX/UI y la arquitectura de la información.",
    } satisfies T,
    p2: {
      en: "I am deeply driven by research and human-centered methodologies, which allow me to thoroughly understand problems before designing solutions.",
      es: "Me mueven profundamente la investigación y las metodologías centradas en las personas, que me permiten entender a fondo los problemas antes de diseñar soluciones.",
    } satisfies T,
  },
  skillsets: {
    skillsTitle: { en: "Skillsets", es: "Habilidades" } satisfies T,
    skills: [
      { en: "UX-UI", es: "UX-UI" },
      { en: "Branding", es: "Branding" },
      { en: "Graphic", es: "Gráfico" },
    ] satisfies T[],
    softwareTitle: { en: "Software", es: "Software" } satisfies T,
    software: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma"],
    languagesTitle: { en: "Languages", es: "Idiomas" } satisfies T,
    languages: [
      { en: "Spanish Native", es: "Español nativo" },
      { en: "English C1", es: "Inglés C1" },
    ] satisfies T[],
  },
  wheel: {
    experiences: { en: "Experiences", es: "Experiencias" } satisfies T,
    passions: { en: "Passions", es: "Pasiones" } satisfies T,
    of: { en: "of", es: "de" } satisfies T,
    hint: { en: "Drag or use the arrow keys to turn the dial", es: "Arrastra o usa las flechas para girar el dial" } satisfies T,
  },
};

export type AboutView = "intro" | "skillsets" | "experiences" | "passions";
export const aboutViews: AboutView[] = ["intro", "skillsets", "experiences", "passions"];
