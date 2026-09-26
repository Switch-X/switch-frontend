import { DIFFICULTY, INTERVIEW_TYPE, describe } from "@/lib/enums";
import { formatCount, formatDate, formatDuration } from "@/lib/format";
import type { InterviewRoundView } from "@/lib/types";
import { Icon } from "@/components/ui/icons";

/** The line under the interviewer's name: format, difficulty, length, date, questions. */
export function RoundMeta({ round }: { round: InterviewRoundView }) {
  const type = describe(INTERVIEW_TYPE, round.interviewType);
  const difficulty = describe(DIFFICULTY, round.difficultyLevel);

  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-subtle">
      <span>{type.label}</span>
      <span>·</span>
      <span>{difficulty.label}</span>
      <span>·</span>
      <span className="inline-flex items-center gap-1">
        <Icon.Clock className="size-3.5" />
        {formatDuration(round.durationInMinutes)}
      </span>
      {round.scheduledAt && (
        <>
          <span>·</span>
          <span>{formatDate(round.scheduledAt)}</span>
        </>
      )}
      {round.questionsAsked.length > 0 && (
        <>
          <span>·</span>
          <span>{formatCount(round.questionsAsked.length, "question")}</span>
        </>
      )}
    </div>
  );
}
