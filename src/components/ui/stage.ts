import type { CSSProperties } from "react";

/**
 * Free-form compositions (the map, stamp clusters, sticker piles) are laid out
 * exactly like the Figma frame: every element keeps its x/y/size as a
 * percentage of the frame, and its rotation as the same 2×2 matrix Figma
 * stores (absoluteTransform). The whole stage scales with its width, so at
 * 1440px it is pixel-identical to Figma and it shrinks proportionally below.
 *
 * Optional mobile placements override the desktop ones under 768px.
 */

export type Frame = { w: number; h: number };

/** Figma box: x/y are the node origin (top-left before rotation), w/h unrotated size. */
export type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** rotation/scale part of Figma's absoluteTransform: [a, b, c, d] */
  m?: [number, number, number, number];
};

const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(4)}%`;
const matrix = (m?: Box["m"]) => (m ? `matrix(${m[0]}, ${m[1]}, ${m[2]}, ${m[3]}, 0, 0)` : "none");

export function stageStyle(frame: Frame, mobile?: Frame): CSSProperties {
  return {
    ["--ar" as string]: `${frame.w} / ${frame.h}`,
    ...(mobile ? { ["--mar" as string]: `${mobile.w} / ${mobile.h}` } : {}),
  };
}

export function place(frame: Frame, box: Box, mobile?: { frame: Frame; box: Box | "hidden" }): CSSProperties {
  const style: Record<string, string> = {
    "--l": pct(box.x, frame.w),
    "--t": pct(box.y, frame.h),
    "--w": pct(box.w, frame.w),
    "--h": pct(box.h, frame.h),
    "--m": matrix(box.m),
  };
  if (mobile && mobile.box !== "hidden") {
    const b = mobile.box;
    style["--ml"] = pct(b.x, mobile.frame.w);
    style["--mt"] = pct(b.y, mobile.frame.h);
    style["--mw"] = pct(b.w, mobile.frame.w);
    style["--mh"] = pct(b.h, mobile.frame.h);
    style["--mm"] = matrix(b.m);
  }
  return style as CSSProperties;
}

/** Font size relative to the stage width (container query units). */
export const fs = (px: number, frameWidth = 1440) => `${((px / frameWidth) * 100).toFixed(4)}cqw`;

/** Rotation matrix for an angle in degrees (Figma convention: positive = counter-clockwise). */
export function rot(deg: number, scale = 1): [number, number, number, number] {
  const r = (deg * Math.PI) / 180;
  const c = +(Math.cos(r) * scale).toFixed(4);
  const s = +(Math.sin(r) * scale).toFixed(4);
  return [c, -s, s, c];
}
