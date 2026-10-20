/**
 * An interview and its rounds, as the backend sends and accepts them.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

import type { DifficultyLevel, ProceedingVia } from "@/lib/types";

export type InterviewOutcome = "AWAITED" | "REJECTED" | "CLEARED" | "RESCHEDULED";

export type InterviewType = "ONLINE" | "ONSITE" | "ON_CALL";

export type InterviewRoundView = {
  roundId: number;
  interviewerName: string | null;
  interviewerEmail: string | null;
  feedbackFromInterviewer: string | null;
  remarks: string | null;
  scheduledAt: string | null;
  durationInMinutes: number;
  difficultyLevel: DifficultyLevel;
  interviewType: InterviewType;
  interviewOutcome: InterviewOutcome;
  rejectionReasons: string[];
  questionsAsked: string[];
};

export type InterviewView = {
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
  interviewDate: string | null;
  /** How many rounds the company said there would be. Can be fewer than `rounds.length`. */
  expectedTotalRounds: number;
  interviewProceedingVia: ProceedingVia;
  rounds: InterviewRoundView[];
};

export type InterviewRoundPayload = {
  interviewerName?: string | null;
  interviewerEmail?: string | null;
  feedbackFromInterviewer?: string | null;
  remarks?: string | null;
  scheduledAt?: string | null;
  durationInMinutes: number;
  difficultyLevel?: DifficultyLevel | null;
  interviewType?: InterviewType | null;
  interviewOutcome?: InterviewOutcome | null;
  rejectionReasons?: string[];
  questionsAsked?: string[];
};

export type CreateInterviewPayload = {
  applicationId?: number | null;
  /**
   * Who it is with. Required when `applicationId` is null and ignored when it is not - the
   * application is where the company lives once there is one.
   */
  companyName?: string | null;
  interviewDate?: string | null;
  interviewProceedingVia?: ProceedingVia | null;
  /** 1-20. Null lets the backend use its default of 4. */
  expectedTotalRounds?: number | null;
  rounds?: InterviewRoundPayload[];
};

/** Rounds are deliberately absent: the backend edits them through their own endpoints. */
export type UpdateInterviewPayload = {
  applicationId?: number | null;
  /**
   * Who it is with. Required when `applicationId` is null and ignored when it is not - the
   * application is where the company lives once there is one.
   */
  companyName?: string | null;
  interviewDate?: string | null;
  interviewProceedingVia: ProceedingVia;
  /** 1-20. Null keeps the value already stored - unlike the other fields, which reset. */
  expectedTotalRounds?: number | null;
};

export type InterviewListQuery = {
  applicationId?: number | null;
  standalone?: boolean;
  interviewProceedingVia?: ProceedingVia | null;
  roundOutcome?: InterviewOutcome | null;
  /** Which page, counting from zero. */
  page?: number;
  /** Rows on it. The backend clamps this at 100 and defaults to 10. */
  size?: number;
};
