import { daysUntil, formatCount } from "@/lib/format";
import type { InterviewView } from "@/components/interviews/interviews.types";

/** Dated today or later. */
export function isUpcoming(interview: InterviewView): boolean {
  const days = daysUntil(interview.interviewDate);
  return days !== null && days >= 0;
}

/**
 * Nearest first, for a list of interviews still to come.
 *
 * <p>Only for that. The interviews screen takes the order the server sends - most recent first,
 * which is what a log of a search wants - and sorting a page of it in the browser would reorder
 * ten rows the server had already chosen. This is safe on the overview because the block it
 * feeds is a slice of one capped page, not a pager.
 *
 * <p>String comparison on `yyyy-MM-dd`, which avoids parsing a plain date into a `Date` and
 * shifting it a day in western timezones. Undated interviews never reach here - `isUpcoming`
 * drops them - so there are no nulls to place.
 */
export function bySoonest(left: InterviewView, right: InterviewView): number {
  return (left.interviewDate ?? "").localeCompare(right.interviewDate ?? "");
}

/** Where an interview process stands, judged by its latest round. */
export type InterviewProgress = {
  /** Rounds recorded so far. */
  recorded: number;
  /** Rounds in all: what the company said, or more if more have been recorded since. */
  total: number;
  stage: "not-started" | "in-progress" | "next-up" | "ended" | "complete";
  /** The round the stage is about, from 1: the one under way, the one up next, or the last one. */
  round: number;
};

/**
 * The latest round decides it. Waiting on a result - or moved to another day - means that round
 * is still under way; cleared means the next one is up, unless it was the last; rejected means the
 * process stopped there, however many rounds were expected.
 */
export function interviewProgress(interview: InterviewView): InterviewProgress {
  const recorded = interview.rounds.length;
  const total = Math.max(interview.expectedTotalRounds ?? 0, recorded);
  const latest = interview.rounds[recorded - 1];

  if (!latest) return { recorded, total, stage: "not-started", round: 1 };

  switch (latest.interviewOutcome) {
    case "REJECTED":
      return { recorded, total, stage: "ended", round: recorded };
    case "CLEARED":
      return recorded < total
        ? { recorded, total, stage: "next-up", round: recorded + 1 }
        : { recorded, total, stage: "complete", round: recorded };
    default:
      return { recorded, total, stage: "in-progress", round: recorded };
  }
}

/** The progress as one line: "Round 3 of 4 in progress", "Stopped at round 2 of 3". */
export function progressLabel(progress: InterviewProgress): string {
  const { stage, round, total } = progress;
  switch (stage) {
    case "not-started":
      return total > 0 ? `No rounds yet · ${total} expected` : "No rounds yet";
    case "in-progress":
      return `Round ${round} of ${total} in progress`;
    case "next-up":
      return `Round ${round} of ${total} up next`;
    case "ended":
      return `Stopped at round ${round} of ${total}`;
    case "complete":
      return `Cleared all ${formatCount(total, "round")}`;
  }
}
