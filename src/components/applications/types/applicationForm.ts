import type { ApplicationStatus, ReferralRequestOutcome, Source } from "@/lib/types";

/** What the create/edit dialog holds while it is open. Text fields are "" rather than null. */
export type ApplicationFormState = {
  companyName: string;
  jobProfile: string;
  jobId: string;
  appliedOn: string;
  applyBefore: string;
  referral: ReferralRequestOutcome | null;
  source: Source | null;
  applicationStatus: ApplicationStatus;
};
