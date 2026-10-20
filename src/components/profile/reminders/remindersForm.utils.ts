import type { NotificationPreferencesDto } from "@/components/profile/user.types";
import {
  DEFAULT_DIGEST_MODE,
  DEFAULT_QUIET_HOURS,
  DEFAULT_TIMEZONE,
} from "@/components/shared/constants/profileDefaults";
import type { RemindersFormState } from "@/components/profile/profileForms.types";

export function initialRemindersForm(
  preferences: NotificationPreferencesDto | null,
): RemindersFormState {
  return {
    timezone: preferences?.timezone ?? DEFAULT_TIMEZONE,
    digestMode: preferences?.digestMode ?? DEFAULT_DIGEST_MODE,
    remindersPaused: preferences?.remindersPaused ?? false,
    quietStart: preferences?.quietHours?.start ?? DEFAULT_QUIET_HOURS.start,
    quietEnd: preferences?.quietHours?.end ?? DEFAULT_QUIET_HOURS.end,
  };
}

/** The form as `PATCH /v1/users/me/notification-preferences` wants it. */
export function toPreferencesPayload(form: RemindersFormState): NotificationPreferencesDto {
  return {
    remindersPaused: form.remindersPaused,
    digestMode: form.digestMode,
    timezone: form.timezone,
    quietHours: { start: form.quietStart, end: form.quietEnd },
  };
}
