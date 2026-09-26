import type { DigestMode, WorkingProfile } from "@/lib/types";

/** Which tab the auth dialog is on. */
export type AuthMode = "signin" | "signup";

/** The sign-up form, as typed. Lists are comma separated text until the form is sent. */
export type SignUpFormState = {
  accountId: string;
  fullName: string;
  username: string;
  email: string;
  yearsOfExperience: string;
  workingProfile: WorkingProfile;
  skills: string;
  targetedRoles: string;
  timezone: string;
  digestMode: DigestMode;
  quietStart: string;
  quietEnd: string;
  remindersPaused: boolean;
};
