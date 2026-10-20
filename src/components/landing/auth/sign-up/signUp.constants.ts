/** The sign-up wizard: where it starts, and the three screens it moves through. */

import {
  DEFAULT_DIGEST_MODE,
  DEFAULT_QUIET_HOURS,
  DEFAULT_TIMEZONE,
  DEFAULT_WORKING_PROFILE,
} from "@/components/shared/constants/profileDefaults";
import type { SignUpFormState } from "./signUp.types";

/** A blank sign-up form. The timezone is swapped for the browser's own as soon as it mounts. */
export const INITIAL_SIGN_UP_FORM: SignUpFormState = {
  fullName: "",
  email: "",
  password: "",
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

/**
 * The sign-up wizard, one screen at a time.
 *
 * <p>Three steps rather than one long form, because the single form asked for fourteen things
 * at once and most people meet it before they have decided they want the product. Each step
 * here is a question somebody can answer without stopping to think: who you are, what you do,
 * when it is reasonable to contact you.
 *
 * <p>`requires` names the fields that must be filled before **Next** is allowed. Only the first
 * step has any - the rest all have sensible defaults, and nobody should be blocked from creating
 * an account because they have not listed their skills.
 */
type SignUpStep = {
  /** Shown in the progress strip. */
  title: string;
  /** The one-line promise under the heading. */
  blurb: string;
  requires: (keyof SignUpFormState)[];
};

export const SIGN_UP_STEPS: SignUpStep[] = [
  {
    title: "Account info",
    blurb: "Just enough to know who you are.",
    requires: ["fullName", "email", "password"],
  },
  {
    title: "Share your experience journey",
    blurb: "Where you are in your career, and what you are aiming at next.",
    requires: [],
  },
  {
    title: "Reminders",
    blurb: "When it is reasonable to reach you — read against your own city, not a server's.",
    requires: [],
  },
];
