/** The sign-up wizard's own shapes: the form as typed, and what each step is handed. */

import type { DigestMode, WorkingProfile } from "@/components/profile/user.types";

/**
 * The profile form, as typed. Lists are comma separated text until the form is sent.
 *
 * <p>No name, email or password: Keycloak took those, and they arrive with the session.
 */
export type SignUpFormState = {
  fullName: string;
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

/** What every sign-up step is handed. The wizard owns the state; the steps only render it. */
export type StepProps = {
  form: SignUpFormState;
  set: <K extends keyof SignUpFormState>(key: K, value: SignUpFormState[K]) => void;
  fieldErrors: Record<string, string>;
};
