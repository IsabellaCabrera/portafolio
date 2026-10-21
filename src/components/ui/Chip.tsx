import styles from "./Chip.module.css";

/** Figma "Chip": Afacad Medium 18, teal 1px outline, pill radius, 19/10 padding. */
export function Chip({ children }: { children: React.ReactNode }) {
  return <span className={styles.chip}>{children}</span>;
}

export function ChipList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
