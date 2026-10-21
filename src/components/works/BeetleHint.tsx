"use client";

import { useEffect, useState } from "react";
import { DragHint } from "@/components/ui/DragHint";

export const BEETLE_LOADED = "beetle:loaded";
export const BEETLE_TOUCHED = "beetle:touched";

/**
 * Rotate hint for the category beetle, placed under the intro text.
 * Appears once the 3D model has loaded and fades after the first drag
 * (Beetle3D dispatches the window events below).
 */
export function BeetleHint({ children, className }: { children: React.ReactNode; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const onLoaded = () => setLoaded(true);
    const onTouched = () => setTouched(true);
    window.addEventListener(BEETLE_LOADED, onLoaded);
    window.addEventListener(BEETLE_TOUCHED, onTouched);
    return () => {
      window.removeEventListener(BEETLE_LOADED, onLoaded);
      window.removeEventListener(BEETLE_TOUCHED, onTouched);
    };
  }, []);

  if (!loaded) return null;
  return (
    <DragHint hidden={touched} className={className}>
      {children}
    </DragHint>
  );
}
