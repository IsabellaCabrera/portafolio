"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import type { Locale } from "@/i18n/config";
import { asset } from "@/content/assets.generated";
import { homeCopy } from "@/content/home";
import { place, stageStyle, type Box, type Frame } from "@/components/ui/stage";
import { EntranceSign } from "./EntranceSign";
import stage from "@/components/ui/Stage.module.css";
import styles from "./HomeExperience.module.css";

/*
 * Figma: "Home / 01 Entrance" → click the sign → "Home / 02 Scroll".
 * Clicking a stamp plays "Home / 03 Active" (the stamp turns to color while
 * everything else blurs) and then navigates.
 */

const FRAME: Frame = { w: 1440, h: 1024 };
const MOBILE: Frame = { w: 390, h: 900 };

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const ENTERED_KEY = "creative-city:entered";
const FOCUS_MS = 820;

type Phase = "entrance" | "entering" | "map";
type StampId = "product-design" | "branding" | "about";

const boxes = {
  title: { x: 430, y: 385, w: 710, h: 310 } satisfies Box,
  photo: { x: 620, y: 604, w: 200.306, h: 220.78 } satisfies Box,
  postcard: { x: 1060, y: 825.474, w: 329.338, h: 200.8, m: [0.84, -0.542, 0.542, 0.84] } satisfies Box,
  sign: { x: 363, y: 381, w: 713.097, h: 255 } satisfies Box,
};

const mobileBoxes = {
  title: { x: 15, y: 150, w: 360, h: 157 } satisfies Box,
  photo: { x: 128, y: 330, w: 134, h: 148 } satisfies Box,
  postcard: { x: 205, y: 800, w: 172, h: 105, m: [0.84, -0.542, 0.542, 0.84] } satisfies Box,
  sign: { x: 20, y: 330, w: 350, h: 125 } satisfies Box,
};

const stamps: { id: StampId; src: "/assets/home/stamp-product-design.webp" | "/assets/home/stamp-branding.webp" | "/assets/home/stamp-about-me.webp"; path: string; box: Box; mobile: Box }[] = [
  {
    id: "product-design",
    src: "/assets/home/stamp-product-design.webp",
    path: "/works/product-design",
    // exported already rotated: placed at its render bounds
    box: { x: 233, y: 252, w: 220, h: 228 },
    mobile: { x: 18, y: 495, w: 150, h: 155 },
  },
  {
    id: "branding",
    src: "/assets/home/stamp-branding.webp",
    path: "/works/branding",
    box: { x: 278.527, y: 674.833, w: 221.648, h: 159.856, m: [0.894, 0.448, -0.448, 0.894] },
    mobile: { x: 84, y: 690, w: 170, h: 122.6, m: [0.894, 0.448, -0.448, 0.894] },
  },
  {
    id: "about",
    src: "/assets/home/stamp-about-me.webp",
    path: "/about",
    box: { x: 1039.227, y: 283.22, w: 154.56, h: 207, m: [0.828, -0.561, 0.561, 0.828] },
    mobile: { x: 200, y: 532, w: 112, h: 150, m: [0.828, -0.561, 0.561, 0.828] },
  },
];

/* Entrance glass-block grid (Figma "Decor / Block grid"): 5 columns × 4 rows */
const COLS = [0, 288, 576, 864, 1152];
const ROWS: [number, number][] = [
  [0, 221],
  [221, 288],
  [509, 288],
  [797, 227],
];
const DOTS: [number, number][] = [
  [174, 732], [838, 964], [1247, 324], [393, 571], [914, 144], [1367, 30], [375, 206], [42, 78], [1302, 787],
];

export function HomeExperience({ lang }: { lang: Locale }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("entrance");
  const [focused, setFocused] = useState<StampId | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const reduced = useRef(false);

  // Skip the entrance when coming back (Home link adds ?map=1) or later in the session.
  useIsoLayoutEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let entered = false;
    try {
      entered = sessionStorage.getItem(ENTERED_KEY) === "1";
    } catch {
      /* storage blocked */
    }
    if (entered || new URLSearchParams(window.location.search).has("map")) setPhase("map");
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const enter = useCallback(() => {
    try {
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch {
      /* storage blocked */
    }
    if (reduced.current) {
      setPhase("map");
      return;
    }
    setPhase("entering");
    timer.current = window.setTimeout(() => setPhase("map"), 1400);
  }, []);

  const go = useCallback(
    (id: StampId | null, href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      if (focused) return;
      if (id === null) {
        router.push(href);
        return;
      }
      setFocused(id);
      timer.current = window.setTimeout(() => router.push(href), reduced.current ? 120 : FOCUS_MS);
    },
    [focused, router],
  );

  const map = asset("/assets/home/map.webp");
  const blocks = asset("/assets/entrance/blocks.webp");
  const photo = asset("/assets/home/photo-isa.webp");
  const postcard = asset("/assets/home/postcard.webp");

  const sm = (box: Box, mobile: Box) => place(FRAME, box, { frame: MOBILE, box: mobile });

  return (
    <section
      className={`${stage.stage} ${styles.stage}`}
      style={stageStyle(FRAME, MOBILE)}
      data-mobile=""
      data-phase={phase}
      data-focus={focused ?? undefined}
      aria-label={homeCopy.mapLabel[lang]}
    >
      <div className={`${styles.map} ${styles.blurrable}`} aria-hidden="true">
        <Image src={map.src} alt="" fill priority sizes="100vw" className={styles.mapImg} />
      </div>

      {/* "welcome to my creative city." */}
      <div className={`${stage.item} ${styles.title} ${styles.blurrable}`} style={sm(boxes.title, mobileBoxes.title)}>
        <h1 className={styles.titleInner}>
          <span className={styles.welcome}>{homeCopy.welcome[lang]}</span>
          <span className={styles.toMy}>{homeCopy.toMy[lang]}</span>
          <span className={styles.city} data-lang={lang}>
            {homeCopy.city[lang]}
          </span>
        </h1>
      </div>

      {/* Photo with tape → About */}
      <div className={`${stage.item} ${styles.photo} ${styles.blurrable}`} style={sm(boxes.photo, mobileBoxes.photo)}>
        <Link href={`/${lang}/about`} className={styles.photoLink} onClick={go(null, `/${lang}/about`)} tabIndex={phase === "map" ? 0 : -1}>
          <Image src={photo.src} width={photo.width} height={photo.height} alt={homeCopy.photoAlt[lang]} sizes="(max-width: 767px) 40vw, 200px" priority />
        </Link>
      </div>

      {/* Decorative postcard */}
      <div className={`${stage.item} ${styles.postcard} ${styles.blurrable} ${styles.reveal}`} style={sm(boxes.postcard, mobileBoxes.postcard)}>
        <Image src={postcard.src} width={postcard.width} height={postcard.height} alt={homeCopy.postcardAlt[lang]} sizes="(max-width: 767px) 50vw, 330px" />
      </div>

      {/* Stamps: B/W → color on hover; click = focus then navigate */}
      {stamps.map((s, i) => {
        const img = asset(s.src);
        const href = `/${lang}${s.path}`;
        return (
          <div
            key={s.id}
            className={`${stage.item} ${styles.stampSlot} ${styles.reveal}`}
            style={{ ...sm(s.box, s.mobile), ["--i" as string]: i } as CSSProperties}
            data-active={focused === s.id || undefined}
          >
            <Link href={href} className={styles.stamp} onClick={go(s.id, href)} tabIndex={phase === "map" ? 0 : -1}>
              <Image src={img.src} width={img.width} height={img.height} alt={homeCopy.stamps[s.id][lang]} sizes="(max-width: 767px) 40vw, 250px" className={styles.stampImg} />
            </Link>
          </div>
        );
      })}

      {/* ── Entrance layer ───────────────────────────────────────── */}
      {phase !== "map" ? (
        <div className={styles.entrance} aria-hidden={phase === "entering"}>
          {DOTS.map(([x, y], i) => (
            <span
              key={i}
              className={`${stage.item} ${styles.dot}`}
              style={place(FRAME, { x, y, w: 24, h: 24 }, { frame: MOBILE, box: { x: (x / 1440) * 390, y: (y / 1024) * 900, w: 12, h: 12 } })}
            />
          ))}
          <div className={styles.blocks} aria-hidden="true">
            {ROWS.map(([y, h], r) =>
              COLS.map((x, c) => (
                <span
                  key={`${r}-${c}`}
                  className={styles.block}
                  style={
                    {
                      left: `${(x / 1440) * 100}%`,
                      top: `${(y / 1024) * 100}%`,
                      width: `${(288 / 1440) * 100}%`,
                      height: `${(h / 1024) * 100}%`,
                      backgroundImage: `url(${blocks.src})`,
                      backgroundSize: `${(1440 / 288) * 100}% ${(1024 / h) * 100}%`,
                      backgroundPosition: `${(x / 1152) * 100}% ${(y / (1024 - h)) * 100}%`,
                      ["--d" as string]: `${Math.abs(c - 2) * 70 + Math.abs(r - 1.5) * 60}ms`,
                      ["--dx" as string]: `${(c - 2) * 14}%`,
                      ["--dy" as string]: `${(r - 1.5) * 18 + 30}%`,
                    } as CSSProperties
                  }
                />
              )),
            )}
          </div>
          <div className={`${stage.item} ${styles.signSlot}`} style={sm(boxes.sign, mobileBoxes.sign)}>
            <EntranceSign label={homeCopy.sign[lang]} ariaLabel={homeCopy.enter[lang]} onEnter={enter} disabled={phase !== "entrance"} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
