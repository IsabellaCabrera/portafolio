"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import type { AssetMeta } from "@/content/assets.generated";
import { DragHint } from "@/components/ui/DragHint";
import styles from "./StickerPile.module.css";

export type Sticker = { img: AssetMeta; x: number; y: number; w: number; h: number };

/**
 * ENTO die-cut stickers over the "ENTO FOOD READY TO EAT" pattern, full width.
 * Every sticker can be grabbed and moved anywhere inside the section; the one
 * being dragged comes to the front.
 */
export function StickerPile({
  frame,
  pattern,
  patternY,
  stickers,
  label,
  hint,
}: {
  frame: { w: number; h: number };
  pattern: AssetMeta;
  patternY: number;
  stickers: Sticker[];
  label: string;
  hint: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [order, setOrder] = useState(() => stickers.map((_, i) => i));
  const [dragged, setDragged] = useState(false);
  const bringToFront = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i]);
  const pct = (v: number, total: number) => `${(v / total) * 100}%`;

  return (
    <div className={styles.wrap}>
      <DragHint hidden={dragged} className={styles.hint}>
        {hint}
      </DragHint>
    <section ref={ref} className={styles.pile} style={{ aspectRatio: `${frame.w} / ${frame.h}` }} aria-label={label}>
      <Image
        src={pattern.src}
        width={pattern.width}
        height={pattern.height}
        alt=""
        aria-hidden="true"
        sizes="100vw"
        className={styles.pattern}
        style={{ top: pct(patternY, frame.h) }}
      />
      {stickers.map((s, i) => (
        <motion.div
          key={s.img.src}
          className={styles.sticker}
          style={{
            left: pct(s.x, frame.w),
            top: pct(s.y, frame.h),
            width: pct(s.w, frame.w),
            height: pct(s.h, frame.h),
            zIndex: order.indexOf(i) + 1,
          }}
          drag
          dragConstraints={ref}
          dragElastic={0.12}
          dragMomentum={!reduced}
          dragTransition={{ power: 0.25, timeConstant: 220 }}
          whileHover={reduced ? undefined : { scale: 1.04 }}
          whileDrag={{ scale: 1.08, rotate: -3, filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.28))" }}
          onPointerDown={() => bringToFront(i)}
          onDragStart={() => setDragged(true)}
        >
          <Image src={s.img.src} width={s.img.width} height={s.img.height} alt="" draggable={false} sizes="(max-width: 767px) 30vw, 34vw" />
        </motion.div>
      ))}
    </section>
    </div>
  );
}
