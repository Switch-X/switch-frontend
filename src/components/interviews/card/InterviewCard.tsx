import type { InterviewRoundView, InterviewView } from "@/components/interviews/interviews.types";
import { Card } from "@/components/ui/layout/Card";
import { RoundList } from "@/components/interviews/rounds/RoundList";
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

      <RoundList
        interview={interview}
        onAddRound={onAddRound}
        onEditRound={onEditRound}
        onDeleteRound={onDeleteRound}
      />
    </Card>
  );
}
