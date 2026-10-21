"use client";

import { useEffect, useState } from "react";

/** Current time in Cali (America/Bogota), refreshed every 20 s. Empty until mounted to avoid hydration mismatch. */
export function LocalTime({ locale }: { locale: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Bogota",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, [locale]);
  return (
    <time suppressHydrationWarning aria-live="off">
      {now}
    </time>
  );
}
