"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { switchLocalePath, type Locale } from "@/i18n/config";
import styles from "./LanguageSwitch.module.css";

/**
 * EN / ES toggle: a pill switch (checkbox) styled with the UI kit tokens.
 * Off = English, on = Spanish. Keeps the current route, query and #hash and
 * remembers the choice in a cookie.
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
    <div className={styles.wrap} data-pending={pending || undefined}>
      <span className={styles.tag} data-active={!checked} aria-hidden="true">
        {labels.en}
      </span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={`${labels.label}: Español`}
        />
        <span className={styles.knob} aria-hidden="true" />
      </label>
      <span className={styles.tag} data-active={checked} aria-hidden="true">
        {labels.es}
      </span>
    </div>
  );
}
