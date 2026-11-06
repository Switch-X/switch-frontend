/** Turning what was typed into what the create-profile call needs. */

import { parseList } from "@/lib/format";
import type { CreateUserProfileRequest } from "@/components/profile/user.types";
import type { SignUpFormState } from "./signUp.types";

/** The profile form as the backend's create request, reminders included. */
export function toCreateProfileRequest(
  form: SignUpFormState,
  email: string,
): CreateUserProfileRequest {
  const years = Number.parseInt(form.yearsOfExperience, 10);

  return {
    fullName: form.fullName.trim(),
    // Not asked for. Keycloak takes the email as the username, and the profile page is where
    // one gets chosen later.
    username: null,
    email: email.trim(),
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
