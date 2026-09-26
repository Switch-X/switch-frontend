import { daysUntil } from "@/lib/format";
import type { AssignmentView } from "@/lib/types";
import { DUE_WARNING_DAYS } from "@/components/assignments/constants/assignmentList";

/**
 * Soonest deadline first, undated last - the order someone with three open take-homes needs,
 * and the one sort the assignments endpoint does not offer server-side.
 *
 * <p>`daysUntil` is null for a row with no deadline, which would sort as 0 and jump those rows to
 * the middle of the list, so the nulls are placed explicitly.
 */
export function sortBySubmissionDeadline(assignments: AssignmentView[]): AssignmentView[] {
  return [...assignments].sort((left, right) => {
    const a = daysUntil(left.submissionBefore);
    const b = daysUntil(right.submissionBefore);
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    return a - b;
  });
}

/**
 * The colour of a due date. An overdue deadline only matters while the work is still
 * outstanding - once it has been submitted, the date is history and goes grey.
 */
export function dueTone(days: number | null, outstanding: boolean): string {
  if (!outstanding) return "text-ink-subtle";
  if (days !== null && days < 0) return "text-bad";
  if (days !== null && days <= DUE_WARNING_DAYS) return "text-warn";
  return "text-ink-muted";
}
