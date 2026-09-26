import type { ScreeningCallView } from "@/lib/types";

/** Where a new call starts: a short one, from a recruiter, with the result still to come. */
export const NEW_SCREENING_CALL: Pick<
  ScreeningCallView,
  "discussionDuration" | "proceeding" | "callReceivedVia"
> = {
  discussionDuration: 30,
  proceeding: "AWAITED",
  callReceivedVia: "RECRUITER_REACH_OUT",
};
