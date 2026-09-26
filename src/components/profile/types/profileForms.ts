import type { DigestMode, WorkingProfile } from "@/lib/types";

/**
 * The "Details" form. Employment history is held beside it rather than in it, as its own list,
 * because it is edited row by row.
 */
export type DetailsFormState = {
  fullName: string;
  username: string;
  /** As typed - parsed only when the form is sent. */
  yearsOfExperience: string;
  workingProfile: WorkingProfile;
  /** Comma separated, as typed. */
  skills: string;
  /** Comma separated, as typed. */
  targetedRoles: string;
};

/** The "Reminders" form. */
export type RemindersFormState = {
  timezone: string;
  digestMode: DigestMode;
  remindersPaused: boolean;
  /** `HH:mm`, a wall-clock time in `timezone`. */
  quietStart: string;
  /** `HH:mm`, a wall-clock time in `timezone`. */
  quietEnd: string;
};
