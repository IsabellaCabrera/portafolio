"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { switchLocalePath, type Locale } from "@/i18n/config";
import styles from "./LanguageSwitch.module.css";

/**
 * Eng / Esp switch (the toggle from the earlier "Home / 02 Scroll" frame:
 * a recessed two-position switch with an indicator light on each side).
 * Keeps the current route and scroll target, remembers the choice in a cookie.
 */
export function LanguageSwitch({
  lang,
  labels,
}: {
  lang: Locale;
  labels: { label: string; en: string; es: string; switchTo: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = lang === "en" ? "es" : "en";

  const toggle = () => {
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const search = typeof window !== "undefined" ? window.location.search : "";
    startTransition(() => router.push(`${switchLocalePath(pathname, next)}${search}${hash}`, { scroll: false }));
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lang === "es"}
      aria-label={`${labels.label}: ${lang === "en" ? "English" : "Español"}. ${labels.switchTo}`}
      onClick={toggle}
      className={styles.switch}
      data-lang={lang}
      data-pending={pending || undefined}
    >
      <span className={styles.led} data-on={lang === "en"} aria-hidden="true" />
      <span className={styles.track} aria-hidden="true">
        <span className={styles.knob} />
        <span className={styles.option} data-active={lang === "en"}>
          {labels.en}
        </span>
        <span className={styles.option} data-active={lang === "es"}>
          {labels.es}
        </span>
      </span>
      <span className={styles.led} data-on={lang === "es"} aria-hidden="true" />
    </button>
  );
}
