import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/dictionary";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./SiteHeader.module.css";

export type NavKey = "home" | "works" | "about" | "contact";

/**
 * Navbar from Figma ("Navbar", 916×39 at y=59): Home · Works · logo · About · Contact.
 * Positioned over the page so full-bleed sections (the home map) run behind it.
 */
export function SiteHeader({ lang, dict, current }: { lang: Locale; dict: Dictionary; current?: NavKey }) {
  const link = (key: NavKey, href: string) => (
    <Link href={href} className={styles.link} aria-current={current === key ? "page" : undefined}>
      {dict.nav[key]}
    </Link>
  );
  return (
    <header className={styles.header}>
      <a href="#content" className={styles.skip}>
        {dict.common.skipToContent}
      </a>
      <nav className={styles.nav} aria-label={dict.nav.label}>
        {link("home", `/${lang}?map=1`)}
        {link("works", `/${lang}/works`)}
        <Link href={`/${lang}?map=1`} className={styles.logo} aria-label="Isabella Cabrera Sogamoso — home">
          <Logo />
        </Link>
        {link("about", `/${lang}/about`)}
        {link("contact", "#contact")}
      </nav>
      <div className={styles.lang}>
        <LanguageSwitch lang={lang} labels={dict.lang} />
      </div>
    </header>
  );
}
