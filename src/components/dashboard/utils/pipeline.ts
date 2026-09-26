import type { ApplicationStatus, ApplicationView } from "@/lib/types";

/** Applications counted by status, biggest bucket first. */
export function statusBreakdown(applications: ApplicationView[]): [ApplicationStatus, number][] {
  const counts = new Map<ApplicationStatus, number>();
  for (const application of applications) {
    counts.set(
      application.applicationStatus,
      (counts.get(application.applicationStatus) ?? 0) + 1,
    );
  }

  return [...counts.entries()].sort((left, right) => right[1] - left[1]);
}

/**
 * A bar's width, relative to the biggest bucket rather than the total, so a spread of small
 * counts still reads as a chart instead of six identical slivers.
 */
export function barWidth(count: number, highest: number): string {
  return `${Math.max(6, (count / highest) * 100)}%`;
}
