import { ASSIGNMENT_OUTCOME, DIFFICULTY, SUBMISSION, describe } from "@/lib/enums";
import { daysUntil, formatDateShort } from "@/lib/format";
import type { AssignmentView } from "@/components/assignments/assignments.types";
import { Badge } from "@/components/ui/display/Badge";
import { DataTableRow } from "@/components/shared/list/DataTable";
import { DueDate } from "@/components/shared/list/DueDate";
import { RowActions } from "@/components/shared/list/RowActions";
import { dueTone } from "@/components/assignments/assignmentList.utils";

export function AssignmentRow({
  assignment,
  company,
  onEdit,
  onDelete,
}: {
  assignment: AssignmentView;
  company: string;
  onEdit: (assignment: AssignmentView) => void;
  onDelete: (assignment: AssignmentView) => void;
}) {
  const submission = describe(SUBMISSION, assignment.submission);
  const outcome = describe(ASSIGNMENT_OUTCOME, assignment.assignmentOutcome);
  const difficulty = describe(DIFFICULTY, assignment.difficultyLevel);

  return (
    <DataTableRow>
      <td className="px-5 py-3.5">
        <div className="font-medium text-ink">{company}</div>
        {assignment.remarks && (
          <div className="mt-0.5 max-w-md truncate text-xs text-ink-subtle">{assignment.remarks}</div>
        )}
      </td>
      <td className="px-3 py-3.5">
        <Badge tone={submission.tone}>{submission.label}</Badge>
      </td>
      <td className="px-3 py-3.5">
        <Badge tone={outcome.tone}>{outcome.label}</Badge>
      </td>
      <td className="px-3 py-3.5">
        <Badge tone={difficulty.tone}>{difficulty.label}</Badge>
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap text-ink-muted">
        {formatDateShort(assignment.dateAssigned)}
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap">
        <DueDate
          date={assignment.submissionBefore}
          tone={dueTone(
            daysUntil(assignment.submissionBefore),
            assignment.submission !== "COMPLETED",
          )}
        />
      </td>
      <RowActions onEdit={() => onEdit(assignment)} onDelete={() => onDelete(assignment)} />
    </DataTableRow>
  );
}
