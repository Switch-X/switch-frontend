import type { ClockPlace } from "@/components/landing/types/worldClocks";

/** The three demo accounts' cities, with the quiet hours each one keeps. */
export const CLOCK_PLACES: ClockPlace[] = [
  { zone: "Asia/Kolkata", person: "Mohit", city: "Bengaluru", quiet: { start: "22:00", end: "07:30" } },
  { zone: "America/New_York", person: "Sara", city: "New York", quiet: { start: "21:00", end: "08:00" } },
  { zone: "Australia/Sydney", person: "Kenji", city: "Sydney", quiet: { start: "23:00", end: "06:30" } },
];
