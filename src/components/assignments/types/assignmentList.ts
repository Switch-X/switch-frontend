import type { AssignmentOutcome, DifficultyLevel, Submission } from "@/lib/types";

/** The list's filters, keyed like `AssignmentListQuery` so they go to the API as they are. */
export type AssignmentFilterState = {
  submission: Submission | null;
  assignmentOutcome: AssignmentOutcome | null;
  difficultyLevel: DifficultyLevel | null;
  /** Only the assignments with no application behind them. */
  standalone: boolean;
};
