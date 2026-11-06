/** The profile wizard: where it starts, and the two screens it moves through. */

import {
  DEFAULT_DIGEST_MODE,
  DEFAULT_QUIET_HOURS,
  DEFAULT_TIMEZONE,
  DEFAULT_WORKING_PROFILE,
} from "@/components/shared/constants/profileDefaults";
import type { SignUpFormState } from "./signUp.types";

/** A blank form. The timezone is swapped for the browser's own as soon as it mounts. */
export const INITIAL_SIGN_UP_FORM: SignUpFormState = {
  fullName: "",
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
 * Two steps, because there are only two questions left.
 *
 * <p>The name, the email and the password were taken on Keycloak's own page before this is ever
 * reached, so nothing here asks for them again - and this app never sees the password at all.
 *
 * <p>`requires` names the fields that must be filled before **Next** is allowed. Neither step
 * has any: every field below has a sensible default, and nobody should be held at the door
 * because they have not listed their skills.
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
    title: "Share your experience journey",
    blurb: "Where you are in your career, and what you are aiming at next.",
    requires: ["fullName"],
  },
  {
    title: "Reminders",
    blurb: "When it is reasonable to reach you — read against your own city, not a server's.",
    requires: [],
  },
];
