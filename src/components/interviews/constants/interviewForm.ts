import type { InterviewRoundView, ProceedingVia } from "@/lib/types";

/** How a new interview came about, until someone says otherwise. */
export const NEW_INTERVIEW_VIA: ProceedingVia = "APPLIED_APPLICATION";

/** Where a new round starts: an hour online, medium, with the result still to come. */
export const NEW_ROUND: Pick<
  InterviewRoundView,
  "durationInMinutes" | "difficultyLevel" | "interviewType" | "interviewOutcome"
> = {
  durationInMinutes: 60,
  difficultyLevel: "MEDIUM",
  interviewType: "ONLINE",
  interviewOutcome: "AWAITED",
};
