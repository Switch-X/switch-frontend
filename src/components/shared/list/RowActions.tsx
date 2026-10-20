import { Icon } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/button/IconButton";

/**
 * The buttons in the last cell of a table row.
 *
 * <p>`onWorkflow` is optional: only applications have a walkthrough to open, and the other
 * tables pass nothing rather than a disabled button nobody can use.
 */
export function RowActions({
  onEdit,
  onDelete,
  onWorkflow,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onWorkflow?: () => void;
}) {
  return (
    <td className="px-5 py-3.5">
      <div className="flex justify-end gap-1">
        {onWorkflow && (
          <IconButton label="Workflow" onClick={onWorkflow}>
            <Icon.Clock className="size-4" />
          </IconButton>
        )}
        <IconButton label="Edit" onClick={onEdit}>
          <Icon.Pencil className="size-4" />
        </IconButton>
        <IconButton label="Delete" danger onClick={onDelete}>
          <Icon.Trash className="size-4" />
        </IconButton>
      </div>
    </td>
  );
}
