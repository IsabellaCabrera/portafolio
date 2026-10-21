"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AssetMeta } from "@/content/assets.generated";
import { DragHint } from "@/components/ui/DragHint";
import styles from "./Beetle3D.module.css";

const BeetleCanvas = dynamic(() => import("./BeetleCanvas"), { ssr: false });

type NavigatorWithHints = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

function canRender3D(): boolean {
  try {
    const nav = navigator as NavigatorWithHints;
    if (nav.connection?.saveData) return false;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return false;
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Interactive 3D beetle (drag to rotate, slow auto-rotation). The 2D cut-out
 * from Figma is shown first and stays as the fallback on devices without
 * WebGL, with Save-Data on, or with very little memory. The model only loads
 * once the beetle scrolls into view.
 */
export function Beetle3D({
  model,
  fallback,
  alt,
  hint,
  yaw = 0.6,
  fallbackRotation = 0,
}: {
  model: string;
  fallback: AssetMeta;
  alt: string;
  hint: string;
  yaw?: number;
  /** degrees, to match the Figma image rotation */
  fallbackRotation?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount3D, setMount3D] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el || !canRender3D()) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMount3D(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onLoaded = useCallback(() => setLoaded(true), []);

  return (
    <div ref={ref} className={styles.wrap} data-loaded={loaded || undefined} role="img" aria-label={alt}>
      <Image
        src={fallback.src}
        width={fallback.width}
        height={fallback.height}
        alt=""
        aria-hidden="true"
        sizes="(max-width: 767px) 80vw, 560px"
        className={styles.fallback}
        style={{ transform: `rotate(${fallbackRotation}deg)` }}
        priority
      />
      {mount3D ? (
        <div className={styles.canvas} onPointerDown={() => setTouched(true)}>
          <BeetleCanvas url={model} yaw={yaw} autoRotate={!reduced} onLoaded={onLoaded} />
        </div>
      ) : null}
      {loaded ? (
        <DragHint hidden={touched} className={styles.hint}>
          {hint}
        </DragHint>
      ) : null}
    </div>
  );
}
