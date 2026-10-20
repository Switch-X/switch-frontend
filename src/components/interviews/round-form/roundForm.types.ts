import type { InterviewOutcome, InterviewType } from "@/components/interviews/interviews.types";
import type { DifficultyLevel } from "@/lib/types";

/**
 * What the round dialog holds while it is open.
 *
 * <p>The two lists are kept as text, one entry per line, and only split when the form is sent -
 * pasting six questions out of a notes app should be one paste, not six clicks.
 */
export type RoundFormState = {
  interviewerName: string;
  interviewerEmail: string;
  scheduledAt: string;
  /** Minutes, as typed. */
  durationInMinutes: string;
  difficultyLevel: DifficultyLevel;
  interviewType: InterviewType;
  interviewOutcome: InterviewOutcome;
  questionsAsked: string;
  rejectionReasons: string;
  feedbackFromInterviewer: string;
  remarks: string;
};
