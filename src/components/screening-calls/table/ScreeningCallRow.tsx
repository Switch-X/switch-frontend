import { PROCEEDING_VIA, SCREENING_OUTCOME, describe } from "@/lib/enums";
import { formatDateShort, formatDuration, relativeDay } from "@/lib/format";
import type { ScreeningCallView } from "@/components/screening-calls/screeningCalls.types";
import { Badge } from "@/components/ui/display/Badge";
import { DataTableRow } from "@/components/shared/list/DataTable";
import { RowActions } from "@/components/shared/list/RowActions";

/**
 * One call.
 *
 * <p>`companyName` is filled in either way now - from the linked application when there is one,
 * from the call's own column when there is not - so the column no longer has to pick between two
 * half-answers. The line under it names the application, with its role, when the call came
 * through one.
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
        <div className="font-medium text-ink">{call.companyName ?? "Not recorded"}</div>
        <div className="text-xs text-ink-subtle">{linked ?? "Not linked"}</div>
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
