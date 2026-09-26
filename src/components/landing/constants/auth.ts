import {
  DEFAULT_DIGEST_MODE,
  DEFAULT_QUIET_HOURS,
  DEFAULT_TIMEZONE,
  DEFAULT_WORKING_PROFILE,
} from "@/components/shared/constants/profileDefaults";
import type { AuthMode, SignUpFormState } from "@/components/landing/types/auth";

/** The dialog's heading for each tab it can open on. */
export const AUTH_DIALOG_COPY: Record<AuthMode, { title: string; description: string }> = {
  signin: { title: "Welcome back", description: "Pick a demo account, or use your own id." },
  signup: { title: "Create your account", description: "Everything here can be changed later." },
};

export const AUTH_TABS: { mode: AuthMode; label: string }[] = [
  { mode: "signin", label: "Sign in" },
  { mode: "signup", label: "Create account" },
];

/** A blank sign-up form. The timezone is swapped for the browser's own as soon as it mounts. */
export const INITIAL_SIGN_UP_FORM: SignUpFormState = {
  accountId: "",
  fullName: "",
  username: "",
  email: "",
  yearsOfExperience: "0",
  workingProfile: DEFAULT_WORKING_PROFILE,
  skills: "",
  targetedRoles: "",
  timezone: DEFAULT_TIMEZONE,
  digestMode: DEFAULT_DIGEST_MODE,
  quietStart: DEFAULT_QUIET_HOURS.start,
  quietEnd: DEFAULT_QUIET_HOURS.end,
  remindersPaused: false,
};
