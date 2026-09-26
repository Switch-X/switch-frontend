import { blankToNull } from "@/lib/format";
import type { AssignmentPayload, AssignmentView } from "@/lib/types";
import { NEW_ASSIGNMENT } from "@/components/assignments/constants/assignmentForm";
import type { AssignmentFormState } from "@/components/assignments/types/assignmentForm";

/** The dialog's starting fields: the record being edited, or a new one's defaults. */
export function initialAssignmentForm(record: AssignmentView | null): AssignmentFormState {
  return {
    applicationId: record?.applicationId ?? null,
    dateAssigned: record?.dateAssigned ?? "",
    submissionBefore: record?.submissionBefore ?? "",
    submission: record?.submission ?? NEW_ASSIGNMENT.submission,
    assignmentOutcome: record?.assignmentOutcome ?? NEW_ASSIGNMENT.assignmentOutcome,
    difficultyLevel: record?.difficultyLevel ?? NEW_ASSIGNMENT.difficultyLevel,
    remarks: record?.remarks ?? "",
  };
}

/** The fields as the backend's create and update body - the same shape for both. */
export function toAssignmentPayload(form: AssignmentFormState): AssignmentPayload {
  return {
    applicationId: form.applicationId,
    dateAssigned: blankToNull(form.dateAssigned),
    submissionBefore: blankToNull(form.submissionBefore),
    submission: form.submission,
    assignmentOutcome: form.assignmentOutcome,
    difficultyLevel: form.difficultyLevel,
    remarks: blankToNull(form.remarks),
  };
}
