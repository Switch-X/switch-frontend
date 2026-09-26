import { cx } from "@/lib/cx";
import type { JourneyStage } from "@/components/landing/types/journey";

/** The record itself, as the app would store it. */
export function StageRecord({ stage }: { stage: JourneyStage }) {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">
        What SWITCH keeps
      </p>
      <dl className="mt-4 space-y-3">
        {stage.fields.map((field, index) => (
          <div
            key={`${stage.key}-${field.label}`}
            className="flex animate-rise items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
            style={{ animationDelay: `${index * 70}ms`, animationFillMode: "backwards" }}
          >
            <dt className="shrink-0 text-sm text-ink-subtle">{field.label}</dt>
            <dd className={cx("text-right text-sm font-medium", field.accent ?? "text-ink")}>
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
