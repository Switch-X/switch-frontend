import type { ScreeningCallView } from "@/lib/types";

/**
 * Most recent first, undated last.
 *
 * <p>Nothing here has a deadline - a screening call is a thing that happened, and the useful
 * question is "who called me last week". String comparison is safe on `yyyy-MM-dd`, and avoids
 * parsing a plain date into a `Date` - which would shift it a day in western timezones.
 */
export function sortByMostRecentContact(calls: ScreeningCallView[]): ScreeningCallView[] {
  return [...calls].sort((left, right) => {
    if (!left.contactedOn && !right.contactedOn) return 0;
    if (!left.contactedOn) return 1;
    if (!right.contactedOn) return -1;
    return right.contactedOn.localeCompare(left.contactedOn);
  });
}
