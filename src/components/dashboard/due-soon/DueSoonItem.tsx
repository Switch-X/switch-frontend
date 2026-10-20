import Link from "next/link";
import { cx } from "@/lib/cx";
import { daysUntil, deadlineIn, formatDate } from "@/lib/format";
import { Icon } from "@/components/ui/icons";
import type { DueItem } from "@/components/dashboard/due-soon/dueItem.types";

export function DueSoonItem({ item }: { item: DueItem }) {
  const days = daysUntil(item.date);
  const overdue = days !== null && days < 0;

  return (
    <li>
      <Link href={item.href} className="flex items-center gap-3 px-5 py-3 transition hover:bg-surface/60">
        <span
          className={cx(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            overdue ? "bg-bad-soft text-bad" : "bg-warn-soft text-warn",
          )}
        >
          <Icon.Calendar className="size-[18px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-ink">{item.title}</span>
          <span className="block truncate text-xs text-ink-subtle">
            {item.kind} · {item.subtitle}
          </span>
        </span>
        <span
          className={cx("shrink-0 text-right text-sm font-medium", overdue ? "text-bad" : "text-warn")}
        >
          {deadlineIn(item.date)}
          <span className="block text-xs font-normal text-ink-subtle">{formatDate(item.date)}</span>
        </span>
      </Link>
    </li>
  );
}
