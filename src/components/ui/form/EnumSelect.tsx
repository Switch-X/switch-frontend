import type { Tone } from "@/lib/enums";
import { Select } from "./Select";

/**
 * A `<Select>` over one of the enum tables, with a "no filter" or "not set" entry at the top.
 *
 * `value` is the empty string when nothing is chosen, and `onChange` reports `null` for it -
 * which is what the API client needs to leave the parameter off the request entirely.
 */
export function EnumSelect<T extends string>({
  table,
  value,
  onChange,
  placeholder = "Any",
  error,
  id,
  disabled,
}: {
  table: Record<string, { label: string; tone: Tone }>;
  value: T | null | undefined;
  onChange: (value: T | null) => void;
  placeholder?: string;
  error?: string;
  id?: string;
  disabled?: boolean;
}) {
  return (
    <Select
      id={id}
      error={error}
      disabled={disabled}
      value={value ?? ""}
      onChange={(event) => onChange((event.target.value || null) as T | null)}
    >
      <option value="">{placeholder}</option>
      {Object.entries(table).map(([key, entry]) => (
        <option key={key} value={key}>
          {entry.label}
        </option>
      ))}
    </Select>
  );
}
