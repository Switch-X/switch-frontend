import type { AssignmentOutcome, DifficultyLevel, Submission } from "@/lib/types";

/** What the create/edit dialog holds while it is open. Text fields are "" rather than null. */
export type AssignmentFormState = {
  applicationId: number | null;
  dateAssigned: string;
  submissionBefore: string;
  submission: Submission;
  assignmentOutcome: AssignmentOutcome;
  difficultyLevel: DifficultyLevel;
  remarks: string;
};
