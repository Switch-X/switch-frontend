import { cx } from "@/lib/cx";
import { EXAMPLE_ROUNDS } from "@/components/landing/exampleRounds.constants";

export function InterviewsPane() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-border">
        <div className="flex items-center justify-between border-b border-border px-2.5 py-2">
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-semibold">Stripe — Backend Engineer</span>
            <span className="block text-[9px] text-ink-subtle">17 Sep · 3 rounds</span>
          </span>
          <span className="rounded bg-good-soft px-1.5 py-0.5 text-[8px] font-medium text-good">
            Upcoming
          </span>
        </div>
        {EXAMPLE_ROUNDS.map((round, index) => (
          <div
            key={round.name}
            className="flex animate-rise items-center gap-2 border-b border-border px-2.5 py-2 last:border-0"
            style={{ animationDelay: `${index * 90}ms`, animationFillMode: "backwards" }}
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-[8px] font-semibold text-ink-muted">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-medium">{round.name}</span>
              <span className="block truncate text-[9px] text-ink-subtle">{round.meta}</span>
            </span>
            <span className={cx("shrink-0 rounded px-1.5 py-0.5 text-[8px] font-medium", round.tone)}>
              {round.badge}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-surface-muted p-2.5">
        <p className="text-[8px] font-semibold tracking-wide text-ink-subtle uppercase">
          Questions asked
        </p>
        <p className="mt-1 text-[9px] leading-relaxed text-ink-muted">
          1. Design an idempotent payment capture API
          <br />
          2. How would you make retries safe across a partition?
        </p>
      </div>
    </div>
  );
}
