import { cx } from "@/lib/cx";
import { Reveal } from "@/components/landing/shared/Reveal";
import { Section } from "@/components/landing/shared/Section";
import { NEEDS_YOU, URGENCY } from "./needsYou.constants";

/**
 * The one thing this page promises three times and never showed.
 *
 * <p>"Tells you what needs you today" appears in the hero, in the footer and on a feature tile,
 * and until now a visitor had to take it on faith. This is that list, with the dates the real
 * one would be showing - including a late one, because the block is built to keep overdue work
 * on screen rather than let it fall quietly off the end of the window.
 *
 * <p>A server component. Only the per-row reveal runs in the browser.
 */
export function NeedsYouSection() {
  return (
    <Section
      eyebrow="The short list"
      title="Four things, not forty"
      intro="A job search generates more open loops than anyone can hold. This is the only screen that matters on a Monday: what is late, what is close, and nothing else."
    >
      <ul className="mx-auto max-w-3xl overflow-hidden rounded-card border border-border bg-surface">
        {NEEDS_YOU.map((row, index) => {
          const look = URGENCY[row.urgency];
          const Glyph = row.icon;

          return (
            <Reveal as="li" key={`${row.company}-${row.kind}`} delay={index * 90}>
              <div className="relative flex items-center gap-4 border-b border-border px-5 py-4 last:border-0 sm:px-6">
                {/* The edge carries the urgency before any of the words do. */}
                <span
                  aria-hidden="true"
                  className={cx("absolute inset-y-0 left-0 w-1", look.edge)}
                />

                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-sunken text-ink-muted">
                  <Glyph className="size-4" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cx(
                      "inline-block rounded px-1.5 py-0.5 text-[11px] font-medium",
                      look.chip,
                    )}
                  >
                    {row.kind}
                  </span>
                  <span className="mt-1 block truncate text-sm font-semibold text-ink">
                    {row.company}
                  </span>
                  <span className="block truncate text-xs text-ink-subtle">{row.role}</span>
                </span>

                <span
                  className={cx("shrink-0 text-sm font-semibold tabular-nums", look.when)}
                >
                  {row.when}
                </span>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <p className="mt-5 text-center text-sm text-ink-subtle">
        Overdue work stays on the list. Dropping it the day it goes late is how it gets forgotten.
      </p>
    </Section>
  );
}
