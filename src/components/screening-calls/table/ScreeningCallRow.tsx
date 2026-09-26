import { PROCEEDING_VIA, SCREENING_OUTCOME, describe } from "@/lib/enums";
import { formatDateShort, formatDuration, relativeDay } from "@/lib/format";
import type { ScreeningCallView } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { DataTableRow } from "@/components/shared/list/DataTable";
import { RowActions } from "@/components/shared/list/RowActions";

/**
 * One call.
 *
 * <p>The company column falls back to the call's own `companyName` before the linked
 * application's. A cold recruiter call is the common case here and has no application behind it,
 * which is exactly why the backend keeps `companyName` on the call itself.
 */
export function ScreeningCallRow({
  call,
  linked,
  onEdit,
  onDelete,
}: {
  call: ScreeningCallView;
  /** The linked application's company, when there is one and it is in the loaded page. */
  linked: string | null;
  onEdit: (call: ScreeningCallView) => void;
  onDelete: (call: ScreeningCallView) => void;
}) {
  const outcome = describe(SCREENING_OUTCOME, call.proceeding);
  const via = describe(PROCEEDING_VIA, call.callReceivedVia);

  return (
    <DataTableRow>
      <td className="px-5 py-3.5">
        <div className="font-medium text-ink">{call.companyName ?? linked ?? "Not recorded"}</div>
        {linked && call.companyName && linked !== call.companyName && (
          <div className="text-xs text-ink-subtle">Linked to {linked}</div>
        )}
        {!linked && call.applicationId === null && (
          <div className="text-xs text-ink-subtle">Not linked</div>
        )}
      </td>
      <td className="px-3 py-3.5 text-ink-muted">{call.hrName ?? "—"}</td>
      <td className="px-3 py-3.5">
        <Badge tone={outcome.tone}>{outcome.label}</Badge>
      </td>
      <td className="px-3 py-3.5">
        <Badge tone={via.tone}>{via.label}</Badge>
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap text-ink-muted">
        {formatDateShort(call.contactedOn)}
        {call.contactedOn && (
          <span className="ml-1.5 text-xs text-ink-subtle">{relativeDay(call.contactedOn)}</span>
        )}
      </td>
      <td className="px-3 py-3.5 whitespace-nowrap text-ink-muted">
        {formatDuration(call.discussionDuration)}
      </td>
      <RowActions onEdit={() => onEdit(call)} onDelete={() => onDelete(call)} />
    </DataTableRow>
  );
}
