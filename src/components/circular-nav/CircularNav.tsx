"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { NavItem } from "./experiences";
import styles from "./CircularNav.module.css";

/*
 * Watch-bezel rotary navigation.
 *
 * Polar layout (one motion value `pos`, in index units, drives everything):
 *   δᵢ = shortest signed distance from item i to pos  (wraps: last → first)
 *   θᵢ = δᵢ · step
 *   cx = activeX − R  (circle centre sits off-stage to the left), cy = H / 2
 *   xᵢ = cx + R·cos θᵢ,  yᵢ = cy + R·sin θᵢ        → the active item is at (activeX, H/2)
 * Scale, opacity, label fade and gray tint are continuous functions of |δᵢ|.
 */

export const WHEEL = {
  // activeX tuned from 0.40 to 0.30 so the label fits inside the About card column (Figma: dial sits left of the panel)
  desktop: { stepDeg: 15, radius: 0.72, activeX: 0.3 },
  compact: { stepDeg: 17, radius: 0.55, activeX: 0.2 },
  /** compact layout below this stage width (px) */
  compactBelow: 560,
  spring: { stiffness: 180, damping: 24, mass: 0.9 },
  /** |δ| where items are fully faded out */
  fadeOutAt: 3.2,
  /** |δ| where items reach their minimum scale */
  minScaleAt: 2.5,
  minScale: 0.5,
  /** how far a flick carries, in seconds of velocity */
  inertia: 0.22,
} as const;

type Geometry = { w: number; h: number; compact: boolean };

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const mod = (n: number, m: number) => ((n % m) + m) % m;
/** shortest signed distance from item i to position p on a loop of n */
const delta = (i: number, p: number, n: number) => mod(i - p + n / 2, n) - n / 2;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export type CircularNavProps = {
  items: NavItem[];
  variant?: "overlay" | "section";
  captureWheel?: boolean;
  onActiveChange?: (index: number) => void;
  onSelect?: (index: number) => void;
  initialIndex?: number;
  ariaLabel?: string;
  /** spoken template for the live region, e.g. (item, i, n) => `${item.marker} ${item.label}, ${i + 1} of ${n}` */
  announce?: (item: NavItem, index: number, total: number) => string;
  className?: string;
};

export function CircularNav({
  items,
  variant = "section",
  captureWheel = false,
  onActiveChange,
  onSelect,
  initialIndex = 0,
  ariaLabel = "Navigation dial",
  announce = (item, i, n) => `${item.marker ?? ""} ${item.label}, ${i + 1} of ${n}`.trim(),
  className,
}: CircularNavProps) {
  const n = items.length;
  const uid = useId();
  const reduced = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<Geometry>({ w: 0, h: 0, compact: false });
  const pos = useMotionValue(n ? mod(initialIndex, n) : 0);
  const [active, setActive] = useState(n ? mod(initialIndex, n) : 0);
  const activeRef = useRef(active);
  const anim = useRef<AnimationPlaybackControls | null>(null);
  const interacting = useRef(false);

  // ── geometry ────────────────────────────────────────────────
  useIsoLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setGeom((g) =>
        Math.round(g.w) === Math.round(width) && Math.round(g.h) === Math.round(height)
          ? g
          : { w: width, h: height, compact: width < WHEEL.compactBelow },
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cfg = geom.compact ? WHEEL.compact : WHEEL.desktop;
  const R = cfg.radius * geom.h;
  const stepRad = (cfg.stepDeg * Math.PI) / 180;
  const pxPerStep = Math.max(1, R * stepRad);

  // ── active index (re-render only when it changes) ───────────
  useMotionValueEvent(pos, "change", (p) => {
    if (!n) return;
    const idx = mod(Math.round(p), n);
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
      onActiveChange?.(idx);
      if (interacting.current && typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate?.(8);
        } catch {
          /* not allowed */
        }
      }
    }
  });

  const settleTo = useCallback(
    (target: number, velocity = 0) => {
      anim.current?.stop();
      const controls = reduced
        ? animate(pos, target, { duration: 0.15, ease: "easeOut" })
        : animate(pos, target, { type: "spring", ...WHEEL.spring, velocity });
      anim.current = controls;
      controls.then(() => {
        if (anim.current !== controls) return;
        interacting.current = false;
        if (n) onSelect?.(mod(Math.round(target), n));
      });
    },
    [n, onSelect, pos, reduced],
  );

  /** rotate to item i the shortest way around */
  const goTo = useCallback(
    (i: number) => {
      if (!n) return;
      interacting.current = true;
      const p = pos.get();
      settleTo(Math.round(p) + Math.round(delta(i, Math.round(p), n)));
    },
    [n, pos, settleTo],
  );

  // ── drag / swipe with inertia ───────────────────────────────
  const drag = useRef<{ id: number; y: number; start: number; moved: boolean; samples: { t: number; y: number }[] } | null>(null);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!n || (e.pointerType === "mouse" && e.button !== 0)) return;
    anim.current?.stop();
    interacting.current = true;
    drag.current = { id: e.pointerId, y: e.clientY, start: pos.get(), moved: false, samples: [{ t: e.timeStamp, y: e.clientY }] };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dy = e.clientY - d.y;
    if (Math.abs(dy) > 4) d.moved = true;
    pos.set(d.start - dy / pxPerStep);
    d.samples.push({ t: e.timeStamp, y: e.clientY });
    if (d.samples.length > 6) d.samples.shift();
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);

    if (!d.moved) {
      // a tap: rotate to the tapped item
      const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-index]");
      const idx = hit ? Number(hit.dataset.index) : NaN;
      if (Number.isFinite(idx)) goTo(idx);
      else settleTo(Math.round(pos.get()));
      return;
    }
    const first = d.samples[0]!;
    const last = d.samples[d.samples.length - 1]!;
    const dt = Math.max(1, last.t - first.t) / 1000;
    const velocity = -((last.y - first.y) / dt) / pxPerStep; // index units / s
    const projected = pos.get() + velocity * WHEEL.inertia;
    settleTo(Math.round(projected), velocity);
  };

  // ── keyboard ────────────────────────────────────────────────
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!n) return;
    const current = activeRef.current;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = current + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = current - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(current);
      return;
    }
    if (next === null) return;
    e.preventDefault();
    interacting.current = true;
    if (e.key === "Home" || e.key === "End") goTo(mod(next, n));
    else settleTo(Math.round(pos.get()) + (next - current));
  };

  // ── optional wheel capture (off by default: never hijack page scroll) ──
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !captureWheel || !n) return;
    let timer: number | undefined;
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault();
      anim.current?.stop();
      interacting.current = true;
      pos.set(pos.get() + ev.deltaY / pxPerStep);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        settleTo(Math.round(pos.get()));
      }, 120);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(timer);
    };
  }, [captureWheel, n, pos, pxPerStep, settleTo]);

  useEffect(() => () => anim.current?.stop(), []);

  if (!n) return null;

  const activeItem = items[active]!;
  const ax = cfg.activeX * geom.w;
  const cx = ax - R;
  const cy = geom.h / 2;
  const ready = geom.w > 0 && geom.h > 0;
  const geomKey = `${Math.round(geom.w)}x${Math.round(geom.h)}`;
  const optionId = (i: number) => `${uid}-opt-${i}`;

  return (
    <div className={`${styles.root} ${className ?? ""}`} data-variant={variant} data-compact={geom.compact || undefined}>
      <div
        ref={stageRef}
        className={styles.stage}
        role="listbox"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-activedescendant={optionId(active)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {ready ? (
          <>
            <svg className={styles.arc} width={geom.w} height={geom.h} aria-hidden="true">
              <motion.path
                key={geomKey}
                d={`M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx} ${cy + R}`}
                fill="none"
                stroke="var(--cn-line)"
                strokeWidth={1}
                initial={{ pathLength: reduced ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduced ? 0 : 1.2, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            {items.map((item, i) => (
              <WheelItem
                key={`${item.id}-${geomKey}`}
                id={optionId(i)}
                item={item}
                index={i}
                total={n}
                pos={pos}
                cx={cx}
                cy={cy}
                R={R}
                stepRad={stepRad}
                compact={geom.compact}
                selected={i === active}
              />
            ))}
          </>
        ) : null}
      </div>
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announce(activeItem, active, n)}
      </p>
    </div>
  );
}

function WheelItem({
  id,
  item,
  index,
  total,
  pos,
  cx,
  cy,
  R,
  stepRad,
  compact,
  selected,
}: {
  id: string;
  item: NavItem;
  index: number;
  total: number;
  pos: MotionValue<number>;
  cx: number;
  cy: number;
  R: number;
  stepRad: number;
  compact: boolean;
  selected: boolean;
}) {
  const d = useTransform(pos, (p) => delta(index, p, total));
  const x = useTransform(d, (v) => cx + R * Math.cos(v * stepRad));
  const y = useTransform(d, (v) => cy + R * Math.sin(v * stepRad));
  const rotate = useTransform(d, (v) => (v * stepRad * 180) / Math.PI);
  const scale = useTransform(d, (v) => 1 - (1 - WHEEL.minScale) * clamp01(Math.abs(v) / WHEEL.minScaleAt));
  const opacity = useTransform(d, (v) => clamp01((WHEEL.fadeOutAt - Math.abs(v)) / 1.6));
  const ink = useTransform(d, (v) => clamp01(1 - Math.abs(v)));
  const soft = useTransform(ink, (v) => 1 - v);
  const label = useTransform(d, (v) => clamp01(1 - Math.abs(v) * 1.25));

  return (
    <motion.div
      id={id}
      role="option"
      aria-selected={selected}
      data-index={index}
      className={styles.item}
      style={{ x, y, rotate, scale, opacity }}
    >
      <span className={styles.dotWrap} aria-hidden="true">
        <motion.span className={`${styles.dot} ${styles.dotSoft}`} style={{ opacity: soft }} />
        <motion.span className={`${styles.dot} ${styles.dotInk}`} style={{ opacity: ink }} />
      </span>
      <span className={styles.marker} aria-hidden="true">
        <motion.span className={styles.markerSoft} style={{ opacity: soft }}>
          {item.marker}
        </motion.span>
        <motion.span className={styles.markerInk} style={{ opacity: ink }}>
          {item.marker}
        </motion.span>
      </span>
      <motion.span className={styles.text} style={{ opacity: label }} data-compact={compact || undefined}>
        <span className={styles.label}>{item.label}</span>
        {item.description ? <span className={styles.sub}>{item.description}</span> : null}
      </motion.span>
    </motion.div>
  );
}
