import { League_Spartan, MuseoModerno } from "next/font/google";

/*
 * Page-specific faces, only loaded where imported.
 * (Barrio, Red Rose, Plus Jakarta Sans and Montserrat appear in Figma only
 * inside artwork that ships as images, so they are not loaded.)
 */

/** MuseoModerno + Spartan (Google: League Spartan) — Amphibia typography specimen. */
export const museoModerno = MuseoModerno({ subsets: ["latin"], weight: "400", variable: "--ff-museo-moderno", display: "swap" });
export const leagueSpartan = League_Spartan({ subsets: ["latin"], weight: "400", variable: "--ff-league-spartan", display: "swap" });
