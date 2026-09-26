import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/icons";
import { EXAMPLE_ROUNDS } from "@/components/landing/constants/exampleRounds";
import { TileHeading } from "../TileHeading";

export function RoundsTile() {
  return (
    <>
      <TileHeading icon={Icon.Interviews} title="A five-round loop is one thread">
        Each round keeps its own interviewer, format, difficulty, outcome, and the questions you
        were actually asked — the notes that pay off three interviews later.
      </TileHeading>

      <div className="mt-5 space-y-2">
        {EXAMPLE_ROUNDS.map((round, index) => (
          <div
            key={round.name}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface-muted px-3 py-2"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-[11px] font-semibold text-ink-muted">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{round.name}</span>
              <span className="block truncate text-xs text-ink-subtle">{round.meta}</span>
            </span>
            <span className={cx("shrink-0 rounded px-2 py-0.5 text-[11px] font-medium", round.tone)}>
              {round.badge}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
