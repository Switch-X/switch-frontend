"use client";

import { useEffect, useRef } from "react";

/**
 * Writes the pointer position onto the element as `--mx` / `--my`.
 *
 * The `.spotlight` class reads those to place a radial highlight, so the card lights up under the
 * cursor. Pointer events rather than mouse events, so a stylus behaves the same; touch never
 * hovers, so it simply never fires.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${event.clientX - box.left}px`);
      element.style.setProperty("--my", `${event.clientY - box.top}px`);
    };

    element.addEventListener("pointermove", onMove);
    return () => element.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}
