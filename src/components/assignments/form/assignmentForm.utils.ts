import { blankToNull } from "@/lib/format";
import type { AssignmentPayload, AssignmentView } from "@/components/assignments/assignments.types";
import { NEW_ASSIGNMENT } from "@/components/assignments/form/assignmentForm.constants";
import type { AssignmentFormState } from "@/components/assignments/form/assignmentForm.types";

/** The dialog's starting fields: the record being edited, or a new one's defaults. */
export function initialAssignmentForm(record: AssignmentView | null): AssignmentFormState {
  return {
    applicationId: record?.applicationId ?? null,
    // A linked task shows the application's company, which is not this field's to edit, so the
    // box starts empty for one. Unlinked, it starts from what was stored.
    companyName: record?.applicationId === null ? (record?.companyName ?? "") : "",
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
    companyName: blankToNull(form.companyName),
    dateAssigned: blankToNull(form.dateAssigned),
    submissionBefore: blankToNull(form.submissionBefore),
    submission: form.submission,
    assignmentOutcome: form.assignmentOutcome,
    difficultyLevel: form.difficultyLevel,
    remarks: blankToNull(form.remarks),
  };
}
