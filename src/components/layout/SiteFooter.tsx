import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { contact } from "@/content/dictionary";
import { asset } from "@/content/assets.generated";
import { Logo } from "@/components/ui/Logo";
import styles from "./SiteFooter.module.css";

/**
 * Footer from Figma frames "Footer EN" / "Footer ES": a postcard split in two.
 * Left: the message + email button. Right: postmark, stamp and the three
 * contact "address lines". 1440×616, background color/bg/footer.
 */
export function SiteFooter({ dict }: { dict: Dictionary }) {
  const f = dict.footer;
  const postmark = asset("/assets/footer/postmark.webp");
  const lines = [
    { label: f.email, value: contact.email, href: `mailto:${contact.email}`, external: false },
    { label: f.behance, value: contact.behance.label, href: contact.behance.url, external: true },
    { label: f.linkedin, value: contact.linkedin.label, href: contact.linkedin.url, external: true },
  ];

  return (
    <footer id="contact" className={styles.footer} aria-labelledby="footer-title">
      <div className={styles.card}>
        <div className={styles.message}>
          <p className={styles.script}>{f.script}</p>
          <h2 id="footer-title" className={styles.headline}>
            {f.headline[0]}
            <br />
            {f.headline[1]}
          </h2>
          <p className={styles.body}>{f.body}</p>
          <a className={styles.button} href={`mailto:${contact.email}`}>
            <span>{contact.email}</span>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.address}>
          <div className={styles.postage}>
            <Image
              src={postmark.src}
              width={postmark.width}
              height={postmark.height}
              alt={f.postmark}
              sizes="(max-width: 767px) 70vw, 412px"
              className={styles.postmark}
            />
            <div className={styles.stamp} aria-hidden="true">
              <div className={styles.stampArt}>
                <span className={styles.stampValue}>20¢</span>
                <span className={styles.stampLogo}>
                  <Logo />
                </span>
                <span className={styles.stampCountry}>{f.stampCountry}</span>
              </div>
            </div>
          </div>

          <p className={styles.to}>{f.to}</p>

          <ul className={styles.lines}>
            {lines.map((line) => (
              <li key={line.label} className={styles.line}>
                <span className={styles.label}>{line.label}</span>
                <a
                  className={styles.link}
                  href={line.href}
                  {...(line.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className={styles.linkText}>{line.value}</span>
                  {line.external ? <span className="visually-hidden"> ({f.opensNewTab})</span> : null}
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.linkIcon}>
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
