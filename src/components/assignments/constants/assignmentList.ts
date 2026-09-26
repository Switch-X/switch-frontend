import type { AssignmentFilterState } from "@/components/assignments/types/assignmentList";

export const INITIAL_FILTERS: AssignmentFilterState = {
  submission: null,
  assignmentOutcome: null,
  difficultyLevel: null,
  standalone: false,
};

export const ASSIGNMENT_COLUMNS = [
  "Application",
  "Submission",
  "Outcome",
  "Difficulty",
  "Assigned",
  "Due",
] as const;

/** Outstanding work due this many days out, or closer, turns amber. */
export const DUE_WARNING_DAYS = 2;
