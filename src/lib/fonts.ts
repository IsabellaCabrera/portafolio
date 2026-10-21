import { Afacad, Homemade_Apple, JetBrains_Mono, Work_Sans } from "next/font/google";

/* ── Site-wide faces (Figma text styles) ─────────────────────────────── */

/** Work Sans — every UI/body style in the file (Light 300 → Black 900). */
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--ff-work-sans",
  display: "swap",
});

/** Homemade Apple — Script/L, Script/S, "city.", process titles. */
export const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-homemade-apple",
  display: "swap",
});

/** Afacad — Chip/Label, Overline/Label. */
export const afacad = Afacad({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--ff-afacad",
  display: "swap",
});

/** Monospace numerals with slashed zero for the Circular Experience Wheel. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--ff-jetbrains-mono",
  display: "swap",
});

export const siteFontVariables = [workSans, homemadeApple, afacad, jetbrainsMono]
  .map((f) => f.variable)
  .join(" ");

/* Page-specific faces live in ./fonts-pages.ts so they only load on the pages that use them. */
