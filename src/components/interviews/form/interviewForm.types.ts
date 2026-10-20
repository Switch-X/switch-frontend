import type { ProceedingVia } from "@/lib/types";

/** What the interview dialog holds - the thread itself, never its rounds. */
export type InterviewFormState = {
  applicationId: number | null;
  /** Only sent when nothing is linked - see `StandaloneCompanyField`. */
  companyName: string;
  interviewDate: string;
  interviewProceedingVia: ProceedingVia;
  /** As typed - parsed only when the form is sent. */
  expectedTotalRounds: string;
};
