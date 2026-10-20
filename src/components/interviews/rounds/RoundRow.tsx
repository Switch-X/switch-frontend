"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import { INTERVIEW_OUTCOME, describe } from "@/lib/enums";
import type { InterviewRoundView } from "@/components/interviews/interviews.types";
import { Badge } from "@/components/ui/display/Badge";
import { IconButton } from "@/components/ui/button/IconButton";
import { Icon } from "@/components/ui/icons";
import { ROUND_BUBBLE_TONE } from "@/components/interviews/roundProgress.constants";
import { hasRoundDetail } from "@/components/interviews/rounds/rounds.utils";
import { RoundDetails } from "./RoundDetails";
import { RoundMeta } from "./RoundMeta";

/**
 * One round: where it sits in the process, a summary line, and the questions and feedback behind
 * a "Details" toggle. The number is coloured by how the round went, and the round still waiting
 * on its result is marked current.
 */
export function RoundRow({
  round,
  position,
  total,
  current,
  onEdit,
  onDelete,
}: {
  round: InterviewRoundView;
  /** From 1. */
  position: number;
  /** Rounds in the whole process, recorded or expected. */
  total: number;
  current: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const outcome = describe(INTERVIEW_OUTCOME, round.interviewOutcome);
  const hasDetail = hasRoundDetail(round);

  return (
    <li className={cx(current && "bg-warn-soft/25")}>
      <div className="flex flex-wrap items-center gap-3 px-5 py-3.5">
        <span
          className={cx(
            "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            ROUND_BUBBLE_TONE[round.interviewOutcome],
            current && "ring-2 ring-warn/40 ring-offset-2 ring-offset-surface",
          )}
        >
          {position}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold tracking-wide text-ink-subtle uppercase">
            Round {position} of {total}
            {current && <span className="text-warn"> · Current</span>}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-ink">
              {round.interviewerName ?? "Interviewer not recorded"}
            </span>
            <Badge tone={outcome.tone}>{outcome.label}</Badge>
          </div>
          <RoundMeta round={round} />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {hasDetail && (
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-surface-sunken hover:text-ink"
            >
              {expanded ? "Hide" : "Details"}
              <Icon.ChevronDown
                className={cx("size-3.5 transition-transform", expanded && "rotate-180")}
              />
            </button>
          )}
          <IconButton label="Edit round" onClick={onEdit}>
            <Icon.Pencil className="size-4" />
          </IconButton>
          <IconButton label="Remove round" danger onClick={onDelete}>
            <Icon.Trash className="size-4" />
          </IconButton>
        </div>
      </div>

      {expanded && hasDetail && <RoundDetails round={round} />}
    </li>
  );
}
