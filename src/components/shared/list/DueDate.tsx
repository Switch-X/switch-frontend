import { cx } from "@/lib/cx";
import { formatDateShort, relativeDay } from "@/lib/format";

/**
 * A deadline in a table cell: the date, how far off it is, and its urgency as a colour.
 *
 * <p>The colour is the caller's call - `tone` is a text class - because what counts as urgent
 * differs by record: a deadline to apply lapses on its own, a submitted assignment's never does.
 */
export function DueDate({ date, tone }: { date: string | null; tone: string }) {
  if (!date) return <span className="text-ink-subtle">—</span>;

  return (
    <span className={cx("font-medium", tone)}>
      {formatDateShort(date)}
      <span className="ml-1.5 text-xs font-normal opacity-80">{relativeDay(date)}</span>
    </span>
  );
}
