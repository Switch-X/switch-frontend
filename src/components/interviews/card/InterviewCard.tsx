import type { InterviewRoundView, InterviewView } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { RoundRow } from "@/components/interviews/rounds/RoundRow";
import { InterviewCardHeader } from "./InterviewCardHeader";

/**
 * One interview, as a card rather than a table row.
 *
 * <p>An interview is not one row - it is a thread with a variable number of rounds hanging off
 * it, each with its own interviewer, questions and outcome. Flattening that into a grid would
 * either repeat the parent on every line or hide the rounds entirely.
 */
export function InterviewCard({
  interview,
  company,
  onEdit,
  onDelete,
  onAddRound,
  onEditRound,
  onDeleteRound,
}: {
  interview: InterviewView;
  company: string;
  onEdit: () => void;
  onDelete: () => void;
  onAddRound: () => void;
  onEditRound: (round: InterviewRoundView) => void;
  onDeleteRound: (round: InterviewRoundView) => void;
}) {
  return (
    <Card>
      <InterviewCardHeader
        interview={interview}
        company={company}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddRound={onAddRound}
      />

      {interview.rounds.length === 0 ? (
        <p className="px-5 py-6 text-center text-sm text-ink-subtle">
          No rounds recorded yet.{" "}
          <button type="button" onClick={onAddRound} className="font-medium text-brand hover:underline">
            Add the first one
          </button>
          .
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {interview.rounds.map((round, index) => (
            <RoundRow
              key={round.roundId}
              round={round}
              index={index}
              onEdit={() => onEditRound(round)}
              onDelete={() => onDeleteRound(round)}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
