import { cx } from "@/lib/cx";
import { PREVIEW_VIEWS } from "@/components/landing/hero/dashboard-preview/dashboardPreview.constants";

/** Progress pips under the window, mirroring the timer. */
export function PreviewProgress({ active }: { active: number }) {
  return (
    <div className="mt-4 flex justify-center gap-1.5">
      {PREVIEW_VIEWS.map((name, index) => (
        <span
          key={name}
          className={cx(
            "h-1 rounded-full transition-all duration-500",
            index === active ? "w-7 bg-brand" : "w-1.5 bg-border-strong",
          )}
        />
      ))}
    </div>
  );
}
