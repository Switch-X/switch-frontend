"use client";

import { useEffect, useState } from "react";
import { describeLocalTime } from "@/components/landing/clock.utils";

/** The reader's own time and city. `null` until mounted, so the server and first client render agree. */
export function useLocalClock(): { time: string; zone: string } | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  return now ? describeLocalTime(now) : null;
}
