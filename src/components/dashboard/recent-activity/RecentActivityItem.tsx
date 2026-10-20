import { APPLICATION_STATUS, describe } from "@/lib/enums";
import type { ApplicationView } from "@/components/applications/applications.types";
import { Badge } from "@/components/ui/display/Badge";
import { Icon } from "@/components/ui/icons";

export function RecentActivityItem({ application }: { application: ApplicationView }) {
  const meta = describe(APPLICATION_STATUS, application.applicationStatus);

  return (
    <li className="flex items-center gap-3 px-5 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-sunken text-ink-muted">
        <Icon.Building className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-ink">
          {application.companyName}
        </span>
        <span className="block truncate text-xs text-ink-subtle">
          {application.jobProfile ?? "Role not set"}
        </span>
      </span>
      <Badge tone={meta.tone}>{meta.label}</Badge>
    </li>
  );
}
