"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { asset } from "@/content/assets.generated";
import { aboutCopy, aboutViews, type AboutView } from "@/content/about";
import { ExperienceWheel } from "@/components/circular-nav/ExperienceWheel";
import type { ParsedExperienceFile } from "@/components/circular-nav/experiences";
import { LocalTime } from "./LocalTime";
import styles from "./AboutExperience.module.css";

/*
 * Figma "About / 01 Intro → 04 Passions": one page, four states. Each sign on
 * the post is a button (Figma "Decor / Squiggle 01–03" + "Decor / Sign shape")
 * that swaps the panel with a cross-fade.
 */

type Hotspot = { view: AboutView; x: number; y: number; w: number; h: number; z: number };

/** Hit areas in the 450×823 sign-post image (from the Figma squiggles). */
const HOTSPOTS: Hotspot[] = [
  { view: "skillsets", x: 48, y: 46, w: 383, h: 236, z: 1 },
  { view: "intro", x: 89, y: 262, w: 331, h: 300, z: 2 },
  { view: "experiences", x: 150, y: 560, w: 218, h: 92, z: 3 },
  { view: "passions", x: 158, y: 652, w: 208, h: 70, z: 4 },
];

export function AboutExperience({
  lang,
  experiences,
  passions,
}: {
  lang: Locale;
  experiences: ParsedExperienceFile;
  passions: ParsedExperienceFile;
}) {
  const [view, setView] = useState<AboutView>("intro");
  const reduced = useReducedMotion() ?? false;
  const post = asset("/assets/about/sign-post.webp");
  const c = aboutCopy;

  // Deep links: /about#skillsets, #experiences, #passions
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as AboutView;
      if (aboutViews.includes(h)) setView(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const choose = useCallback((v: AboutView) => {
    setView(v);
    const hash = v === "intro" ? " " : `#${v}`;
    window.history.replaceState(null, "", hash === " " ? window.location.pathname + window.location.search : hash);
  }, []);

  const fade = {
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduced ? 0 : -12 },
    transition: { duration: reduced ? 0.12 : 0.35, ease: [0.2, 0.8, 0.2, 1] as const },
  };

  return (
    <div className={styles.card} data-view={view}>
      <div className={styles.post}>
        <Image
          src={post.src}
          width={post.width}
          height={post.height}
          alt={c.signPostAlt[lang]}
          sizes="(max-width: 899px) 60vw, 450px"
          priority
          className={styles.postImg}
        />
        <div className={styles.hotspots} role="tablist" aria-label={c.title[lang]} aria-orientation="vertical">
          {HOTSPOTS.map((h) => (
            <button
              key={h.view}
              type="button"
              role="tab"
              id={`tab-${h.view}`}
              aria-selected={view === h.view}
              aria-controls="about-panel"
              className={styles.hotspot}
              style={{
                left: `${(h.x / 450) * 100}%`,
                top: `${(h.y / 823) * 100}%`,
                width: `${(h.w / 450) * 100}%`,
                height: `${(h.h / 823) * 100}%`,
                zIndex: h.z,
              }}
              onClick={() => choose(h.view)}
            >
              <span className="visually-hidden">{c.signs[h.view][lang]}</span>
            </button>
          ))}
        </div>
      </div>

      <p className={styles.hint} aria-hidden="true">
        {c.clickToRead[lang]}
      </p>

      <div id="about-panel" role="tabpanel" aria-labelledby={`tab-${view}`} className={styles.panel}>
        <AnimatePresence mode="wait" initial={false}>
          {view === "intro" ? (
            <motion.div key="intro" className={styles.intro} {...fade}>
              <h2 className="visually-hidden">{c.title[lang]}</h2>
              <p className={styles.row}>
                <svg viewBox="0 0 18 26" className={styles.icon} aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M8.19957 0.0270107C8.20811 0.0262373 8.21665 0.0255678 8.22518 0.0249994C8.77928 -0.00848039 9.60413 -0.0302636 10.1393 0.109064C10.5617 0.219008 11.0409 0.274473 11.4482 0.396966C12.7175 0.794069 13.8904 1.51793 14.8771 2.51312C15.7369 3.39046 16.3912 4.29183 16.9311 5.458C17.1746 5.98382 17.3739 6.37278 17.4657 6.97436C17.4813 7.07643 17.6516 7.28705 17.6767 7.43167C17.7184 7.67128 17.6912 7.90732 17.7322 8.14559C17.8803 8.49315 17.9857 8.51791 17.9866 8.94428C17.9887 9.93061 18.0292 10.94 17.9584 11.9226C17.9487 12.0584 17.769 12.2323 17.7484 12.393C17.69 12.8485 17.6949 13.1752 17.4385 13.5532C17.4052 13.6037 17.377 14.0729 17.3198 14.1979C17.1849 14.493 17.0355 14.7801 16.8907 15.0697C16.4832 15.9217 15.998 16.6321 15.454 17.3699C15.3467 17.5154 15.1235 17.7326 14.9928 17.8738C14.534 18.3786 14.0525 18.8559 13.5503 19.3035C13.076 19.727 12.6507 20.0605 12.1538 20.4496C11.9212 20.6317 11.5143 20.8921 11.3433 21.1177C10.7033 21.9615 10.3774 22.7465 10.025 23.7732C9.85163 24.2782 9.89478 24.4663 9.5709 24.8763C9.25875 25.2169 9.22658 25.2395 8.79819 25.1942C8.13074 24.5981 8.30141 24.7532 8.04407 23.9368C7.75786 23.0288 7.3647 22.0687 6.81276 21.332C6.46303 20.8652 5.88216 20.4579 5.42971 20.1043C5.14307 19.8768 4.85854 19.6459 4.57614 19.4115C4.35606 19.2324 4.19852 19.0335 3.98371 18.848C2.63947 17.6868 1.57665 16.1597 0.809014 14.4519C0.599148 13.9851 0.510228 13.3536 0.32526 12.8615C0.263651 12.6975 0.256428 12.3726 0.206324 12.1931C0.0600998 11.604 -0.0113141 11.0416 0.00145722 10.4266C0.00939742 10.0449 -0.0150928 9.62008 0.0328594 9.23975C0.126826 8.49468 0.301845 7.72938 0.497457 7.01046C0.568488 6.77866 0.613331 6.49218 0.700291 6.27118C1.65857 3.83575 3.32886 1.94065 5.45492 0.833492C5.61042 0.752514 5.8195 0.708589 5.9821 0.634136C6.48384 0.404443 6.98998 0.307537 7.51793 0.196623C7.74428 0.149127 7.97043 0.0751794 8.19957 0.0270107ZM6.81114 11.4742C7.24409 12.5148 8.19536 13.1407 9.20035 13.0463C10.5328 12.9211 11.5253 11.5875 11.4194 10.0646C11.3135 8.54171 10.1491 7.40396 8.81604 7.52084C8.01927 7.59072 7.30374 8.10454 6.90307 8.8946C6.5024 9.68463 6.46801 10.6495 6.81114 11.4742Z"
                  />
                </svg>
                <span>{c.intro.location[lang]}</span>
                <span className={styles.sep} aria-hidden="true" />
                <span>
                  {c.intro.localTime[lang]} <LocalTime locale={lang} />
                </span>
              </p>
              <p className={styles.row}>
                <svg viewBox="0 0 22 25" className={styles.icon} aria-hidden="true">
                  <path fill="currentColor" d="M10.3693 0.0200559C10.7826 0.00230618 11.2169 -0.0178306 11.6286 0.0281657C12.6237 0.139377 13.7112 0.602309 14.5399 1.18242C15.632 1.94688 16.6809 3.72887 16.9247 5.08222C17.0223 5.6242 16.995 8.39276 16.8773 8.88731C16.7792 9.29962 16.2374 10.4261 16.006 10.7762C14.8562 12.5158 13.5988 13.2107 11.6317 13.5914C11.366 13.6005 10.7176 13.6299 10.4831 13.5887C9.38376 13.3954 8.51664 13.1685 7.59829 12.5076C6.27274 11.5642 5.36405 10.1048 5.07532 8.45581C4.9752 7.8794 5.02684 7.40248 5.00735 6.85356C4.94672 5.14511 5.16648 4.01831 6.14431 2.5957C7.21395 1.03953 8.59591 0.354669 10.3693 0.0200559Z" />
                  <path fill="currentColor" d="M10.1489 16.7305C10.5682 16.6995 11.1422 16.6934 11.5748 16.7251C12.5176 16.7941 13.5054 17.0508 14.454 17.157C14.6105 17.1745 14.9544 17.4051 15.1078 17.423C16.1208 17.5408 17.0901 18.0379 18.0164 18.4592C18.2939 18.5861 18.7137 18.715 18.9733 18.8806C19.7917 19.4026 20.6609 19.92 21.3124 20.669C22.0442 21.5377 22.0285 21.658 21.9807 22.736C21.5712 23.2382 21.2767 23.8568 20.5815 24.001C20.1517 24.0901 19.7142 24.0683 19.2781 24.0685L17.697 24.0688L11.9085 24.0675L4.92082 24.0688L2.89232 24.0687C2.19103 24.0686 1.2754 24.162 0.757783 23.6566C-1.42338 21.527 1.63644 19.7225 3.24916 18.793C3.56319 18.6121 3.90692 18.5124 4.21719 18.364C5.10123 17.9411 6.01771 17.5672 6.97473 17.3841C7.18223 17.3516 7.52552 17.1595 7.71806 17.1403C8.5187 17.0606 9.36249 16.8216 10.1489 16.7305Z" />
                </svg>
                <span>{c.intro.role[lang]}</span>
              </p>
              <div className={styles.bio}>
                <p>{c.intro.p1[lang]}</p>
                <p>{c.intro.p2[lang]}</p>
              </div>
            </motion.div>
          ) : null}

          {view === "skillsets" ? (
            <motion.div key="skillsets" className={styles.skillsets} {...fade}>
              <div className={styles.skRow}>
                <ol className={styles.numbered}>
                  {c.skillsets.skills.map((s, i) => (
                    <li key={s.en}>
                      <span className={styles.num}>{String(i + 1).padStart(2, "0")}.</span> {s[lang]}
                    </li>
                  ))}
                </ol>
                <h2 className={styles.skTitle}>{c.skillsets.skillsTitle[lang]}</h2>
              </div>
              <div className={styles.skRow}>
                <h2 className={styles.skTitle}>{c.skillsets.softwareTitle[lang]}</h2>
                <ul className={styles.plain}>
                  {c.skillsets.software.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.skRow}>
                <ul className={styles.plain}>
                  {c.skillsets.languages.map((s) => (
                    <li key={s.en}>{s[lang]}</li>
                  ))}
                </ul>
                <h2 className={styles.skTitle}>{c.skillsets.languagesTitle[lang]}</h2>
              </div>
            </motion.div>
          ) : null}

          {view === "experiences" || view === "passions" ? (
            <motion.div key={view} className={styles.wheel} {...fade}>
              <h2 className="visually-hidden">{c.wheel[view][lang]}</h2>
              <ExperienceWheel
                experiences={(view === "experiences" ? experiences : passions).items}
                eyebrow={(view === "experiences" ? experiences : passions).eyebrow}
                marker="index"
                ariaLabel={`${c.wheel[view][lang]}. ${c.wheel.hint[lang]}`}
                ofLabel={c.wheel.of[lang]}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
