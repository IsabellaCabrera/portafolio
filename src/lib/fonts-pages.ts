import { Barrio, League_Spartan, Montserrat, MuseoModerno, Plus_Jakarta_Sans, Red_Rose } from "next/font/google";

/* ── Page-specific faces (only loaded where imported) ────────────────── */

/** Red Rose — "sog / moso / Isa" wordmark on the home postcard. */
export const redRose = Red_Rose({ subsets: ["latin"], weight: "400", variable: "--ff-red-rose", display: "swap" });

/** Plus Jakarta Sans ExtraBold — "Lumi" stamp lettering. */
export const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "800", variable: "--ff-plus-jakarta", display: "swap" });

/** Montserrat ExtraBold — "Carpooling" tag on the Bipbip stamp. */
export const montserrat = Montserrat({ subsets: ["latin"], weight: "800", variable: "--ff-montserrat", display: "swap" });

/** Barrio — ENTO lettering. */
export const barrio = Barrio({ subsets: ["latin"], weight: "400", variable: "--ff-barrio", display: "swap" });

/** MuseoModerno + Spartan (Google: League Spartan) — Amphibia typography specimen. */
export const museoModerno = MuseoModerno({ subsets: ["latin"], weight: "400", variable: "--ff-museo-moderno", display: "swap" });
export const leagueSpartan = League_Spartan({ subsets: ["latin"], weight: "400", variable: "--ff-league-spartan", display: "swap" });
