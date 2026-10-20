"use client";

/**
 * Three live clocks, showing whose quiet hours are running right now.
 *
 * <p>The one piece of this page that is genuinely live rather than staged. Timezone handling is
 * the part of this backend with real thought behind it - quiet hours are stored as wall-clock
 * time against the account's own IANA zone, never normalised to UTC - and a paragraph claiming
 * that is worth far less than three clocks a visitor can check against their own watch.
 *
 * <p>Rendered empty until the first client tick. `new Date()` on the server and in the browser
 * are different moments, so painting a time during SSR guarantees a hydration mismatch.
 */

import { useEffect, useState } from "react";
import { CLOCK_PLACES } from "@/components/landing/world-clocks/worldClocks.constants";
import { ClockCard } from "./ClockCard";

export function WorldClocks() {
  const [tick, setTick] = useState<number | null>(null);

  useEffect(() => {
    setTick(Date.now());
    const timer = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {CLOCK_PLACES.map((place) => (
        // Re-rendered every tick, which is what moves the time on each card.
        <ClockCard key={place.zone} place={place} live={tick !== null} />
      ))}
    </div>
  );
}
