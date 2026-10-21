import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/content/dictionary";
import { SiteHeader, type NavKey } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import styles from "./PageShell.module.css";

/** Navbar + page + postcard footer, shared by every route. */
export function PageShell({
  lang,
  current,
  background = "page",
  children,
}: {
  lang: Locale;
  current?: NavKey;
  background?: "page" | "about" | "home";
  children: React.ReactNode;
}) {
  const dict = getDictionary(lang);
  return (
    <div className={styles.shell} data-bg={background}>
      <SiteHeader lang={lang} dict={dict} current={current} />
      <main id="content" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <SiteFooter dict={dict} />
    </div>
  );
}
