import type { ExperiencedProfileDto } from "@/components/profile/user.types";

/** A new, blank row in the employment history. Copy it - never push this object itself. */
export const EMPTY_ROLE: ExperiencedProfileDto = {
  companyName: "",
  profile: "",
  yearsStayed: 0,
  monthsStayed: 0,
};
