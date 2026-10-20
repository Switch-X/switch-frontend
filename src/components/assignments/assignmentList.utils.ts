import { DUE_WARNING_DAYS } from "@/components/assignments/assignmentList.constants";

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
