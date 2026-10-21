"use client";

import Image from "next/image";
import { useState, type CSSProperties, type PointerEvent } from "react";
import type { AssetMeta } from "@/content/assets.generated";
import styles from "./IllustrationGallery.module.css";

export type GalleryItem = { img: AssetMeta; alt: string; name: string; color: string };

/**
 * ENTO illustrations as a full-bleed mosaic of tinted tiles. Hover (or tap /
 * keyboard focus) floods the tile with its ENTO colour, lifts and tilts the
 * illustration toward the pointer and writes the ingredient name in the
 * script face used by the process cards.
 */
export function IllustrationGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * 18).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * 18).toFixed(2)}deg`);
  };

  const onLeave = (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <ul className={styles.grid}>
      {items.map((it, i) => (
        <li key={it.img.src}>
          <button
            type="button"
            className={styles.tile}
            style={{ ["--c" as string]: it.color, ["--d" as string]: `${i * -0.7}s` } as CSSProperties}
            data-active={active === i || undefined}
            aria-pressed={active === i}
            aria-label={it.alt}
            onClick={() => setActive((a) => (a === i ? null : i))}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <span className={styles.name} aria-hidden="true">
              {it.name}
            </span>
            <span className={styles.float}>
              <span className={styles.art}>
                <Image src={it.img.src} width={it.img.width} height={it.img.height} alt="" unoptimized />
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
