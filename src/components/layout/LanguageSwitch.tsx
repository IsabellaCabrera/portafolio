"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { switchLocalePath, type Locale } from "@/i18n/config";
import styles from "./LanguageSwitch.module.css";

/**
 * Eng / Esp toggle (Uiverse "button-3" knob toggle) styled with the UI kit:
 * the knob shows the current language and slides to the other side.
 * Off = English, on = Spanish. Keeps route, query and #hash; remembers the
 * choice in a cookie.
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
  // optimistic state so the knob moves immediately
  const [checked, setChecked] = useState(lang === "es");
  useEffect(() => setChecked(lang === "es"), [lang]);

  const onChange = (next: boolean) => {
    const to: Locale = next ? "es" : "en";
    setChecked(next);
    document.cookie = `NEXT_LOCALE=${to}; path=/; max-age=31536000; samesite=lax`;
    const { search, hash } = window.location;
    startTransition(() => router.push(`${switchLocalePath(pathname, to)}${search}${hash}`, { scroll: false }));
  };

  return (
    <span className={styles.button} data-pending={pending || undefined}>
      <input
        type="checkbox"
        role="switch"
        className={styles.checkbox}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={`${labels.label}: ${checked ? "Español" : "English"}. ${labels.switchTo}`}
      />
      <span className={styles.knob} aria-hidden="true">
        {checked ? labels.es : labels.en}
      </span>
      <span className={styles.layer} aria-hidden="true" />
    </span>
  );
}
