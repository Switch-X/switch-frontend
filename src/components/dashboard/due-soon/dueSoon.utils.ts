import { daysUntil } from "@/lib/format";
import type { ApplicationView } from "@/components/applications/applications.types";
import type { AssignmentView } from "@/components/assignments/assignments.types";
import { DUE_SOON_WINDOW_DAYS } from "@/components/dashboard/overview.constants";
import type { DueItem } from "@/components/dashboard/due-soon/dueItem.types";

/**
 * Every deadline inside the window, soonest first: applications still to be sent, and
 * assignments still to be submitted. Overdue ones stay on the list rather than dropping off it.
 */
export function dueThisWeek(
  applications: ApplicationView[],
  assignments: AssignmentView[],
): DueItem[] {
  const applicationDeadlines: DueItem[] = applications
    .filter((item) => {
      const days = daysUntil(item.applyBefore);
      // An application already submitted or closed out has nothing left to miss.
      const open = item.applicationStatus === "NOT_APPLIED_YET";
      return open && days !== null && days <= DUE_SOON_WINDOW_DAYS;
    })
    .map((item) => ({
      key: `app-${item.id}`,
      kind: "Apply before",
      title: item.companyName,
      subtitle: item.jobProfile ?? "Role not set",
      date: item.applyBefore,
      href: "/applications",
    }));

  const assignmentDeadlines: DueItem[] = assignments
    .filter((item) => {
      const days = daysUntil(item.submissionBefore);
      return item.submission !== "COMPLETED" && days !== null && days <= DUE_SOON_WINDOW_DAYS;
    })
    .map((item) => ({
      key: `assignment-${item.id}`,
      kind: "Submit before",
      title: item.companyName ?? "Take-home assignment",
      subtitle: item.remarks ?? "No notes",
      date: item.submissionBefore,
      href: "/assignments",
    }));

  return [...applicationDeadlines, ...assignmentDeadlines].sort(
    (left, right) => (daysUntil(left.date) ?? 0) - (daysUntil(right.date) ?? 0),
  );
}
