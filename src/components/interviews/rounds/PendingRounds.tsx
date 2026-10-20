import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";
import type { InterviewProgress } from "@/components/shared/utils/interviews";

/**
 * The rounds the company said there would be that have not happened yet.
 *
 * <p>The next one gets a row of its own, with a way to add it; any after that share a single
 * line, so a ten-round loop does not turn the card into a list of empty rows. After a rejection
 * there is nothing still to come, so this says where it stopped instead.
 */
export function PendingRounds({
  progress,
  onAddRound,
}: {
  progress: InterviewProgress;
  onAddRound: () => void;
}) {
  const { stage, recorded, total, round } = progress;

  if (stage === "ended") {
    return recorded < total ? (
      <li className="px-5 py-3 text-xs text-ink-subtle">
        The process stopped at round {round}, so the rest did not happen.
      </li>
    ) : null;
  }

  const next = recorded + 1;
  if (next > total) return null;

  // Nothing is "up next" while the latest round is still waiting on its result.
  const upNext = stage !== "in-progress";

  return (
    <>
      <li className="flex flex-wrap items-center gap-3 px-5 py-3.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border-strong text-xs font-semibold text-ink-subtle">
          {next}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold tracking-wide text-ink-subtle uppercase">
            Round {next} of {total}
            {upNext && <span className="text-brand"> · Up next</span>}
          </p>
          <p className="text-sm text-ink-subtle">Not scheduled yet</p>
        </div>
        {upNext && (
          <Button variant="subtle" size="sm" onClick={onAddRound}>
            <Icon.Plus className="size-4" />
            Add round {next}
          </Button>
        )}
      </li>

      {next < total && (
        <li className="px-5 py-3 pl-16 text-xs text-ink-subtle">
          {next + 1 === total ? `Round ${total}` : `Rounds ${next + 1}–${total}`} still to come
        </li>
      )}
    </>
  );
}
