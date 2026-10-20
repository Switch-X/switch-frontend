import type { ClockPlace } from "@/components/landing/world-clocks/worldClocks.types";

/** Three cities far enough apart that at least one is usually asleep, with a quiet window each. */
export const CLOCK_PLACES: ClockPlace[] = [
  { zone: "Asia/Kolkata", city: "Bengaluru", quiet: { start: "22:00", end: "07:30" } },
  { zone: "America/New_York", city: "New York", quiet: { start: "21:00", end: "08:00" } },
  { zone: "Australia/Sydney", city: "Sydney", quiet: { start: "23:00", end: "06:30" } },
];
