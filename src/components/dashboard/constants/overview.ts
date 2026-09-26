import type { ApplicationStatus } from "@/lib/types";

/** Statuses that mean the application is still alive and worth counting as "in flight". */
export const ACTIVE_STATUSES: ReadonlySet<ApplicationStatus> = new Set<ApplicationStatus>([
  "APPLIED",
  "INTERVIEWING",
  "ASSIGNMENT",
  "HOLD",
]);

/** How far ahead "Needs you this week" looks, in days. Anything already overdue stays on it. */
export const DUE_SOON_WINDOW_DAYS = 7;

/** Rows under "Coming up". */
export const UPCOMING_INTERVIEWS_SHOWN = 5;

/** Rows under "Latest movement". */
export const RECENT_ACTIVITY_SHOWN = 6;
