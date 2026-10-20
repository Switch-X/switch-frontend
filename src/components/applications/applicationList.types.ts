import type { ApplicationStatus, ReferralRequestOutcome, Source } from "@/components/applications/applications.types";

/** The list's filters, keyed like `ApplicationListQuery` so they go to the API as they are. */
export type ApplicationFilterState = {
  applicationStatus: ApplicationStatus | null;
  source: Source | null;
  referral: ReferralRequestOutcome | null;
};
