import type { InterviewRoundView } from "@/lib/types";

/** Whether a round has anything to show beyond its one-line summary. */
export function hasRoundDetail(round: InterviewRoundView): boolean {
  return (
    round.questionsAsked.length > 0 ||
    round.rejectionReasons.length > 0 ||
    !!round.feedbackFromInterviewer ||
    !!round.remarks
  );
}
