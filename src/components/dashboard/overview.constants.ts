import type { ApplicationStatus } from "@/components/applications/applications.types";

/**
 * How many rows the overview fetches from each list: one page, sized to cover a realistic
 * account rather than the ten a list screen shows.
 *
 * <p>The overview reads the records themselves - it counts them, buckets them by status and works
 * out what is due - so it cannot use the lighter `options` call that the pickers use, and it
 * cannot use a list screen's page size either: every number on it would then be a number about
 * ten records. The counts that have to be right read `totalElements` instead, which the server
 * sends for the whole match.
 */
export const OVERVIEW_PAGE_SIZE = 50;

/** Statuses that mean the application is still alive and worth counting as "in flight". */
export const ACTIVE_STATUSES: ReadonlySet<ApplicationStatus> = new Set<ApplicationStatus>([
  "APPLIED",
  "SCREENING_CALL_RECEIVED",
  "ASSIGNMENT_RECEIVED",
  "INTERVIEWING",
  "HOLD",
]);

/** How far ahead "Needs you this week" looks, in days. Anything already overdue stays on it. */
export const DUE_SOON_WINDOW_DAYS = 7;

/** Rows under "Coming up". */
export const UPCOMING_INTERVIEWS_SHOWN = 5;

/** Rows under "Latest movement". */
export const RECENT_ACTIVITY_SHOWN = 6;
