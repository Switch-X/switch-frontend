/** Turning what was typed into what the two sign-up calls need. */

import { parseList } from "@/lib/format";
import type { CreateUserProfileRequest } from "@/components/profile/user.types";
import type { SignUpFormState } from "./signUp.types";

/** The sign-up form as the backend's create request, reminders included. */
export function toCreateProfileRequest(form: SignUpFormState): CreateUserProfileRequest {
  const years = Number.parseInt(form.yearsOfExperience, 10);

  return {
    fullName: form.fullName.trim(),
    // Not asked for at sign-up. Keycloak takes the email as the username, and the profile page
    // is where one gets chosen later.
    username: null,
    email: form.email.trim(),
    // The backend field is a primitive `int`; a NaN would serialise to null and land as 0.
    yearsOfExperience: Number.isFinite(years) ? years : 0,
    workingProfile: form.workingProfile,
    skills: parseList(form.skills),
    targetedRoles: parseList(form.targetedRoles),
    experiencedProfile: [],
    notificationPreferences: {
      remindersPaused: form.remindersPaused,
      digestMode: form.digestMode,
      timezone: form.timezone,
      quietHours: { start: form.quietStart, end: form.quietEnd },
    },
  };
}

/**
 * A full name as the first and last name Keycloak requires.
 *
 * <p>Both have to be non-blank or the user it creates cannot sign in with a password, so a
 * single-word name is used for both rather than left empty. Crude, and better than refusing to
 * register anybody mononymous.
 */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}
