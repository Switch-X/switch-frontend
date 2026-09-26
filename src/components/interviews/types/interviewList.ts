import type {
  InterviewOutcome,
  InterviewRoundView,
  InterviewView,
  ProceedingVia,
} from "@/lib/types";

/** The list's filters, keyed like `InterviewListQuery` so they go to the API as they are. */
export type InterviewFilterState = {
  interviewProceedingVia: ProceedingVia | null;
  /** Interviews with at least one round in this state. */
  roundOutcome: InterviewOutcome | null;
  /** Only the interviews with no application behind them. */
  standalone: boolean;
};

/** The round dialog's subject: a round being edited, or `null` for a new one on that interview. */
export type RoundTarget = {
  interview: InterviewView;
  round: InterviewRoundView | null;
};

/** A round waiting on the delete confirmation, with the interview it belongs to. */
export type RoundDeleteTarget = {
  interview: InterviewView;
  round: InterviewRoundView;
};
