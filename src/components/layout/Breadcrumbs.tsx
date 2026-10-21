import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { label: string; href?: string };

/**
 * Figma breadcrumb row (y=144): optional teal back arrow at x=124, then
 * "Home  section  current" in Body/S, muted gray. The last item is the
 * current page and is not a link.
 */
export function Breadcrumbs({
  items,
  backHref,
  backLabel,
  label,
}: {
  items: Crumb[];
  backHref?: string;
  backLabel: string;
  label: string;
}) {
  return (
    <nav className={styles.wrap} aria-label={label}>
      {backHref ? (
        <Link href={backHref} className={styles.back} aria-label={backLabel}>
          <svg viewBox="0 0 63 52" aria-hidden="true">
            <path
              fill="currentColor"
              d="M59.5 29.2734C61.433 29.2734 63 27.7064 63 25.7734C63 23.8404 61.433 22.2734 59.5 22.2734V25.7734V29.2734ZM59.5 25.7734V22.2734L3.5 22.2734V25.7734V29.2734L59.5 29.2734V25.7734ZM1.02513 23.2986C-0.341709 24.6654 -0.341709 26.8815 1.02513 28.2483L23.299 50.5222C24.6658 51.889 26.8819 51.889 28.2487 50.5222C29.6156 49.1553 29.6156 46.9393 28.2487 45.5724L8.44975 25.7734L28.2487 5.97445C29.6156 4.60761 29.6156 2.39153 28.2487 1.0247C26.8819 -0.342134 24.6658 -0.342134 23.299 1.0247L1.02513 23.2986Z"
            />
          </svg>
        </Link>
      ) : (
        <span className={styles.backSpacer} aria-hidden="true" />
      )}
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className={styles.item}>
              {item.href && !last ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? styles.current : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
