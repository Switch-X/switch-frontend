/**
 * The account holder's profile and reminder settings.
 *
 * Hand-written against the Java records in `com.switchapp.backend.api.dto` rather than generated,
 * so every field here should be traceable to one there. Where a Java field is a primitive
 * (`int`, `boolean`) the property is required and non-nullable on this side too - Jackson maps a
 * missing primitive to zero rather than rejecting it, which would silently file a 90-minute
 * interview as a 0-minute one.
 */

export type DigestMode = "DIGEST" | "IMMEDIATE";

export type WorkingProfile = "FRESHER" | "PROFESSIONAL";

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
  fullName: string;
  /** Never empty: defaults to the email until a handle is chosen. */
  username: string;
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
/**
 * Why somebody is deleting their account. Every part is optional - the form asks, it does not
 * require, so an empty body is a valid one.
 */
export type DeleteAccountRequest = {
  reasons?: string[];
  note?: string | null;
};

export type UpdateUserProfileRequest = {
  fullName: string;
  username?: string | null;
  yearsOfExperience: number;
  workingProfile?: WorkingProfile | null;
  skills?: string[];
  targetedRoles?: string[];
  experiencedProfile?: ExperiencedProfileDto[];
};
