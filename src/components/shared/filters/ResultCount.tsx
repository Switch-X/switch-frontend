import { formatCount } from "@/lib/format";

/** The count at the end of a filter strip, pushed to the right edge. */
export function ResultCount({
  loading,
  count,
  noun,
}: {
  loading: boolean;
  count: number;
  noun: string;
}) {
  return (
    <span className="ml-auto text-sm text-ink-muted">
      {loading ? "Loading…" : formatCount(count, noun)}
    </span>
  );
}
