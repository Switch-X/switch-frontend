import type { DigestMode, QuietHoursDto, WorkingProfile } from "@/lib/types";

/**
 * Where a profile starts before anyone touches the settings.
 *
 * <p>Shared by sign-up, which creates the profile, and the profile page, which falls back to the
 * same answers for a profile saved without them - so the two can never disagree about a default.
 */

export const DEFAULT_WORKING_PROFILE: WorkingProfile = "PROFESSIONAL";

/** Only the starting value: sign-up replaces it with the browser's own zone as soon as it can. */
export const DEFAULT_TIMEZONE = "UTC";

export const DEFAULT_DIGEST_MODE: DigestMode = "IMMEDIATE";

export const DEFAULT_QUIET_HOURS: QuietHoursDto = { start: "22:00", end: "07:30" };
