import { APPLICATION_STATUS, describe } from "@/lib/enums";
import type { ApplicationStatus } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { barWidth } from "@/components/dashboard/utils/pipeline";

export function PipelineRow({
  status,
  count,
  highest,
}: {
  status: ApplicationStatus;
  count: number;
  /** The biggest bucket, which every bar is drawn relative to. */
  highest: number;
}) {
  const meta = describe(APPLICATION_STATUS, status);

  return (
    <li className="flex items-center gap-3">
      <span className="w-36 shrink-0">
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </span>
      <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-sunken">
        <span className="block h-full rounded-full bg-brand" style={{ width: barWidth(count, highest) }} />
      </span>
      <span className="w-8 shrink-0 text-right text-sm font-medium tabular-nums text-ink">
        {count}
      </span>
    </li>
  );
}
