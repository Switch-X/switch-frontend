import type { ProceedingVia } from "@/lib/types";

/** What the interview dialog holds - the thread itself, never its rounds. */
export type InterviewFormState = {
  applicationId: number | null;
  interviewDate: string;
  interviewProceedingVia: ProceedingVia;
};
