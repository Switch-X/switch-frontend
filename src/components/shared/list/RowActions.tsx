import { Icon } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/IconButton";

/** The edit and delete buttons in the last cell of a table row. */
export function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <td className="px-5 py-3.5">
      <div className="flex justify-end gap-1">
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
