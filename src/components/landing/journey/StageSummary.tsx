import { cx } from "@/lib/cx";
import { STAGE_DWELL_MS } from "@/components/landing/journey/journey.constants";
import type { JourneyStage } from "@/components/landing/journey/journey.types";

/** The stage's headline and story. Keyed on the stage by its caller, so it animates in afresh. */
export function StageSummary({
  stage,
  position,
  total,
  paused,
}: {
  stage: JourneyStage;
  position: number;
  total: number;
  paused: boolean;
}) {
  return (
    <div
      className={cx(
        "animate-rise relative overflow-hidden rounded-card border border-border bg-gradient-to-br p-6 sm:p-8",
        stage.tone,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink-muted shadow-sm">
        <span className="relative flex size-2">
          <span className={cx("absolute inline-flex size-full rounded-full ping-soft", stage.dot)} />
          <span className={cx("relative inline-flex size-2 rounded-full", stage.dot)} />
        </span>
        Stage {position} of {total}
      </span>

      <h3 className="mt-4 text-2xl leading-tight font-semibold text-balance sm:text-3xl">
        {stage.headline}
      </h3>
      <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">{stage.body}</p>

      {/* Progress for the auto-advance. Keyed so it restarts with the stage, and it simply
          stops rather than resetting when paused. */}
      <div className="mt-6 h-1 w-full max-w-xs overflow-hidden rounded-full bg-surface-sunken">
        <div
          key={`${stage.key}-${paused}`}
          className="h-full rounded-full bg-brand"
          style={{
            animation: paused ? "none" : `bar-grow ${STAGE_DWELL_MS}ms linear both`,
            width: "100%",
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}
