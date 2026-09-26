import { cx } from "@/lib/cx";
import {
  PREVIEW_APPLICATIONS,
  PREVIEW_FILTERS,
} from "@/components/landing/constants/dashboardPreview";

export function ApplicationsPane() {
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {PREVIEW_FILTERS.map((chip) => (
          <span
            key={chip}
            className="rounded-md border border-border-strong px-1.5 py-1 text-[9px] text-ink-muted"
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[1.6fr_0.9fr_0.6fr] gap-2 border-b border-border bg-surface-muted px-2.5 py-1.5 text-[8px] font-semibold tracking-wide text-ink-subtle uppercase">
          <span>Company</span>
          <span>Status</span>
          <span className="text-right">Deadline</span>
        </div>
        {PREVIEW_APPLICATIONS.map((row, index) => (
          <div
            key={row.company}
            className="grid animate-rise grid-cols-[1.6fr_0.9fr_0.6fr] items-center gap-2 border-b border-border px-2.5 py-2 last:border-0"
            style={{ animationDelay: `${index * 70}ms`, animationFillMode: "backwards" }}
          >
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-medium">{row.company}</span>
              <span className="block truncate text-[9px] text-ink-subtle">{row.role}</span>
            </span>
            <span className={cx("justify-self-start rounded px-1.5 py-0.5 text-[8px] font-medium", row.tone)}>
              {row.badge}
            </span>
            <span
              className={cx(
                "text-right text-[9px] font-medium",
                row.urgent ? "text-bad" : "text-ink-muted",
              )}
            >
              {row.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
