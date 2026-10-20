import type { ScreeningOutcome } from "@/components/screening-calls/screeningCalls.types";
import type { ProceedingVia } from "@/lib/types";

/** What the create/edit dialog holds while it is open. Text fields are "" rather than null. */
export type ScreeningCallFormState = {
  applicationId: number | null;
  contactedOn: string;
  /** Minutes, as typed - parsed only when the form is sent. */
  discussionDuration: string;
  hrName: string;
  /** Only sent when nothing is linked - see `StandaloneCompanyField`. */
  companyName: string;
  proceeding: ScreeningOutcome;
  callReceivedVia: ProceedingVia;
};
