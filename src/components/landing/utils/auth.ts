import { ApiError } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/errorMessages";
import { blankToNull, parseList } from "@/lib/format";
import type { CreateUserProfileRequest } from "@/lib/types";
import type { SignUpFormState } from "@/components/landing/types/auth";

/** The account id suggested from a username: lower-cased, anything else collapsed to hyphens. */
export function suggestAccountId(username: string): string {
  const trimmed = username.trim();
  if (!trimmed) return "";
  return trimmed
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The sign-up form as the backend's create request, reminders included. */
export function toCreateProfileRequest(form: SignUpFormState): CreateUserProfileRequest {
  const years = Number.parseInt(form.yearsOfExperience, 10);

  return {
    fullName: form.fullName.trim(),
    username: blankToNull(form.username),
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
 * Why a sign-in failed, in words for the person trying it.
 *
 * <p>`missingProfile` is the caller's own wording for an id with nothing behind it, because what
 * helps differs: a demo chip failing means the demo data is missing, a typed id failing more
 * likely means a typo.
 */
export function signInErrorMessage(failure: unknown, missingProfile: string): string {
  if (!(failure instanceof ApiError)) return ERROR_MESSAGES.offline;
  return failure.isMissingProfile ? missingProfile : failure.message;
}
