/** An on/off filter, drawn to sit in line with the selects beside it. */
export function CheckboxFilter({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border-strong px-3 py-2 text-sm text-ink-muted transition hover:bg-surface-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-[var(--color-brand)]"
      />
      {label}
    </label>
  );
}
