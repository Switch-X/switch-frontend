import {
  DEADLINE_SOON_DAYS,
  DEADLINE_URGENT_DAYS,
} from "@/components/applications/constants/applicationList";

/**
 * The colour of a deadline cell, so the reader does not have to compare dates: red inside
 * three days, amber inside the week, grey once it has lapsed and there is nothing left to do.
 */
export function deadlineTone(days: number | null): string {
  if (days === null) return "text-ink-muted";
  if (days < 0) return "text-ink-subtle";
  if (days <= DEADLINE_URGENT_DAYS) return "text-bad";
  if (days <= DEADLINE_SOON_DAYS) return "text-warn";
  return "text-ink-muted";
}
