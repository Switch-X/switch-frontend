import { blankToNull } from "@/lib/format";
import type { ScreeningCallPayload, ScreeningCallView } from "@/lib/types";
import { NEW_SCREENING_CALL } from "@/components/screening-calls/constants/screeningCallForm";
import type { ScreeningCallFormState } from "@/components/screening-calls/types/screeningCallForm";

/** The dialog's starting fields: the record being edited, or a new one's defaults. */
export function initialScreeningCallForm(
  record: ScreeningCallView | null,
): ScreeningCallFormState {
  return {
    applicationId: record?.applicationId ?? null,
    contactedOn: record?.contactedOn ?? "",
    discussionDuration: String(record?.discussionDuration ?? NEW_SCREENING_CALL.discussionDuration),
    hrName: record?.hrName ?? "",
    companyName: record?.companyName ?? "",
    proceeding: record?.proceeding ?? NEW_SCREENING_CALL.proceeding,
    callReceivedVia: record?.callReceivedVia ?? NEW_SCREENING_CALL.callReceivedVia,
  };
}

/**
 * The fields as the backend's create and update body.
 *
 * <p>`discussionDuration` is an `int` on the backend, not an `Integer`, so it can never be sent
 * as null - a cleared field becomes 0, which reads as "we did not record how long it ran" rather
 * than failing the write.
 */
export function toScreeningCallPayload(form: ScreeningCallFormState): ScreeningCallPayload {
  const minutes = Number.parseInt(form.discussionDuration, 10);

  return {
    applicationId: form.applicationId,
    contactedOn: blankToNull(form.contactedOn),
    discussionDuration: Number.isFinite(minutes) && minutes >= 0 ? minutes : 0,
    hrName: blankToNull(form.hrName),
    companyName: blankToNull(form.companyName),
    proceeding: form.proceeding,
    callReceivedVia: form.callReceivedVia,
  };
}
