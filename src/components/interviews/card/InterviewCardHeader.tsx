import { PROCEEDING_VIA, describe } from "@/lib/enums";
import { formatCount, formatDate, relativeDay } from "@/lib/format";
import type { InterviewView } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/icons";
import { isUpcoming } from "@/components/shared/utils/interviews";

export function InterviewCardHeader({
  interview,
  company,
  onEdit,
  onDelete,
  onAddRound,
}: {
  interview: InterviewView;
  company: string;
  onEdit: () => void;
  onDelete: () => void;
  onAddRound: () => void;
}) {
  const via = describe(PROCEEDING_VIA, interview.interviewProceedingVia);

  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-semibold text-ink">{company}</h2>
          <Badge tone={via.tone}>{via.label}</Badge>
          {isUpcoming(interview) && <Badge tone="good">Upcoming</Badge>}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <Icon.Calendar className="size-4" />
            {interview.interviewDate ? formatDate(interview.interviewDate) : "No date set"}
            {interview.interviewDate && (
              <span className="text-ink-subtle">({relativeDay(interview.interviewDate)})</span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon.Interviews className="size-4" />
            {formatCount(interview.currentRound, "round")}
          </span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button variant="subtle" size="sm" onClick={onAddRound}>
          <Icon.Plus className="size-4" />
          Add round
        </Button>
        <IconButton label="Edit interview" onClick={onEdit}>
          <Icon.Pencil className="size-4" />
        </IconButton>
        <IconButton label="Delete interview" danger onClick={onDelete}>
          <Icon.Trash className="size-4" />
        </IconButton>
      </div>
    </header>
  );
}
