import { cx } from "@/lib/cx";
import type { InterviewView } from "@/components/interviews/interviews.types";
import { interviewProgress } from "@/components/shared/utils/interviews";
import { ROUND_SEGMENT_TONE } from "@/components/interviews/roundProgress.constants";

/**
 * One segment per round, recorded or expected, coloured by how each went.
 *
 * <p>Hidden from screen readers: the line of text beside it says the same thing in words.
 */
export function RoundProgressBar({ interview }: { interview: InterviewView }) {
  const { total } = interviewProgress(interview);
  if (total === 0) return null;

  return (
    <div aria-hidden="true" className="mt-3 flex max-w-xs gap-1">
      {Array.from({ length: total }, (_, index) => {
        const round = interview.rounds[index];
        return (
          <span
            key={index}
            className={cx(
              "h-1.5 flex-1 rounded-full",
              round ? ROUND_SEGMENT_TONE[round.interviewOutcome] : "bg-surface-sunken",
            )}
          />
        );
      })}
    </div>
  );
}
