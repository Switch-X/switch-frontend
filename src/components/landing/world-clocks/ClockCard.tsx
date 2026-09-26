import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { formatClock, isQuiet, minutesNowIn } from "@/components/landing/utils/clock";
import type { ClockPlace } from "@/components/landing/types/worldClocks";

/** One city's clock. Goes dark while that person's quiet hours are running. */
export function ClockCard({ place, live }: { place: ClockPlace; live: boolean }) {
  const nowMinutes = live ? minutesNowIn(place.zone) : null;
  const quiet = nowMinutes !== null && isQuiet(nowMinutes, place.quiet);

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-card border p-5 transition-colors duration-700",
        quiet ? "border-ink/15 bg-ink text-white" : "border-border bg-surface text-ink shadow-sm",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={cx("text-sm font-semibold", quiet ? "text-white" : "text-ink")}>
            {place.person}
          </p>
          <p className={cx("text-xs", quiet ? "text-white/60" : "text-ink-subtle")}>{place.city}</p>
        </div>
        <span
          className={cx(
            "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-700",
            quiet ? "bg-white/10 text-white/80" : "bg-brand-soft text-brand",
          )}
        >
          {quiet ? <Icon.Moon className="size-4" /> : <Icon.Clock className="size-4" />}
        </span>
      </div>

      {/* Fixed height and tabular figures, so the row does not jump every second. */}
      <p
        className={cx(
          "mt-4 font-display text-4xl leading-none font-semibold tabular-nums",
          quiet ? "text-white" : "text-ink",
        )}
      >
        {live ? formatClock(place.zone) : "--:--"}
      </p>

      <p className={cx("mt-3 text-xs", quiet ? "text-white/60" : "text-ink-subtle")}>{place.zone}</p>

      <p className={cx("mt-1 text-xs font-medium", quiet ? "text-white/85" : "text-ink-muted")}>
        {!live
          ? " "
          : quiet
            ? `Quiet until ${place.quiet.end} — nothing sent`
            : `Quiet from ${place.quiet.start}`}
      </p>
    </div>
  );
}
