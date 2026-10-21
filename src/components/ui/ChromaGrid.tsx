"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { AssetMeta } from "@/content/assets.generated";
import styles from "./ChromaGrid.module.css";

export type ChromaItem = {
  image: AssetMeta;
  alt: string;
  title: string;
  subtitle: string;
  accent: string;
  url?: string;
};

/**
 * ChromaGrid (React Bits) adapted to the UI kit: cards stay black & white and
 * a soft spotlight that follows the cursor brings them back to colour; the
 * hovered (or tapped / focused) card lights up completely. The GSAP tweens of
 * the original are replaced by a small rAF easing, so no extra dependency.
 */
export function ChromaGrid({
  items,
  columns = 3,
  radius = 260,
  aspectRatio = "1 / 1",
}: {
  items: ChromaItem[];
  columns?: number;
  radius?: number;
  aspectRatio?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const p = pos.current;
    p.x = p.tx = width / 2;
    p.y = p.ty = height / 2;
    el.style.setProperty("--x", `${p.x}px`);
    el.style.setProperty("--y", `${p.y}px`);
    return () => cancelAnimationFrame(p.raf);
  }, []);

  const tick = () => {
    const el = root.current;
    const p = pos.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduced ? 1 : 0.14;
    p.x += (p.tx - p.x) * k;
    p.y += (p.ty - p.y) * k;
    el.style.setProperty("--x", `${p.x.toFixed(1)}px`);
    el.style.setProperty("--y", `${p.y.toFixed(1)}px`);
    p.raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.5 ? requestAnimationFrame(tick) : 0;
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !root.current) return;
    const r = root.current.getBoundingClientRect();
    pos.current.tx = e.clientX - r.left;
    pos.current.ty = e.clientY - r.top;
    if (!pos.current.raf) pos.current.raf = requestAnimationFrame(tick);
    if (fade.current) fade.current.style.opacity = "0";
  };

  const onLeave = () => {
    if (fade.current) fade.current.style.opacity = "1";
  };

  const onCardMove = (e: PointerEvent<HTMLElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={root}
      className={styles.grid}
      style={{ ["--r" as string]: `${radius}px`, ["--cols" as string]: columns } as CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {items.map((it, i) => {
        const content = (
          <>
            <span className={styles.media} style={{ aspectRatio }}>
              <Image src={it.image.src} width={it.image.width} height={it.image.height} alt={it.alt} unoptimized />
            </span>
            <span className={styles.footer}>
              <span className={styles.title}>{it.title}</span>
              <span className={styles.subtitle}>{it.subtitle}</span>
            </span>
          </>
        );
        const common = {
          className: styles.card,
          style: { ["--accent" as string]: it.accent, ["--i" as string]: i } as CSSProperties,
          "data-active": active === i || undefined,
          onPointerMove: onCardMove,
        };
        return it.url ? (
          <a key={it.image.src} href={it.url} target="_blank" rel="noopener noreferrer" {...common}>
            {content}
          </a>
        ) : (
          <figure
            key={it.image.src}
            tabIndex={0}
            {...common}
            onClick={() => setActive((a) => (a === i ? null : i))}
          >
            {content}
          </figure>
        );
      })}
      <div className={styles.overlay} aria-hidden="true" />
      <div ref={fade} className={styles.fade} aria-hidden="true" />
    </div>
  );
}
