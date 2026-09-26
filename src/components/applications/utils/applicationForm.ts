import { blankToNull } from "@/lib/format";
import type { ApplicationPayload, ApplicationView } from "@/lib/types";
import { NEW_APPLICATION_STATUS } from "@/components/applications/constants/applicationForm";
import type { ApplicationFormState } from "@/components/applications/types/applicationForm";

/** The dialog's starting fields: the record being edited, or a blank one. */
export function initialApplicationForm(record: ApplicationView | null): ApplicationFormState {
  return {
    companyName: record?.companyName ?? "",
    jobProfile: record?.jobProfile ?? "",
    jobId: record?.jobId ?? "",
    appliedOn: record?.appliedOn ?? "",
    applyBefore: record?.applyBefore ?? "",
    referral: record?.referral ?? null,
    source: record?.source ?? null,
    applicationStatus: record?.applicationStatus ?? NEW_APPLICATION_STATUS,
  };
}

/**
 * The fields as the backend's create and update body - the same shape for both.
 *
 * <p>Dates go through untouched: `<input type="date">` already produces exactly the `yyyy-MM-dd`
 * a `LocalDate` wants. Nothing here constructs a `Date`, which is what keeps a deadline from
 * drifting a day for anyone west of UTC.
 */
export function toApplicationPayload(form: ApplicationFormState): ApplicationPayload {
  return {
    companyName: form.companyName.trim(),
    jobProfile: blankToNull(form.jobProfile),
    jobId: blankToNull(form.jobId),
    appliedOn: blankToNull(form.appliedOn),
    applyBefore: blankToNull(form.applyBefore),
    referral: form.referral,
    source: form.source,
    applicationStatus: form.applicationStatus,
  };
}
