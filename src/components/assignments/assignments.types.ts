/**
 * A take-home assignment, as the backend sends and accepts it.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

import type { DifficultyLevel } from "@/lib/types";

export type AssignmentOutcome = "AWAITING" | "REJECTED" | "IN_LOOP" | "INTERVIEWING";

export type Submission = "PENDING" | "IN_PROCESS" | "COMPLETED";

export type AssignmentView = {
  id: number;
  applicationId: number | null;
  /**
   * Who it is with: the linked application's company, or the record's own when unlinked.
   *
   * Only null when a record predates having one, since the backend requires it whenever there is
   * no application to read it from.
   */
  companyName: string | null;
  /** The role on that application. Null when unlinked, or never filled in. */
  jobProfile: string | null;
  dateAssigned: string | null;
  submissionBefore: string | null;
  submission: Submission;
  assignmentOutcome: AssignmentOutcome;
  difficultyLevel: DifficultyLevel;
  remarks: string | null;
};

export type AssignmentPayload = {
  applicationId?: number | null;
  /**
   * Who it is with. Required when `applicationId` is null and ignored when it is not - the
   * application is where the company lives once there is one.
   */
  companyName?: string | null;
  dateAssigned?: string | null;
  submissionBefore?: string | null;
  submission?: Submission | null;
  assignmentOutcome?: AssignmentOutcome | null;
  difficultyLevel?: DifficultyLevel | null;
  remarks?: string | null;
};

export type AssignmentListQuery = {
  applicationId?: number | null;
  standalone?: boolean;
  submission?: Submission | null;
  assignmentOutcome?: AssignmentOutcome | null;
  difficultyLevel?: DifficultyLevel | null;
  /** Which page, counting from zero. */
  page?: number;
  /** Rows on it. The backend clamps this at 100 and defaults to 10. */
  size?: number;
};
