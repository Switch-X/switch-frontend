import type { InterviewOutcome } from "@/components/interviews/interviews.types";

/** A round's number bubble, coloured by how it went. */
export const ROUND_BUBBLE_TONE: Record<InterviewOutcome, string> = {
  CLEARED: "bg-good-soft text-good",
  REJECTED: "bg-bad-soft text-bad",
  AWAITED: "bg-warn-soft text-warn",
  RESCHEDULED: "bg-surface-sunken text-ink-muted",
};

/** A round's segment in the progress bar. Rounds still to come stay grey. */
export const ROUND_SEGMENT_TONE: Record<InterviewOutcome, string> = {
  CLEARED: "bg-good",
  REJECTED: "bg-bad",
  AWAITED: "bg-warn",
  RESCHEDULED: "bg-ink-subtle",
};
