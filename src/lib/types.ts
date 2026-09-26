/**
 * The shapes the backend actually sends and accepts.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

/* ---------------------------------------------------------------- envelope */

/** Every endpoint answers inside this wrapper - see `utils/ApiResponse.java`. */
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  responseCode: string;
  traceId: string | null;
  timestamps: string;
};

/** Only the applications list is paged. Everything else returns a bare array. */
export type PagedResult<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

/* ------------------------------------------------------------------- enums */

export type ApplicationStatus =
  | "APPLIED"
  | "NOT_APPLIED_YET"
  | "REJECTED"
  | "MISSED"
  | "INTERVIEWING"
  | "HOLD"
  | "ASSIGNMENT"
  | "OFFER_REVOKED"
  | "OFFERED"
  | "WITHDRAWN";

export type ReferralRequestOutcome = "REQUESTED" | "SKIPPED" | "RECEIVED";
export type Source = "OTHERS" | "LINKEDIN" | "CAREER_PORTAL" | "COLD_EMAIL" | "REFERRAL";
export type ApplicationSort = "RECENT_ACTIVITY" | "NEAREST_DEADLINE";

export type AssignmentOutcome = "AWAITING" | "REJECTED" | "IN_LOOP" | "INTERVIEWING";
export type Submission = "PENDING" | "IN_PROCESS" | "COMPLETED";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD" | "INSANE";
export type ProceedingVia = "APPLIED_APPLICATION" | "CONNECTION" | "RECRUITER_REACH_OUT";

export type InterviewOutcome = "AWAITED" | "REJECTED" | "CLEARED" | "RESCHEDULED";
export type InterviewType = "ONLINE" | "ONSITE" | "ON_CALL";

export type ScreeningOutcome = "AWAITED" | "IN_LOOP" | "REJECTED" | "INTERVIEWING" | "ASSIGNMENT";

export type DigestMode = "DIGEST" | "IMMEDIATE";
export type WorkingProfile = "FRESHER" | "PROFESSIONAL";

/* -------------------------------------------------------------------- user */

export type ExperiencedProfileDto = {
  companyName: string;
  profile: string;
  /** Whole years at the company. */
  yearsStayed: number;
  /** The remainder after the years, so the backend rejects anything outside 0-11. */
  monthsStayed: number;
};

/** `HH:mm` on both fields - the backend pins the format with `@JsonFormat`. */
export type QuietHoursDto = {
  start: string;
  end: string;
};

export type NotificationPreferencesDto = {
  remindersPaused: boolean;
  digestMode: DigestMode;
  /** An IANA zone id. The backend rejects fixed offsets such as +05:30. */
  timezone: string;
  quietHours: QuietHoursDto | null;
};

export type UserView = {
  id: number;
  iamUserId: string;
  fullName: string;
  username: string | null;
  email: string;
  emailVerified: boolean;
  yearsOfExperience: number;
  workingProfile: WorkingProfile;
  skills: string[];
  targetedRoles: string[];
  experiencedProfile: ExperiencedProfileDto[];
  notificationPreferences: NotificationPreferencesDto | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserProfileRequest = {
  fullName: string;
  username?: string | null;
  email: string;
  yearsOfExperience: number;
  workingProfile?: WorkingProfile | null;
  skills?: string[];
  targetedRoles?: string[];
  experiencedProfile?: ExperiencedProfileDto[];
  notificationPreferences?: Partial<NotificationPreferencesDto> | null;
};

/** No email: the backend does not accept a change of address through this endpoint. */
export type UpdateUserProfileRequest = {
  fullName: string;
  username?: string | null;
  yearsOfExperience: number;
  workingProfile?: WorkingProfile | null;
  skills?: string[];
  targetedRoles?: string[];
  experiencedProfile?: ExperiencedProfileDto[];
};

/* ------------------------------------------------------------- application */

export type ApplicationView = {
  id: number;
  userId: number;
  companyName: string;
  jobProfile: string | null;
  jobId: string | null;
  appliedOn: string | null;
  applyBefore: string | null;
  referral: ReferralRequestOutcome | null;
  source: Source | null;
  applicationStatus: ApplicationStatus;
  lastActivity: string | null;
  createdAt: string;
  updatedAt: string;
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

export type ApplicationListQuery = {
  referral?: ReferralRequestOutcome | null;
  source?: Source | null;
  applicationStatus?: ApplicationStatus | null;
  sort?: ApplicationSort | null;
  page?: number;
  size?: number;
};

/* --------------------------------------------------------------- interview */

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
  userId: number;
  interviewDate: string | null;
  /** Derived by the backend from the round count - never sent on a write. */
  currentRound: number;
  interviewProceedingVia: ProceedingVia;
  rounds: InterviewRoundView[];
  createdAt: string;
  updatedAt: string;
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
  interviewDate?: string | null;
  interviewProceedingVia?: ProceedingVia | null;
  rounds?: InterviewRoundPayload[];
};

/** Rounds are deliberately absent: the backend edits them through their own endpoints. */
export type UpdateInterviewPayload = {
  applicationId?: number | null;
  interviewDate?: string | null;
  interviewProceedingVia: ProceedingVia;
};

export type InterviewListQuery = {
  applicationId?: number | null;
  standalone?: boolean;
  interviewProceedingVia?: ProceedingVia | null;
  roundOutcome?: InterviewOutcome | null;
};

/* -------------------------------------------------------------- assignment */

export type AssignmentView = {
  id: number;
  applicationId: number | null;
  userId: number;
  dateAssigned: string | null;
  submissionBefore: string | null;
  submission: Submission;
  assignmentOutcome: AssignmentOutcome;
  difficultyLevel: DifficultyLevel;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AssignmentPayload = {
  applicationId?: number | null;
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
};

/* ---------------------------------------------------------- screening call */

export type ScreeningCallView = {
  id: number;
  applicationId: number | null;
  userId: number;
  contactedOn: string | null;
  discussionDuration: number;
  hrName: string | null;
  companyName: string | null;
  proceeding: ScreeningOutcome;
  callReceivedVia: ProceedingVia;
  createdAt: string;
  updatedAt: string;
};

export type ScreeningCallPayload = {
  applicationId?: number | null;
  contactedOn?: string | null;
  discussionDuration: number;
  hrName?: string | null;
  companyName?: string | null;
  proceeding?: ScreeningOutcome | null;
  callReceivedVia?: ProceedingVia | null;
};

export type ScreeningCallListQuery = {
  applicationId?: number | null;
  standalone?: boolean;
  proceeding?: ScreeningOutcome | null;
  callReceivedVia?: ProceedingVia | null;
};
