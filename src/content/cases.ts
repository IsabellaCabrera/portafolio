import type { T } from "./dictionary";
import type { AssetPath } from "./assets.generated";

/**
 * Case study copy, verbatim from the Figma "Case / …" frames (English) with
 * Spanish translations. `**text**` marks bold runs (as styled in Figma).
 */

export type CaseMeta = { role: T; year: string; timeline: T; tools: T; chips: T[] };

export type Insight = { title: T; body: T };

export type BehanceLink = { label: T; url: string };

const PROBLEM: T = { en: "Problem", es: "Problema" };
const SOLUTION: T = { en: "Solution", es: "Solución" };
const INSIGHTS: T = { en: "Quantitative Insights", es: "Insights cuantitativos" };
const DESIGNING: T = { en: "Designing a Seamless", es: "Diseñando una experiencia fluida" };
const WIREFRAMES_SUB: T = { en: "Low-quality wireframes, the basis for good design.", es: "Wireframes de baja fidelidad, la base de un buen diseño." };
const BRAND_CONCEPT: T = { en: "Brand Concept & Inspiration", es: "Concepto de marca e inspiración" };

export const caseLabels = { PROBLEM, SOLUTION, INSIGHTS, DESIGNING, WIREFRAMES_SUB, BRAND_CONCEPT };

/* ── Product Design ───────────────────────────────────────────── */

export type ProductCase = {
  slug: "bipbip" | "lumi" | "linglink";
  title: string;
  intro: T[];
  introTone?: "ink" | "olive";
  hero: { src: AssetPath; alt: T; box: { x: number; y: number; w: number; h: number }; shadow?: boolean };
  meta: CaseMeta;
  problem: T[];
  solution: T[];
  screens: { src: AssetPath; alt: T; box: { x: number; y: number; w: number; h: number } };
  insights: Insight[];
  insightsTone?: "ink" | "olive";
  wireframes?: { src: AssetPath; alt: T };
  behance: { gradient: [string, string]; links: BehanceLink[] };
};

const bipbipInsights: Insight[] = [
  {
    title: { en: "Research & Scope", es: "Investigación y alcance" },
    body: {
      en: "Combining a mixed-method study of 50+ surveys, 4 in-depth interviews, and 2 focus groups with university students in Cali, Colombia, we mapped behaviors for both student passengers and drivers while benchmarking existing transport and chat apps to uncover critical UX gaps.",
      es: "Combinando un estudio de métodos mixtos con más de 50 encuestas, 4 entrevistas a profundidad y 2 grupos focales con estudiantes universitarios en Cali, Colombia, mapeamos los comportamientos de pasajeros y conductores estudiantes, y comparamos apps de transporte y chat existentes para descubrir brechas críticas de UX.",
    },
  },
  {
    title: { en: "Core User Pain Points", es: "Principales puntos de dolor" },
    body: {
      en: "Over 80% of users experienced severe frustration from chaotic WhatsApp groups where critical ride details were lost, compounded by unpunctuality, last-minute cancellations during tight morning schedules, and a total lack of safety verification.",
      es: "Más del 80% de los usuarios vivía una gran frustración con grupos de WhatsApp caóticos donde se perdían detalles clave de los viajes, sumado a la impuntualidad, las cancelaciones de último minuto en horarios matutinos ajustados y la falta total de verificación de seguridad.",
    },
  },
  {
    title: { en: "User Personas & Journey Insights", es: "User personas e insights del recorrido" },
    body: {
      en: "By defining Valeria (a passenger seeking safe, budget-friendly early rides) and Alejandro (a driver needing route optimization and minimized no-shows), journey mapping revealed key trust drop-offs that guided our end-to-end mobile architecture.",
      es: "Al definir a Valeria (una pasajera que busca viajes tempranos seguros y económicos) y a Alejandro (un conductor que necesita optimizar rutas y reducir las ausencias), el journey mapping reveló los puntos donde se pierde la confianza y guió nuestra arquitectura móvil de principio a fin.",
    },
  },
];

export const productCases: Record<ProductCase["slug"], ProductCase> = {
  bipbip: {
    slug: "bipbip",
    title: "Bipbip",
    intro: [
      {
        en: "University commuting relied heavily on informal WhatsApp groups, where over 80% of users struggled with message overload, unpunctuality, and last-minute cancellations.",
        es: "Los desplazamientos universitarios dependían en gran medida de grupos informales de WhatsApp, donde más del 80% de los usuarios lidiaba con la sobrecarga de mensajes, la impuntualidad y las cancelaciones de último minuto.",
      },
      {
        en: "Bipbip was built as a dedicated end-to-end mobile application to replace this friction with structure, safety, and clear schedules for both students and drivers.",
        es: "Bipbip nació como una aplicación móvil dedicada, de principio a fin, para reemplazar esa fricción con estructura, seguridad y horarios claros para estudiantes y conductores.",
      },
    ],
    hero: {
      src: "/assets/cases/bipbip/hero.webp",
      alt: { en: "Bipbip app icon: the red BIP BIP lettering on a deep magenta square", es: "Ícono de la app Bipbip: las letras BIP BIP en rojo sobre un cuadrado magenta oscuro" },
      box: { x: 592, y: 251, w: 276, h: 276 },
    },
    meta: {
      role: { en: "Product Design (UX/UI)", es: "Diseño de producto (UX/UI)" },
      year: "2025",
      timeline: { en: "1 month", es: "1 mes" },
      tools: { en: "Figma / Google forms", es: "Figma / Google Forms" },
      chips: [
        { en: "Critical thinking", es: "Pensamiento crítico" },
        { en: "UX research", es: "Investigación UX" },
        { en: "Information architecture", es: "Arquitectura de la información" },
        { en: "Wireframes", es: "Wireframes" },
      ],
    },
    problem: [
      {
        en: "University carpooling relied on chaotic WhatsApp groups, where over 80% of students struggled with message overload, unverified users, and last-minute cancellations.",
        es: "El carpooling universitario dependía de grupos caóticos de WhatsApp, donde más del 80% de los estudiantes lidiaba con la sobrecarga de mensajes, usuarios sin verificar y cancelaciones de último minuto.",
      },
    ],
    solution: [
      {
        en: "Bipbip is a dedicated end-to-end mobile ecosystem that replaces chat chaos with a structured platform featuring secure student verification, timetable syncing, real-time trip tracking, and a dual mode for riders and drivers (\"Beepers\").",
        es: "Bipbip es un ecosistema móvil dedicado, de principio a fin, que reemplaza el caos del chat con una plataforma estructurada: verificación segura de estudiantes, sincronización de horarios, seguimiento de viajes en tiempo real y un modo dual para pasajeros y conductores (\"Beepers\").",
      },
    ],
    screens: {
      src: "/assets/cases/bipbip/problem-solution.webp",
      alt: { en: "Three Bipbip screens: the “Llegó la revolución de los cupos” welcome, the home with available rides, and the live trip map", es: "Tres pantallas de Bipbip: la bienvenida “Llegó la revolución de los cupos”, el inicio con viajes disponibles y el mapa del viaje en vivo" },
      box: { x: 568, y: 1450, w: 738, h: 467.5 },
    },
    insights: bipbipInsights,
    wireframes: {
      src: "/assets/cases/bipbip/wireframes.webp",
      alt: { en: "Grid of low-fidelity Bipbip wireframes covering onboarding, login, ride search, trip details and profile", es: "Cuadrícula de wireframes de baja fidelidad de Bipbip: onboarding, inicio de sesión, búsqueda de viajes, detalle del viaje y perfil" },
    },
    behance: {
      gradient: ["rgb(255 49 84 / 0.22)", "#7d002d"],
      links: [
        { label: { en: "UX research", es: "Investigación UX" }, url: "https://www.behance.net/gallery/221946137/UX-Case-Study-Carpooling" },
        { label: { en: "Development", es: "Desarrollo" }, url: "https://www.behance.net/gallery/224952691/Bipbip-Carpooling-Mobile-App-UXUI/modules/1285654395" },
      ],
    },
  },

  lumi: {
    slug: "lumi",
    title: "Lumi",
    intro: [
      {
        en: "Lumi is a Human-Computer Interaction (HCI) research and design project exploring how a physical, light-emitting wearable combined with a lightweight mobile app (Progressive Web App in React)",
        es: "Lumi es un proyecto de investigación y diseño en Interacción Humano-Computador (HCI) que explora cómo un wearable físico que emite luz, combinado con una app móvil ligera (Progressive Web App en React),",
      },
      {
        en: "Can help university students improve their nutritional and hydration habits amidst fast-paced routines and academic stress",
        es: "puede ayudar a estudiantes universitarios a mejorar sus hábitos de nutrición e hidratación en medio de rutinas aceleradas y estrés académico.",
      },
    ],
    hero: {
      src: "/assets/cases/lumi/hero.webp",
      alt: { en: "Lumi keychain: a rounded diamond-shaped wearable with a glowing yellow power button", es: "Llavero Lumi: un wearable con forma de rombo redondeado y un botón de encendido amarillo iluminado" },
      box: { x: 496, y: 194, w: 400.34, h: 453.06 },
      shadow: true,
    },
    meta: {
      role: { en: "UX Research, Developer.", es: "Investigación UX, desarrollo." },
      year: "2025",
      timeline: { en: "3 months", es: "3 meses" },
      tools: { en: "Figma, Google forms, R, C++.", es: "Figma, Google Forms, R, C++." },
      chips: [
        { en: "HCI", es: "HCI" },
        { en: "Electronic development", es: "Desarrollo electrónico" },
        { en: "Behavioral Design & Habit Formation", es: "Diseño conductual y formación de hábitos" },
        { en: "Statistical Data Analysis", es: "Análisis estadístico de datos" },
      ],
    },
    problem: [
      {
        en: "University students face four major barriers to healthy eating: fast-paced routines, perceived high costs, academic stress leading to impulsive decisions, and widespread nutritional misinformation.",
        es: "Los estudiantes universitarios enfrentan cuatro grandes barreras para comer sano: rutinas aceleradas, la percepción de costos altos, el estrés académico que lleva a decisiones impulsivas y la desinformación nutricional generalizada.",
      },
      {
        en: "Furthermore, traditional nutrition apps cause fatigue, guilt, and high cognitive load due to demanding manual logs and invasive notifications, leading users to abandon them in less than a week.",
        es: "Además, las apps de nutrición tradicionales generan cansancio, culpa y una alta carga cognitiva por los registros manuales exigentes y las notificaciones invasivas, lo que lleva a abandonarlas en menos de una semana.",
      },
    ],
    solution: [
      {
        en: "An experimental end-to-end design solution featuring an intelligent smart keychain with light stimuli and a lightweight PWA.",
        es: "Una solución de diseño experimental de principio a fin: un llavero inteligente con estímulos de luz y una PWA ligera.",
      },
      {
        en: "The device acts as a gentle, non-intrusive physical and emotional trigger—using color codes that reduce logging friction, lower cognitive load, and foster empathetic companionship without judging the user.",
        es: "El dispositivo actúa como un detonante físico y emocional suave y no intrusivo: usa códigos de color que reducen la fricción al registrar, bajan la carga cognitiva y acompañan con empatía, sin juzgar a la persona.",
      },
    ],
    screens: {
      src: "/assets/cases/lumi/screens.webp",
      alt: { en: "Five Lumi app screens in soft pastel gradients showing the daily check-in, hydration and meal logging states", es: "Cinco pantallas de la app Lumi en degradados pastel con el registro diario, la hidratación y el registro de comidas" },
      box: { x: 600, y: 1460, w: 716.5, h: 965 },
    },
    insightsTone: "olive",
    insights: [
      {
        title: { en: "Research & Scope", es: "Investigación y alcance" },
        body: {
          en: "Combining a **mixed-method** study **(+70 survey entries)** with an experimental setup, we evaluated habits, academic stress, and competitor gaps. We then tested a **React PWA** paired with an **ESP32-C3 light-emitting wearable** against an a**pp-only control group** to **measure real habit adherence.**",
          es: "Combinando un estudio de **métodos mixtos** **(+70 respuestas de encuesta)** con un montaje experimental, evaluamos hábitos, estrés académico y brechas frente a la competencia. Luego probamos una **PWA en React** junto a un **wearable con luz ESP32-C3** frente a un **grupo de control solo con la app** para **medir la adherencia real a los hábitos.**",
        },
      },
      {
        title: { en: "Quantitative Impact", es: "Impacto cuantitativo" },
        body: {
          en: "**Testing proved** that **light-based** reminders **drive higher engagement** **than standard phone notifications.** **Users** with the **wearable** **drank water 36%** **more regularly**, logged their habits **1.5x more frequently each day**, and made **measurably** better nutritional choices during **breakfast** and **lunch.**",
          es: "**Las pruebas demostraron** que los recordatorios **con luz** **generan más compromiso** **que las notificaciones normales del celular.** **Quienes usaron** el **wearable** **tomaron agua un 36%** **con más regularidad**, registraron sus hábitos **1,5 veces más seguido cada día** y tomaron decisiones nutricionales **notablemente** mejores en el **desayuno** y el **almuerzo.**",
        },
      },
      {
        title: { en: "UX Takeaways", es: "Aprendizajes de UX" },
        body: {
          en: "Users reported the **light** acted as a gentle, **non-intrusive emotional trigger** that drastically **reduced cognitive load** and **friction compared** to app notifications alone. This confirmed that **physical**, empathetic **reminders** foster **better long-term** habit **tracking** **without causing guilt or fatigue.**",
          es: "Los usuarios contaron que la **luz** funcionó como un **detonante emocional suave y no intrusivo** que **redujo drásticamente la carga cognitiva** y la **fricción frente** a las notificaciones de la app. Esto confirmó que los **recordatorios** **físicos** y empáticos favorecen un **mejor seguimiento** de hábitos **a largo plazo** **sin generar culpa ni cansancio.**",
        },
      },
    ],
    behance: {
      gradient: ["rgb(148 100 255 / 0.36)", "#3e3461"],
      links: [{ label: { en: "Product design", es: "Diseño de producto" }, url: "https://www.behance.net/gallery/239424711/Lumi-wearable-app-HCI" }],
    },
  },

  linglink: {
    slug: "linglink",
    title: "LingLink",
    introTone: "olive",
    intro: [
      {
        en: "Linglink is a dual-mode creative collaboration platform designed to connect individuals through shared passion rather than just profession, bridging the gap between meaningful personal relationships and professional growth.",
        es: "Linglink es una plataforma de colaboración creativa con dos modos, diseñada para conectar a las personas por una pasión compartida y no solo por su profesión, uniendo las relaciones personales significativas con el crecimiento profesional.",
      },
    ],
    hero: {
      src: "/assets/cases/linglink/hero.webp",
      alt: { en: "LingLink logo in white over a dark blue and violet glow", es: "Logo de LingLink en blanco sobre un resplandor azul oscuro y violeta" },
      box: { x: 550, y: 239, w: 350, h: 184.7 },
    },
    meta: {
      role: { en: "Product Design (UX/UI)", es: "Diseño de producto (UX/UI)" },
      year: "2025",
      timeline: { en: "1 month", es: "1 mes" },
      tools: { en: "Figma / Google forms", es: "Figma / Google Forms" },
      chips: [
        { en: "Visual Concepting", es: "Conceptualización visual" },
        { en: "Wireframes", es: "Wireframes" },
        { en: "Hypothesis Testing & Validation", es: "Pruebas y validación de hipótesis" },
        { en: "UI design", es: "Diseño UI" },
        { en: "Agile Design Process", es: "Proceso de diseño ágil" },
      ],
    },
    problem: [
      {
        en: "Traditional platforms fail to capture creative nuances, leaving users struggling to find skilled collaborators, coordinate schedules, and form genuine connections beyond rigid professional networking.",
        es: "Las plataformas tradicionales no captan los matices creativos, y los usuarios tienen dificultades para encontrar colaboradores con talento, coordinar horarios y crear conexiones genuinas más allá del networking profesional rígido.",
      },
    ],
    solution: [
      {
        en: "A dual-mode app allowing users to switch between Romance and Work modes. It streamlines collaboration through structured project proposals, skill-based matching, and guided onboarding to build meaningful connections.",
        es: "Una app con dos modos que permite cambiar entre Romance y Trabajo. Facilita la colaboración con propuestas de proyecto estructuradas, emparejamiento por habilidades y un onboarding guiado para construir conexiones significativas.",
      },
    ],
    screens: {
      src: "/assets/cases/linglink/screens.webp",
      alt: { en: "Three dark LingLink screens: onboarding, “Your Matches” with creative profiles, and “It's a link!”", es: "Tres pantallas oscuras de LingLink: onboarding, “Your Matches” con perfiles creativos e “It's a link!”" },
      box: { x: 571, y: 1499, w: 740, h: 462 },
    },
    insightsTone: "olive",
    insights: [
      {
        title: { en: "Research & Insights:", es: "Investigación e insights:" },
        body: bipbipInsights[0]!.body,
      },
      bipbipInsights[1]!,
      bipbipInsights[2]!,
    ],
    wireframes: {
      src: "/assets/cases/linglink/wireframes.webp",
      alt: { en: "Grid of LingLink wireframes in gray and white, from onboarding and matching to chat and project proposals", es: "Cuadrícula de wireframes de LingLink en gris y blanco, desde el onboarding y el emparejamiento hasta el chat y las propuestas" },
    },
    behance: {
      gradient: ["rgb(66 150 255 / 0.49)", "#0d4879"],
      links: [
        { label: { en: "UX research", es: "Investigación UX" }, url: "https://www.behance.net/gallery/221946137/UX-Case-Study-Carpooling" },
        { label: { en: "Development", es: "Desarrollo" }, url: "https://www.behance.net/gallery/224952691/Bipbip-Carpooling-Mobile-App-UXUI/modules/1285654395" },
      ],
    },
  },
};

export const lumiExtra = {
  colorCode: {
    title: { en: "Color code", es: "Código de color" } satisfies T,
    body: {
      en: "The Lumi light system uses empathetic color coding to guide habits without judgment: blue prompts hydration, green signals balanced meals, and orange indicates missing nutrients or logs. At night, yellow celebrates meeting daily goals, while orange gently highlights room for improvement.",
      es: "El sistema de luz de Lumi usa un código de color empático para guiar hábitos sin juzgar: el azul invita a hidratarse, el verde indica comidas balanceadas y el naranja señala nutrientes o registros faltantes. En la noche, el amarillo celebra las metas cumplidas y el naranja muestra con suavidad lo que se puede mejorar.",
    } satisfies T,
  },
  hardware: {
    title: { en: "Hardware", es: "Hardware" } satisfies T,
    body: {
      en: "The Lumi experimental wearable was built on an ESP32-C3—a compact, ultra-low-power 32-bit RISC-V chip running at 160MHz. It linked to the React PWA via Bluetooth Low Energy (BLE) for real-time background sync and controlled a KY-016 RGB LED module.",
      es: "El wearable experimental de Lumi se construyó sobre un ESP32-C3, un chip RISC-V de 32 bits compacto y de ultra bajo consumo que funciona a 160 MHz. Se conectaba a la PWA en React por Bluetooth Low Energy (BLE) para sincronizar en segundo plano y en tiempo real, y controlaba un módulo LED RGB KY-016.",
    } satisfies T,
  },
  lightAlt: { en: "“light-emitting Lumi”: the keychain glowing, with handwritten-style lettering", es: "“light-emitting Lumi”: el llavero iluminado, con letras de estilo manuscrito" } satisfies T,
  hardwareAlt: {
    en: "“Lumi on the inside”: an open Lumi shell with annotated parts — ESP32-C3, LED module, voltage regulator, 220 Ω resistors and a 9V battery",
    es: "“Lumi on the inside”: la carcasa de Lumi abierta con sus partes señaladas — ESP32-C3, módulo LED, regulador de voltaje, resistencias de 220 Ω y una batería de 9 V",
  } satisfies T,
};

/* ── Branding ─────────────────────────────────────────────────── */

export const brandingMeta: Record<"ento" | "amphibia", CaseMeta & { title: string; intro: T[] }> = {
  ento: {
    title: "ENTO",
    intro: [
      {
        en: "ENTO is a family-owned culinary brand crafting high-quality, vacuum-sealed ready-to-eat meals and artisanal sauces.",
        es: "ENTO es una marca culinaria familiar que crea comidas listas para consumir, empacadas al vacío y de alta calidad, y salsas artesanales.",
      },
      {
        en: "Designed to bridge tradition and convenience, ENTO translates home-cooked warmth into a vibrant, modern packaging system that stands out on retail shelves",
        es: "Pensada para unir tradición y practicidad, ENTO traduce la calidez de la comida casera en un sistema de empaques vibrante y moderno que se destaca en los estantes.",
      },
    ],
    role: { en: "Graphic designer/ Art direction", es: "Diseñadora gráfica / Dirección de arte" },
    year: "2026",
    timeline: { en: "2 months", es: "2 meses" },
    tools: { en: "Adobe Illustrator / Clip Studio", es: "Adobe Illustrator / Clip Studio" },
    chips: [
      { en: "Art direction", es: "Dirección de arte" },
      { en: "Composition", es: "Composición" },
      { en: "Illustration", es: "Ilustración" },
      { en: "Packaging design", es: "Diseño de empaques" },
    ],
  },
  amphibia: {
    title: "AMPHIBIA",
    intro: [
      {
        en: "Amphibia is a digital studio that combines strategy, design and technology to turn ideas and services into experiences that build trust and drive lasting growth.",
        es: "Amphibia es un estudio digital que combina estrategia, diseño y tecnología para convertir ideas y servicios en experiencias que generan confianza e impulsan un crecimiento duradero.",
      },
      {
        en: "Its identity translates the features of a frog into a simplified, modern logo, balancing organic shapes with clean geometry through bold typography and a curated color palette.",
        es: "Su identidad traduce los rasgos de una rana en un logo moderno y simplificado, que equilibra formas orgánicas con geometría limpia mediante una tipografía contundente y una paleta de color cuidada.",
      },
    ],
    role: { en: "Graphic designer/ Art direction", es: "Diseñadora gráfica / Dirección de arte" },
    year: "2026",
    timeline: { en: "2 months", es: "2 meses" },
    tools: { en: "Figma / Adobe Illustrator", es: "Figma / Adobe Illustrator" },
    chips: [
      { en: "Logo design", es: "Diseño de logo" },
      { en: "Art direction", es: "Dirección de arte" },
      { en: "Typography", es: "Tipografía" },
      { en: "Color palettes", es: "Paletas de color" },
    ],
  },
};

export const entoCopy = {
  concept: [
    {
      en: "ENTO is built on the idea of bringing the warmth, comfort, and care of a home-cooked meal into the modern, fast-paced world. By pairing traditional recipes and vacuum-sealed convenience, ENTO transforms ready-to-eat meals into a comforting ritual.",
      es: "ENTO nace de la idea de llevar la calidez, el confort y el cuidado de una comida casera al mundo moderno y acelerado. Al unir recetas tradicionales con la practicidad del empaque al vacío, ENTO convierte las comidas listas en un ritual reconfortante.",
    },
    {
      en: "The visual identity draws deep inspiration from Mid-Century Modern design aesthetics—celebrating organic geometric shapes, bold typography, and cozy interior elements like the iconic lounge chair featured in the logo. The color palette blends nostalgic warm tones with rich contrasts, while custom faceted vector illustrations elevate simple ingredients into vivid, artistic statements.",
      es: "La identidad visual se inspira profundamente en la estética del diseño Mid-Century Modern: celebra las formas geométricas orgánicas, la tipografía contundente y los elementos de interiores acogedores, como el icónico sillón lounge del logo. La paleta mezcla tonos cálidos y nostálgicos con contrastes intensos, mientras ilustraciones vectoriales facetadas hechas a medida convierten ingredientes simples en piezas vivas y artísticas.",
    },
  ] satisfies T[],
  pattern: { en: ["ENTO", "FOOD", "READY TO EAT"], es: ["ENTO", "FOOD", "READY TO EAT"] },
  dragHint: { en: "Grab a sticker and drag it around", es: "Agarra un sticker y arrástralo" } satisfies T,
  stickersAlt: { en: "ENTO die-cut stickers scattered over the ENTO FOOD READY TO EAT pattern", es: "Stickers troquelados de ENTO esparcidos sobre el patrón ENTO FOOD READY TO EAT" } satisfies T,
  illustrationsTitle: { en: "Illustrations", es: "Ilustraciones" } satisfies T,
  illustrationNames: {
    tomato: { en: "Tomato", es: "Tomate" },
    mushroom: { en: "Mushroom", es: "Champiñón" },
    bacon: { en: "Bacon", es: "Tocineta" },
    ham: { en: "Ham", es: "Jamón" },
    basil: { en: "Basil", es: "Albahaca" },
    character: { en: "Warrior", es: "Guerrero" },
  } satisfies Record<string, T>,
  illustrationSubtitle: { en: "Faceted vector illustration", es: "Ilustración vectorial facetada" } satisfies T,
  processTitle: { en: "Design Process", es: "Proceso de diseño" } satisfies T,
  process: [
    {
      label: { en: "Briefing", es: "Briefing" },
      body: {
        en: "Defining ENTO as a cozy, family-centered brand balancing mid-century nostalgia with vacuum-sealed convenience.",
        es: "Definir ENTO como una marca acogedora y familiar que equilibra la nostalgia mid-century con la practicidad del empaque al vacío.",
      },
      color: "#973102",
      n: "01.",
    },
    {
      label: { en: "Research", es: "Investigación" },
      body: {
        en: "Crafting the iconic mid-century armchair logo and bold typography to evoke home comfort at mealtime.",
        es: "Crear el icónico logo del sillón mid-century y una tipografía contundente para evocar el confort del hogar a la hora de comer.",
      },
      color: "#820253",
      n: "02.",
    },
    {
      label: { en: "Concept", es: "Concepto" },
      body: {
        en: "Analyzing competitors to disrupt traditional, sterile food packaging using vibrant colors and visual storytelling.",
        es: "Analizar a la competencia para romper con los empaques de comida tradicionales y fríos, usando colores vibrantes y narrativa visual.",
      },
      color: "#5d5609",
      n: "03.",
    },
    {
      label: { en: "Color & identity", es: "Color e identidad" },
      body: {
        en: "Establishing a high-contrast color matrix and retro geometric fonts for instant recognition, designing custom faceted vector illustrations",
        es: "Establecer una matriz de color de alto contraste y tipografías geométricas retro para un reconocimiento inmediato, y diseñar ilustraciones vectoriales facetadas a medida.",
      },
      color: "#045077",
      n: "04.",
    },
  ],
  alts: {
    process1: { en: "Chocolate chip cookie dough balls on marble", es: "Bolitas de masa de galleta con chips de chocolate sobre mármol" } satisfies T,
    process2: { en: "A vacuum-sealed ENTO pouch heating in a pot of water", es: "Un empaque al vacío de ENTO calentándose en una olla con agua" } satisfies T,
    process3: { en: "Freshly sliced leeks", es: "Puerro recién cortado" } satisfies T,
    logoConstruction: { en: "ENTO logo construction grid on deep plum: spacing units and proportions of the armchair mark and lettering", es: "Construcción del logo de ENTO sobre ciruela: unidades de espacio y proporciones del sillón y las letras" } satisfies T,
    tomato: { en: "Faceted vector tomato", es: "Tomate vectorial facetado" } satisfies T,
    mushroom: { en: "Faceted vector mushroom", es: "Champiñón vectorial facetado" } satisfies T,
    bacon: { en: "Faceted vector bacon", es: "Tocineta vectorial facetada" } satisfies T,
    ham: { en: "Faceted vector ham leg", es: "Pata de jamón vectorial facetada" } satisfies T,
    basil: { en: "Faceted vector basil", es: "Albahaca vectorial facetada" } satisfies T,
    character: { en: "Faceted vector warrior holding a spear", es: "Guerrero vectorial facetado con una lanza" } satisfies T,
    flavor01: { en: "Chopped mushrooms", es: "Champiñones picados" } satisfies T,
    flavor04: { en: "Matcha cookie dough with white chocolate", es: "Masa de galleta de matcha con chocolate blanco" } satisfies T,
    flavor06: { en: "Cinnamon rolls", es: "Rollos de canela" } satisfies T,
    flavor07: { en: "A creamy batter being mixed", es: "Una mezcla cremosa batiéndose" } satisfies T,
    composition: { en: "ENTO packaging lineup — Tomates horneados and other flavors — next to the repeated “Best flavors” tagline", es: "Línea de empaques de ENTO — Tomates horneados y otros sabores — junto al lema repetido “Best flavors”" } satisfies T,
    logo: { en: "ENTO logo: a mid-century lounge chair next to the letters EN TO", es: "Logo de ENTO: un sillón lounge mid-century junto a las letras EN TO" } satisfies T,
  },
};

export const amphibiaCopy = {
  concept: [
    {
      en: "Amphibia is built on the idea that digital experiences should do more than simply showcase a business — they should help it grow. By combining strategy, design, and technology, Amphibia transforms ideas and services into meaningful digital experiences that build trust, connect brands with their audiences, and turn opportunities into lasting growth.",
      es: "Amphibia parte de la idea de que las experiencias digitales deben hacer más que mostrar un negocio: deben ayudarlo a crecer. Al combinar estrategia, diseño y tecnología, Amphibia convierte ideas y servicios en experiencias digitales significativas que generan confianza, conectan a las marcas con sus audiencias y transforman oportunidades en crecimiento duradero.",
    },
    {
      en: "Amphibia’s visual identity draws inspiration from the natural world, translating the distinctive features of a frog into a simplified, contemporary logo. The design balances organic shapes with clean geometry, reflecting the brand’s connection to nature while embracing a forward-thinking, technology-driven approach. A modern visual language, bold typography, and a carefully curated color palette bring the identity to life, expressing adaptability, creativity, and a constant drive to evolve alongside the digital landscape.",
      es: "La identidad visual de Amphibia se inspira en el mundo natural y traduce los rasgos distintivos de una rana en un logo simplificado y contemporáneo. El diseño equilibra formas orgánicas con geometría limpia, reflejando la conexión de la marca con la naturaleza y, a la vez, un enfoque visionario impulsado por la tecnología. Un lenguaje visual moderno, una tipografía contundente y una paleta de color cuidadosamente elegida dan vida a la identidad y expresan adaptabilidad, creatividad y un impulso constante por evolucionar junto al panorama digital.",
    },
  ] satisfies T[],
  palette: { en: "Color palette", es: "Paleta de color" } satisfies T,
  swatches: ["#DDCA01", "#0F0500", "#D63636", "#FDF296"],
  typography: { en: "Typography", es: "Tipografía" } satisfies T,
  typeNote: {
    en: "MuseoModerno’s soft, rounded forms blend with Spartan’s bold geometry to create a modern, approachable, and distinctive typographic identity that reflects Amphibia’s innovative spirit.",
    es: "Las formas suaves y redondeadas de MuseoModerno se combinan con la geometría contundente de Spartan para crear una identidad tipográfica moderna, cercana y distintiva que refleja el espíritu innovador de Amphibia.",
  } satisfies T,
  alts: {
    isotype: { en: "Amphibia isotype: a stylized black frog head", es: "Isotipo de Amphibia: una cabeza de rana negra estilizada" } satisfies T,
    wordmark: { en: "amphibia wordmark in pale yellow", es: "Logotipo amphibia en amarillo claro" } satisfies T,
    bento: { en: "Amphibia brand bento: the frog pattern on yellow, the wordmark on red, the full logo on black and the isotype on yellow", es: "Bento de la marca Amphibia: el patrón de ranas sobre amarillo, el logotipo sobre rojo, el logo completo sobre negro y el isotipo sobre amarillo" } satisfies T,
    fullLogo: { en: "Amphibia full logo: frog isotype above the yellow wordmark", es: "Logo completo de Amphibia: isotipo de rana sobre el logotipo amarillo" } satisfies T,
  },
};
