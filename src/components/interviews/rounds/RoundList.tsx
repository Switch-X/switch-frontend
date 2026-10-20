import type { InterviewRoundView, InterviewView } from "@/components/interviews/interviews.types";
import { interviewProgress } from "@/components/shared/utils/interviews";
import { PendingRounds } from "./PendingRounds";
import { RoundRow } from "./RoundRow";

/**
 * Every round, first to last, then the ones still to come.
 *
 * <p>Each recorded round says where it sits - "Round 2 of 4" - and the one waiting on a result is
 * marked current, so the order and the state of the process read without counting rows.
 */
export function RoundList({
  interview,
  onAddRound,
  onEditRound,
  onDeleteRound,
}: {
  interview: InterviewView;
  onAddRound: () => void;
  onEditRound: (round: InterviewRoundView) => void;
  onDeleteRound: (round: InterviewRoundView) => void;
}) {
  const progress = interviewProgress(interview);

  return (
    <ul className="divide-y divide-border">
      {interview.rounds.map((round, index) => (
        <RoundRow
          key={round.roundId}
          round={round}
          position={index + 1}
          total={progress.total}
          current={progress.stage === "in-progress" && index === progress.recorded - 1}
          onEdit={() => onEditRound(round)}
          onDelete={() => onDeleteRound(round)}
        />
      ))}
      <PendingRounds progress={progress} onAddRound={onAddRound} />
    </ul>
  );
}
