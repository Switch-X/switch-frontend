/**
 * An application, as the backend sends and accepts it.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

export type ApplicationStatus =
  | "APPLIED"
  | "SCREENING_CALL_RECEIVED"
  | "NOT_APPLIED_YET"
  | "REJECTED"
  | "MISSED"
  | "INTERVIEWING"
  | "HOLD"
  | "ASSIGNMENT_RECEIVED"
  | "OFFER_REVOKED"
  | "OFFERED"
  | "WITHDRAWN";

export type ReferralRequestOutcome = "REQUESTED" | "SKIPPED" | "RECEIVED" | "REFUSED";

export type Source = "OTHERS" | "LINKEDIN" | "CAREER_PORTAL" | "COLD_EMAIL" | "REFERRAL";

export type ApplicationSort = "RECENT_ACTIVITY" | "NEAREST_DEADLINE";

export type ApplicationView = {
  id: number;
  companyName: string;
  jobProfile: string | null;
  jobId: string | null;
  appliedOn: string | null;
  applyBefore: string | null;
  referral: ReferralRequestOutcome | null;
  source: Source | null;
  applicationStatus: ApplicationStatus;
  lastActivity: string | null;
};

export type ApplicationPayload = {
  companyName: string;
  jobProfile?: string | null;
  jobId?: string | null;
  appliedOn?: string | null;
  applyBefore?: string | null;
  referral?: ReferralRequestOutcome | null;
  source?: Source | null;
  /** Optional on create, required on update - the update record carries `@NotNull`. */
  applicationStatus?: ApplicationStatus | null;
};

/** What kind of thing happened. See `TimelineEvent.java`. */
export type TimelineEvent =
  | "APPLICATION_CREATED"
  | "STATUS_CHANGED"
  | "SCREENING_CALL"
  | "ASSIGNMENT_RECEIVED"
  | "ASSIGNMENT_SUBMITTED"
  | "INTERVIEW_ROUND";

/** One step in an application's walkthrough. */
export type TimelineEntry = {
  id: number;
  /** When it happened - not when it was recorded. */
  happenedAt: string;
  event: TimelineEvent;
  /** The words to show beside it, for example "Round 2 of 4 - cleared". */
  detail: string | null;
  /**
   * True when only the date means anything.
   *
   * The event came from a date that was typed in, not a moment that was observed, so showing a
   * clock time beside it would be inventing one.
   */
  dayOnly: boolean;
};

/**
 * An application as something to pick from a dropdown.
 *
 * Three fields rather than the whole record - see `GET /v1/applications/options`. The forms that
 * link to an application need an id and a label, and nothing else.
 */
export type ApplicationOption = {
  id: number;
  companyName: string;
  jobProfile: string | null;
};

export type ApplicationListQuery = {
  referral?: ReferralRequestOutcome | null;
  source?: Source | null;
  applicationStatus?: ApplicationStatus | null;
  sort?: ApplicationSort | null;
  page?: number;
  size?: number;
};
