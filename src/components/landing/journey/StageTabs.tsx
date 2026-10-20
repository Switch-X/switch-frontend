import { cx } from "@/lib/cx";
import type { JourneyStage } from "@/components/landing/journey/journey.types";

/**
 * The stage rail. Horizontally scrollable on a phone rather than wrapped into two rows, which
 * would break the left-to-right "journey" reading that is the whole point.
 */
export function StageTabs({
  stages,
  active,
  onSelect,
}: {
  stages: JourneyStage[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      <div
        role="tablist"
        aria-label="Stages of a job search"
        className="flex min-w-max items-center gap-1 rounded-full border border-border bg-surface p-1.5 shadow-sm sm:min-w-0"
      >
        {stages.map((item, index) => (
          <button
            key={item.key}
            // A <button> with no type reports "submit". Harmless outside a form, but it makes
            // these tabs indistinguishable from a real submit button to anything scanning the
            // DOM - and it is one attribute to be correct instead.
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => onSelect(index)}
            className={cx(
              "relative flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium whitespace-nowrap transition",
              index === active
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:bg-surface-sunken hover:text-ink",
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
