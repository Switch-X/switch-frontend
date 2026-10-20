import { APPLICATION_STATUS, REFERRAL, SOURCE, describe } from "@/lib/enums";
import { daysUntil, formatDateShort, formatInstant } from "@/lib/format";
import type { ApplicationView } from "@/components/applications/applications.types";
import { Badge } from "@/components/ui/display/Badge";
import { DataTableRow } from "@/components/shared/list/DataTable";
import { DueDate } from "@/components/shared/list/DueDate";
import { RowActions } from "@/components/shared/list/RowActions";
import { deadlineTone } from "@/components/applications/applicationList.utils";

/**
 * One application. The deadline cell carries its own urgency colour rather than leaving the
 * reader to compare dates - that is the column people open this page for.
 */
export function ApplicationRow({
  application,
  onEdit,
  onDelete,
  onWorkflow,
}: {
  application: ApplicationView;
  onEdit: (application: ApplicationView) => void;
  onDelete: (application: ApplicationView) => void;
  onWorkflow: (application: ApplicationView) => void;
}) {
  const status = describe(APPLICATION_STATUS, application.applicationStatus);
  const source = describe(SOURCE, application.source);
  const referral = describe(REFERRAL, application.referral);

  return (
    <DataTableRow>
      <td className="px-5 py-3.5">
        <div className="font-medium text-ink">{application.companyName}</div>
        <div className="text-xs text-ink-subtle">
          {application.jobProfile ?? "Role not set"}
          {application.jobId && ` · ${application.jobId}`}
        </div>
      </td>
      <td className="px-3 py-3.5">
        <Badge tone={status.tone}>{status.label}</Badge>
      </td>
      <td className="px-3 py-3.5">
        {application.source ? (
          <Badge tone={source.tone}>{source.label}</Badge>
        ) : (
          <span className="text-ink-subtle">—</span>
        )}
      </td>
      <td className="px-3 py-3.5">
        {application.referral ? (
          <Badge tone={referral.tone}>{referral.label}</Badge>
        ) : (
          <span className="text-ink-subtle">—</span>
        )}
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap text-ink-muted">
        {formatDateShort(application.appliedOn)}
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap">
        <DueDate
          date={application.applyBefore}
          tone={deadlineTone(daysUntil(application.applyBefore))}
        />
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap text-xs text-ink-subtle">
        {formatInstant(application.lastActivity)}
      </td>
      <RowActions
        onEdit={() => onEdit(application)}
        onDelete={() => onDelete(application)}
        onWorkflow={() => onWorkflow(application)}
      />
    </DataTableRow>
  );
}
