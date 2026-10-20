import type { AssignmentOutcome, Submission } from "@/components/assignments/assignments.types";
import type { DifficultyLevel } from "@/lib/types";

/** What the create/edit dialog holds while it is open. Text fields are "" rather than null. */
export type AssignmentFormState = {
  applicationId: number | null;
  /** Only sent when nothing is linked - see `StandaloneCompanyField`. */
  companyName: string;
  dateAssigned: string;
  submissionBefore: string;
  submission: Submission;
  assignmentOutcome: AssignmentOutcome;
  difficultyLevel: DifficultyLevel;
  remarks: string;
};
