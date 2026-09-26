"use client";

import { useEffect, useState } from "react";
import { greetingFor } from "@/lib/format";

/**
 * "Good morning" and the rest, for the account's own zone.
 *
 * <p>Starts as a plain "Hello" so the prerendered markup and the first client render agree, then
 * upgrades to the time-aware version once we are on the client and can read the clock.
 */
export function useGreeting(timezone: string | null): string {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(greetingFor(timezone));
  }, [timezone]);

  return greeting;
}
