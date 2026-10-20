import { cx } from "@/lib/cx";
import { PREVIEW_PIPELINE, PREVIEW_STATS } from "@/components/landing/hero/dashboard-preview/dashboardPreview.constants";

export function OverviewPane() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {PREVIEW_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-surface p-2 animate-rise"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
          >
            <p className="truncate text-[8px] font-medium tracking-wide text-ink-subtle uppercase">
              {stat.label}
            </p>
            <p className={cx("mt-0.5 text-lg leading-none font-semibold tabular-nums", stat.tone)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-warn/25 bg-warn-soft/50 p-2.5">
        <p className="text-[10px] font-semibold text-warn">Needs you this week</p>
        <div className="mt-1.5 flex items-center justify-between rounded-md bg-surface/70 px-2 py-1.5">
          <span className="text-[10px] font-medium">Datadog · assignment</span>
          <span className="text-[10px] font-semibold text-warn">in 2 days</span>
        </div>
      </div>

      <div className="rounded-lg border border-border p-2.5">
        <p className="mb-2 text-[10px] font-semibold">Where they stand</p>
        <div className="space-y-1.5">
          {PREVIEW_PIPELINE.map((row, index) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="w-16 shrink-0 truncate text-[9px] text-ink-muted">{row.label}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-sunken">
                <span
                  className={cx("bar-grow block h-full rounded-full", row.tone)}
                  style={{ width: row.width, animationDelay: `${index * 90}ms` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
