import type { ExperiencedProfileDto } from "@/lib/types";
import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/icons";
import { Input } from "@/components/ui/form/Input";

export function EmploymentRow({
  row,
  onChange,
  onRemove,
}: {
  row: ExperiencedProfileDto;
  onChange: (patch: Partial<ExperiencedProfileDto>) => void;
  onRemove: () => void;
}) {
  return (
    <li className="grid gap-3 rounded-lg border border-border bg-surface-muted p-3 sm:grid-cols-[1fr_1fr_86px_86px_auto]">
      <Input
        aria-label="Company"
        placeholder="Company"
        value={row.companyName}
        onChange={(event) => onChange({ companyName: event.target.value })}
      />
      <Input
        aria-label="Role"
        placeholder="Role"
        value={row.profile}
        onChange={(event) => onChange({ profile: event.target.value })}
      />
      <Input
        aria-label="Years"
        type="number"
        min={0}
        max={60}
        placeholder="Yrs"
        value={row.yearsStayed}
        onChange={(event) => onChange({ yearsStayed: Number(event.target.value) })}
      />
      <Input
        aria-label="Months"
        type="number"
        min={0}
        max={11}
        placeholder="Mos"
        value={row.monthsStayed}
        onChange={(event) => onChange({ monthsStayed: Number(event.target.value) })}
      />
      <div className="flex items-center justify-end">
        <IconButton label="Remove this role" danger onClick={onRemove}>
          <Icon.Trash className="size-4" />
        </IconButton>
      </div>
    </li>
  );
}
