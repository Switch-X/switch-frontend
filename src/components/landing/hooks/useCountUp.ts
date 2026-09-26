"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/components/landing/utils/motion";

/**
 * Counts from zero to `target` once `active` turns true.
 *
 * <p>Hand-rolled on `requestAnimationFrame` rather than pulling in an animation library: the
 * smallest one is larger than the rest of this page's script put together.
 *
 * <p>Eased rather than linear, and it always lands exactly on the target rather than wherever
 * the last frame happened to fall - a stat that settles on 41 when it should say 42 is worse
 * than one that never moved.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1400): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / durationMs);
      // easeOutExpo: fast at first, then settles - reads as "arriving" rather than "sliding".
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setValue(target);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, durationMs]);

  return value;
}
