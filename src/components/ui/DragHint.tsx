import styles from "./DragHint.module.css";

/**
 * Chip-style hint (UI kit Chip/Label) with an animated hand, used where an
 * interaction is easy to miss (draggable stickers, rotatable beetles).
 * Fades out once `hidden` is set (after the first interaction).
 */
export function DragHint({ children, hidden, className }: { children: React.ReactNode; hidden?: boolean; className?: string }) {
  return (
    <p className={`${styles.hint} ${className ?? ""}`} data-hidden={hidden || undefined} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="22" height="22" className={styles.hand}>
        <path
          d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-.5V4a1.5 1.5 0 0 1 3 0v6m0-3.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 7-6.5 7-2.6 0-4.2-1.2-5.6-3.3L4.1 13.2a1.5 1.5 0 0 1 2.4-1.8L9 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </p>
  );
}
