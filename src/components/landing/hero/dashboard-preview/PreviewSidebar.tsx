import { cx } from "@/lib/cx";
import { PREVIEW_NAV } from "@/components/landing/hero/dashboard-preview/dashboardPreview.constants";

/** The real sidebar, shrunk, with the active row following the cycle. */
export function PreviewSidebar({ active }: { active: number }) {
  return (
    <div className="hidden w-[124px] shrink-0 border-r border-border bg-surface-muted/60 p-2.5 sm:block">
      <div className="mb-3 flex items-center gap-1.5 px-1.5 py-1">
        <span className="size-5 rounded-md bg-gradient-to-br from-brand to-accent" />
        <span className="text-[11px] font-semibold">SWITCH</span>
      </div>
      {PREVIEW_NAV.map((item, index) => (
        <div
          key={item}
          className={cx(
            "mb-0.5 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[10px] transition-colors duration-500",
            index === active ? "bg-brand-soft font-semibold text-brand" : "text-ink-subtle",
          )}
        >
          <span
            className={cx(
              "size-1.5 rounded-sm transition-colors duration-500",
              index === active ? "bg-brand" : "bg-border-strong",
            )}
          />
          {item}
        </div>
      ))}
    </div>
  );
}
