import type { InterviewRoundView } from "@/components/interviews/interviews.types";
import type { ProceedingVia } from "@/lib/types";

/** How a new interview came about, until someone says otherwise. */
export const NEW_INTERVIEW_VIA: ProceedingVia = "APPLIED_APPLICATION";

/** The rounds a new interview expects - the same default the backend uses. */
export const NEW_INTERVIEW_EXPECTED_ROUNDS = 4;

/** The range the backend accepts for the number of rounds expected. */
export const EXPECTED_ROUNDS_RANGE = { min: 1, max: 20 } as const;

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
