import type { AssignmentView } from "@/components/assignments/assignments.types";

/**
 * Where a new assignment starts.
 *
 * <p>As with applications, the update endpoint requires `submission` and `assignmentOutcome`
 * while create leaves them optional, so the form always sends both. These defaults - "Pending"
 * and "Awaiting review" - describe an assignment that has just landed, which is when someone
 * adds one.
 */
export const NEW_ASSIGNMENT: Pick<
  AssignmentView,
  "submission" | "assignmentOutcome" | "difficultyLevel"
> = {
  submission: "PENDING",
  assignmentOutcome: "AWAITING",
  difficultyLevel: "MEDIUM",
};
