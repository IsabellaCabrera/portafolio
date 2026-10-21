import Image from "next/image";
import Link from "next/link";
import { asset, type AssetPath } from "@/content/assets.generated";
import { place, stageStyle, type Box, type Frame } from "./stage";
import stage from "./Stage.module.css";
import styles from "./StampCluster.module.css";

export type PlacedStamp = {
  src: AssetPath;
  alt: string;
  box: Box;
  href?: string;
  /** optional placement under 768px (in mobileFrame coordinates) */
  mobile?: Box;
};

/**
 * A pile of postage stamps placed exactly as in Figma. Stamps are black &
 * white until hovered or focused, then they lift and regain their color.
 */
export function StampCluster({
  frame,
  mobileFrame,
  stamps,
  className,
  sizes = "(max-width: 767px) 50vw, 30vw",
  label,
}: {
  frame: Frame;
  mobileFrame?: Frame;
  stamps: PlacedStamp[];
  className?: string;
  sizes?: string;
  label?: string;
}) {
  return (
    <div
      className={`${stage.stage} ${styles.cluster} ${className ?? ""}`}
      style={stageStyle(frame, mobileFrame)}
      data-mobile={mobileFrame ? "" : undefined}
      role={label ? "group" : undefined}
      aria-label={label}
    >
      {stamps.map((s, i) => {
        const img = asset(s.src);
        const image = (
          <Image src={img.src} width={img.width} height={img.height} alt={s.alt} sizes={sizes} className={styles.img} />
        );
        return (
          <div
            key={`${s.src}-${i}`}
            className={`${stage.item} ${styles.slot}`}
            style={place(frame, s.box, mobileFrame && s.mobile ? { frame: mobileFrame, box: s.mobile } : undefined)}
          >
            {s.href ? (
              <Link href={s.href} className={styles.stamp}>
                {image}
              </Link>
            ) : (
              <span className={`${styles.stamp} ${styles.static}`}>{image}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
