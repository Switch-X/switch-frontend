/**
 * Human wording for the backend's enums, plus the colour each one reads as.
 *
 * `OFFER_REVOKED` is a fact about someone's week, and showing it in a table as
 * `OFFER_REVOKED` makes the reader do the decoding. Every enum the UI renders passes through
 * here, so the wire value stays the wire value and the screen stays readable.
 *
 * Tones are semantic rather than literal - `good`, `bad`, `warn` - so the palette can change in
 * one place without hunting for colour names in a dozen components.
 */

import type { ApplicationSort, ApplicationStatus, ReferralRequestOutcome, Source } from "@/components/applications/applications.types";
import type { AssignmentOutcome, Submission } from "@/components/assignments/assignments.types";
import type { InterviewOutcome, InterviewType } from "@/components/interviews/interviews.types";
import type { DigestMode, WorkingProfile } from "@/components/profile/user.types";
import type { ScreeningOutcome } from "@/components/screening-calls/screeningCalls.types";
import type { DifficultyLevel, ProceedingVia } from "@/lib/types";

export type Tone = "neutral" | "info" | "good" | "warn" | "bad" | "accent";

/**
 * A value the backend knows about but this table does not still has to render. Falling back to
 * the raw value with the underscores softened beats showing an empty cell.
 */
export function describe<T extends string>(
  table: Record<string, { label: string; tone: Tone }>,
  value: T | null | undefined,
): { label: string; tone: Tone } {
  if (!value) return { label: "Not set", tone: "neutral" };
  return table[value] ?? { label: titleCase(value), tone: "neutral" };
}

function titleCase(raw: string): string {
  return raw
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/* ------------------------------------------------------------ applications */

export const APPLICATION_STATUS: Record<ApplicationStatus, { label: string; tone: Tone }> = {
  NOT_APPLIED_YET: { label: "Not applied yet", tone: "neutral" },
  APPLIED: { label: "Applied", tone: "info" },
  SCREENING_CALL_RECEIVED: { label: "Screening call", tone: "accent" },
  INTERVIEWING: { label: "Interviewing", tone: "accent" },
  ASSIGNMENT_RECEIVED: { label: "Take-home received", tone: "accent" },
  HOLD: { label: "On hold", tone: "warn" },
  OFFERED: { label: "Offered", tone: "good" },
  OFFER_REVOKED: { label: "Offer revoked", tone: "bad" },
  REJECTED: { label: "Rejected", tone: "bad" },
  MISSED: { label: "Missed", tone: "bad" },
  WITHDRAWN: { label: "Withdrawn", tone: "neutral" },
};

/**
 * Where the job was found. `REFERRAL` here means a person told you about it - which is a
 * different thing from asking them to refer you, tracked separately in `REFERRAL` below. Labelled
 * "Someone I know" so the two never read as the same column.
 */
export const SOURCE: Record<Source, { label: string; tone: Tone }> = {
  LINKEDIN: { label: "LinkedIn", tone: "info" },
  CAREER_PORTAL: { label: "Career portal", tone: "info" },
  COLD_EMAIL: { label: "Cold email", tone: "neutral" },
  REFERRAL: { label: "Someone I know", tone: "info" },
  OTHERS: { label: "Other", tone: "neutral" },
};

/** Whether you asked someone at the company to refer you, and how that went. */
export const REFERRAL: Record<ReferralRequestOutcome, { label: string; tone: Tone }> = {
  REQUESTED: { label: "Requested", tone: "warn" },
  RECEIVED: { label: "Received", tone: "good" },
  REFUSED: { label: "Refused", tone: "bad" },
  SKIPPED: { label: "Not asked", tone: "neutral" },
};

export const APPLICATION_SORT: Record<ApplicationSort, { label: string; tone: Tone }> = {
  NEAREST_DEADLINE: { label: "Nearest deadline", tone: "neutral" },
  RECENT_ACTIVITY: { label: "Recent activity", tone: "neutral" },
};

/* -------------------------------------------------------------- interviews */

export const PROCEEDING_VIA: Record<ProceedingVia, { label: string; tone: Tone }> = {
  APPLIED_APPLICATION: { label: "Applied directly", tone: "info" },
  CONNECTION: { label: "Through a connection", tone: "good" },
  RECRUITER_REACH_OUT: { label: "Recruiter reached out", tone: "accent" },
};

export const INTERVIEW_OUTCOME: Record<InterviewOutcome, { label: string; tone: Tone }> = {
  AWAITED: { label: "Awaiting result", tone: "warn" },
  CLEARED: { label: "Cleared", tone: "good" },
  REJECTED: { label: "Rejected", tone: "bad" },
  RESCHEDULED: { label: "Rescheduled", tone: "neutral" },
};

export const INTERVIEW_TYPE: Record<InterviewType, { label: string; tone: Tone }> = {
  ONLINE: { label: "Online", tone: "info" },
  ONSITE: { label: "On site", tone: "accent" },
  ON_CALL: { label: "On call", tone: "neutral" },
};

/* ------------------------------------------------------------- assignments */

export const SUBMISSION: Record<Submission, { label: string; tone: Tone }> = {
  PENDING: { label: "Pending", tone: "warn" },
  IN_PROCESS: { label: "In progress", tone: "info" },
  COMPLETED: { label: "Submitted", tone: "good" },
};

export const ASSIGNMENT_OUTCOME: Record<AssignmentOutcome, { label: string; tone: Tone }> = {
  AWAITING: { label: "Awaiting review", tone: "warn" },
  IN_LOOP: { label: "Still in the loop", tone: "info" },
  INTERVIEWING: { label: "Moved to interview", tone: "good" },
  REJECTED: { label: "Rejected", tone: "bad" },
};

export const DIFFICULTY: Record<DifficultyLevel, { label: string; tone: Tone }> = {
  EASY: { label: "Easy", tone: "good" },
  MEDIUM: { label: "Medium", tone: "info" },
  HARD: { label: "Hard", tone: "warn" },
  INSANE: { label: "Brutal", tone: "bad" },
};

/* ---------------------------------------------------------- screening calls */

export const SCREENING_OUTCOME: Record<ScreeningOutcome, { label: string; tone: Tone }> = {
  AWAITED: { label: "Awaiting result", tone: "warn" },
  IN_LOOP: { label: "Still in the loop", tone: "info" },
  INTERVIEWING: { label: "Moved to interview", tone: "good" },
  ASSIGNMENT: { label: "Assignment sent", tone: "accent" },
  REJECTED: { label: "Rejected", tone: "bad" },
};

/* ------------------------------------------------------------------- user */

export const WORKING_PROFILE: Record<WorkingProfile, { label: string; tone: Tone }> = {
  FRESHER: { label: "Fresher", tone: "info" },
  PROFESSIONAL: { label: "Professional", tone: "accent" },
};

export const DIGEST_MODE: Record<DigestMode, { label: string; tone: Tone }> = {
  IMMEDIATE: { label: "Send immediately", tone: "info" },
  DIGEST: { label: "Roll into a digest", tone: "neutral" },
};

/**
 * The zones offered in the profile picker.
 *
 * A short list rather than all ~600 ids: this is a picker a person scans, and the form also
 * offers whatever the browser reports, which is right far more often than anything a dropdown
 * could guess. The backend accepts any IANA id, so nothing here is a limit on what can be stored.
 */
export const COMMON_TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Amsterdam",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Africa/Nairobi",
  "UTC",
];
