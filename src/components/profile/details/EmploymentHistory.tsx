import type { ExperiencedProfileDto } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { tenureOnRecord } from "@/components/profile/utils/detailsForm";
import { EmploymentRow } from "./EmploymentRow";

/** The roles on record, edited row by row, with their time added up underneath. */
export function EmploymentHistory({
  rows,
  onAdd,
  onChange,
  onRemove,
}: {
  rows: ExperiencedProfileDto[];
  onAdd: () => void;
  onChange: (index: number, patch: Partial<ExperiencedProfileDto>) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Employment history</span>
        <Button variant="subtle" size="sm" onClick={onAdd}>
          <Icon.Plus className="size-4" />
          Add a role
        </Button>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border-strong px-4 py-6 text-center text-sm text-ink-subtle">
          Nothing here yet. A fresher profile is a perfectly good answer.
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row, index) => (
            <EmploymentRow
              key={index}
              row={row}
              onChange={(patch) => onChange(index, patch)}
              onRemove={() => onRemove(index)}
            />
          ))}
        </ul>
      )}

      {rows.length > 0 && (
        <p className="mt-2 text-xs text-ink-subtle">
          Total on record: {tenureOnRecord(rows)}. Enter months as 0–11 on each row — a whole year
          belongs in the years box. The total above adds it all up for you.
        </p>
      )}
    </div>
  );
}
