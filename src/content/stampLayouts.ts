import type { Box, Frame } from "@/components/ui/stage";
import type { AssetPath } from "./assets.generated";

/**
 * Stamp piles exactly as placed in Figma (origin + size + rotation matrix
 * from each node's absoluteTransform). `y` is already relative to the
 * cluster's own frame (page y − frame top). Stamps are listed bottom → top.
 */

export type StampSlot = { project: string; src: AssetPath; box: Box };
export type StampLayout = { frame: Frame; mobileCropX: number; mobileW: number; stamps: StampSlot[] };

const LUMI: AssetPath = "/assets/stamps/lumi.webp";
const BIPBIP: AssetPath = "/assets/stamps/bipbip.webp";
const LINGLINK: AssetPath = "/assets/stamps/linglink.webp";
const ENTO: AssetPath = "/assets/stamps/ento.webp";
const AMPHIBIA: AssetPath = "/assets/stamps/amphibia.webp";

const shift = (y0: number, slots: StampSlot[]): StampSlot[] => slots.map((s) => ({ ...s, box: { ...s.box, y: s.box.y - y0 } }));

/** "Category / Product Design" — stamps between y≈740 and y≈1300 */
export const productDesignCluster: StampLayout = {
  frame: { w: 1440, h: 560 },
  mobileCropX: 250,
  mobileW: 940,
  stamps: shift(740, [
    { project: "lumi", src: LUMI, box: { x: 269, y: 930.3, w: 335.99, h: 396.16, m: [0.89, -0.46, 0.46, 0.89] } },
    { project: "linglink", src: LINGLINK, box: { x: 898.83, y: 751, w: 336.35, h: 397.98, m: [0.8, 0.6, -0.6, 0.8] } },
    { project: "bipbip", src: BIPBIP, box: { x: 547.28, y: 768, w: 362.83, h: 445.73, m: [1, 0.01, -0.01, 1] } },
  ]),
};

/** "Category / Branding" — stamps between y≈670 and y≈1240 */
export const brandingCluster: StampLayout = {
  frame: { w: 1440, h: 570 },
  mobileCropX: 340,
  mobileW: 760,
  stamps: shift(670, [
    { project: "ento", src: ENTO, box: { x: 367.28, y: 782.64, w: 371.44, h: 456.3, m: [0.96, -0.27, 0.27, 0.96] } },
    { project: "amphibia", src: AMPHIBIA, box: { x: 723.88, y: 689, w: 371.44, h: 456.3, m: [0.96, 0.28, -0.28, 0.96] } },
  ]),
};

/** Case pages reuse their category pile (Figma places the same stamps under each case header). */
export const caseClusters: Record<string, StampLayout> = {
  bipbip: {
    frame: { w: 1440, h: 640 },
    mobileCropX: 250,
    mobileW: 940,
    stamps: shift(680, [
      { project: "lumi", src: LUMI, box: { x: 273, y: 938.3, w: 335.99, h: 396.16, m: [0.89, -0.46, 0.46, 0.89] } },
      { project: "linglink", src: LINGLINK, box: { x: 889.83, y: 784, w: 336.35, h: 397.98, m: [0.8, 0.6, -0.6, 0.8] } },
      { project: "bipbip", src: BIPBIP, box: { x: 531.68, y: 696, w: 362.83, h: 445.73, m: [1, 0.01, -0.01, 1] } },
    ]),
  },
  lumi: {
    frame: { w: 1440, h: 620 },
    mobileCropX: 230,
    mobileW: 960,
    stamps: shift(700, [
      { project: "linglink", src: LINGLINK, box: { x: 827.6, y: 747.1, w: 362.83, h: 445.73, m: [0.89, 0.45, -0.45, 0.89] } },
      { project: "bipbip", src: BIPBIP, box: { x: 504.24, y: 774.1, w: 362.83, h: 445.73, m: [1, 0.01, -0.01, 1] } },
      { project: "lumi", src: LUMI, box: { x: 255, y: 865.74, w: 334.77, h: 398.77, m: [0.89, -0.46, 0.46, 0.89] } },
    ]),
  },
  linglink: {
    frame: { w: 1440, h: 620 },
    mobileCropX: 190,
    mobileW: 900,
    stamps: shift(680, [
      { project: "bipbip", src: BIPBIP, box: { x: 475.28, y: 802, w: 362.83, h: 445.73, m: [1, 0.01, -0.01, 1] } },
      { project: "linglink", src: LINGLINK, box: { x: 715.43, y: 696, w: 362.83, h: 445.73, m: [0.98, 0.21, -0.21, 0.98] } },
      { project: "lumi", src: LUMI, box: { x: 210, y: 939.3, w: 335.99, h: 396.16, m: [0.89, -0.46, 0.46, 0.89] } },
    ]),
  },
  ento: {
    frame: { w: 1440, h: 570 },
    mobileCropX: 320,
    mobileW: 750,
    stamps: shift(660, [
      { project: "amphibia", src: AMPHIBIA, box: { x: 695.88, y: 679, w: 371.44, h: 456.3, m: [0.96, 0.28, -0.28, 0.96] } },
      { project: "ento", src: ENTO, box: { x: 340, y: 745.7, w: 371.44, h: 456.3, m: [1, -0.09, 0.09, 1] } },
    ]),
  },
  amphibia: {
    frame: { w: 1440, h: 580 },
    mobileCropX: 320,
    mobileW: 780,
    stamps: shift(670, [
      { project: "ento", src: ENTO, box: { x: 340, y: 745.7, w: 371.44, h: 456.3, m: [1, -0.09, 0.09, 1] } },
      { project: "amphibia", src: AMPHIBIA, box: { x: 723.88, y: 702, w: 371.44, h: 456.3, m: [0.96, 0.28, -0.28, 0.96] } },
    ]),
  },
};

/** "Works / Lobby" cards: stamps relative to each card frame. */
export const lobbyCards: Record<"product-design" | "branding", { frame: Frame; stamps: StampSlot[] }> = {
  "product-design": {
    frame: { w: 440, h: 334 },
    stamps: [
      { project: "linglink", src: LINGLINK, box: { x: 504.99 - 267, y: 398.38 - 392, w: 217.21, h: 266.83, m: [0.93, 0.37, -0.37, 0.93] } },
      { project: "bipbip", src: BIPBIP, box: { x: 390.64 - 267, y: 0, w: 227.37, h: 279.31, m: [1, 0.01, -0.01, 1] } },
      { project: "lumi", src: LUMI, box: { x: 0, y: 501.57 - 392, w: 203.5, h: 222.85, m: [0.88, -0.47, 0.47, 0.88] } },
    ],
  },
  branding: {
    frame: { w: 422, h: 356 },
    stamps: [
      { project: "amphibia", src: AMPHIBIA, box: { x: 967.24 - 732, y: 379 - 360, w: 207.16, h: 254.49, m: [0.9, 0.43, -0.43, 0.9] } },
      { project: "ento", src: ENTO, box: { x: 0, y: 471.12 - 360, w: 228.38, h: 280.56, m: [0.87, -0.49, 0.49, 0.87] } },
    ],
  },
};
