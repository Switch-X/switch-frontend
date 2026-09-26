import { formatCount, formatDate, relativeDay } from "@/lib/format";
import type { InterviewView } from "@/lib/types";
import { Icon } from "@/components/ui/icons";

export function UpcomingInterviewItem({
  interview,
  company,
}: {
  interview: InterviewView;
  company: string;
}) {
  return (
    <li className="flex items-center gap-3 px-5 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
        <Icon.Interviews className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-ink">{company}</span>
        <span className="block truncate text-xs text-ink-subtle">
          {interview.currentRound === 0
            ? "No rounds yet"
            : `${formatCount(interview.currentRound, "round")} so far`}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-sm font-medium text-ink">
          {relativeDay(interview.interviewDate)}
        </span>
        <span className="block text-xs text-ink-subtle">{formatDate(interview.interviewDate)}</span>
      </span>
    </li>
  );
}
