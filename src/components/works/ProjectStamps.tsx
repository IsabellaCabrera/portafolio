import type { Locale } from "@/i18n/config";
import { projects } from "@/content/projects";
import type { StampLayout } from "@/content/stampLayouts";
import { StampCluster } from "@/components/ui/StampCluster";

const viewLabel = { en: "view project", es: "ver proyecto" } as const;

/** A Figma stamp pile where each stamp links to its case study. */
export function ProjectStamps({
  lang,
  layout,
  label,
  className,
}: {
  lang: Locale;
  layout: StampLayout;
  label: string;
  className?: string;
}) {
  const mobileFrame = { w: layout.mobileW, h: layout.frame.h };
  return (
    <StampCluster
      className={className}
      label={label}
      frame={layout.frame}
      mobileFrame={mobileFrame}
      sizes="(max-width: 767px) 45vw, 380px"
      stamps={layout.stamps.map((s) => {
        const p = projects.find((x) => x.slug === s.project);
        return {
          src: s.src,
          alt: p ? `${p.name} — ${viewLabel[lang]}` : s.project,
          href: p ? `/${lang}/works/${p.category}/${p.slug}` : undefined,
          box: s.box,
          mobile: { ...s.box, x: s.box.x - layout.mobileCropX },
        };
      })}
    />
  );
}
