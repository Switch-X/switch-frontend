"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import { INTERVIEW_OUTCOME, describe } from "@/lib/enums";
import type { InterviewRoundView } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/icons";
import { hasRoundDetail } from "@/components/interviews/utils/rounds";
import { RoundDetails } from "./RoundDetails";
import { RoundMeta } from "./RoundMeta";

/** One round: a summary line, and the questions and feedback behind a "Details" toggle. */
export function RoundRow({
  round,
  index,
  onEdit,
  onDelete,
}: {
  round: InterviewRoundView;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const outcome = describe(INTERVIEW_OUTCOME, round.interviewOutcome);
  const hasDetail = hasRoundDetail(round);

  return (
    <li>
      <div className="flex flex-wrap items-center gap-3 px-5 py-3.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-xs font-semibold text-ink-muted">
          {index + 1}
        </span>

        <div className="min-w-0 flex-1">
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
