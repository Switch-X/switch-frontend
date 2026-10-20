import { blankToNull, formatTenure, parseList } from "@/lib/format";
import type { ExperiencedProfileDto, UpdateUserProfileRequest, UserView } from "@/components/profile/user.types";
import { DEFAULT_WORKING_PROFILE } from "@/components/shared/constants/profileDefaults";
import type { DetailsFormState } from "@/components/profile/profileForms.types";

export function initialDetailsForm(user: UserView): DetailsFormState {
  return {
    fullName: user.fullName ?? "",
    username: user.username ?? "",
    yearsOfExperience: String(user.yearsOfExperience ?? 0),
    workingProfile: user.workingProfile ?? DEFAULT_WORKING_PROFILE,
    skills: (user.skills ?? []).join(", "),
    targetedRoles: (user.targetedRoles ?? []).join(", "),
  };
}

/** The form and the history together, as `PATCH /v1/users/me` wants them. */
export function toProfileUpdate(
  form: DetailsFormState,
  history: ExperiencedProfileDto[],
): UpdateUserProfileRequest {
  const years = Number.parseInt(form.yearsOfExperience, 10);

  return {
    fullName: form.fullName.trim(),
    username: blankToNull(form.username),
    yearsOfExperience: Number.isFinite(years) ? years : 0,
    workingProfile: form.workingProfile,
    skills: parseList(form.skills),
    targetedRoles: parseList(form.targetedRoles),
    // The whole list is sent every time: the backend replaces it and relies on orphan removal
    // to delete the rows that went, so omitting an entry is how it gets deleted.
    experiencedProfile: history.map((row) => ({
      companyName: row.companyName.trim(),
      profile: row.profile.trim(),
      yearsStayed: Number(row.yearsStayed) || 0,
      monthsStayed: Number(row.monthsStayed) || 0,
    })),
  };
}

/** Every row's time added up - `formatTenure` carries twelve months into a year. */
export function tenureOnRecord(history: ExperiencedProfileDto[]): string {
  return formatTenure(
    history.reduce((sum, row) => sum + (Number(row.yearsStayed) || 0), 0),
    history.reduce((sum, row) => sum + (Number(row.monthsStayed) || 0), 0),
  );
}
