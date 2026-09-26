"use client";

import { useEffect, useState } from "react";

/**
 * An index that steps through `count` items on a timer, looping, and holds still while `paused`.
 *
 * <p>Shared by the hero's preview and the journey. Both advance on their own so a passive reader
 * still sees every step, and both stop the moment someone is looking - a carousel that moves the
 * step you are reading is the single most irritating pattern on the web.
 */
export function useAutoAdvance(count: number, intervalMs: number, paused: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), intervalMs);
    return () => window.clearInterval(timer);
  }, [count, intervalMs, paused]);

  return [index, setIndex] as const;
}
