"use client";

/**
 * One application's run, drawn as a path across the whole screen.
 *
 * <p>Nothing is drawn around it. Every other band on this page puts its content in a card, and
 * the argument this section makes is that the trail is not a feature sitting inside the product
 * - it is what the product leaves behind.
 *
 * <p>Six steps in one row on a wide screen, because that is the shape the trail actually has:
 * applied, then screened, then a take-home, then rounds, then an answer. Folding it into two
 * rows on a screen this wide would leave a third of the width empty between nodes and add a
 * bend that means nothing. Below `lg` there is no room for a row, so it becomes the vertical
 * rail the real Workflows page uses - the same steps and the same colours, turned ninety degrees.
 *
 * <p>The line travels. A spark runs ahead of each segment as it draws, so the eye is carried
 * from one step to the next rather than watching six lines get longer at once.
 */

import { cx } from "@/lib/cx";
import { prefersReducedMotion } from "@/lib/motion";
import { useInView } from "@/components/landing/useInView";
import {
  TRAIL_STEP_MS,
  WORKFLOW_TRAIL,
} from "@/components/landing/workflow/workflowTrail.constants";

/** How long a segment takes to draw. The spark crosses in the same time. */
const DRAW_MS = 520;
/** The node lands first; its outgoing line starts as it settles. */
const NODE_MS = 460;

/** Node centre, measured from the top of a step. `size-11` is 2.75rem, so its middle is here. */
const CENTRE = "1.375rem";

export function WorkflowTrail() {
  const [ref, inView] = useInView<HTMLDivElement>();
  // Reduced motion gets the finished picture. Decided at render, so nothing animates once and
  // then corrects itself a frame later.
  const running = inView && !prefersReducedMotion();

  const at = (name: string, ms: number, delay: number) =>
    running ? { animation: `${name} ${ms}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` } : undefined;

  return (
    <div ref={ref}>
      {/* ------------------------------------------------ wide: one run across */}
      <ol className="hidden items-start lg:flex">
        {WORKFLOW_TRAIL.map((step, index) => {
          const Glyph = step.icon;
          const last = index === WORKFLOW_TRAIL.length - 1;
          const nodeAt = index * TRAIL_STEP_MS;
          const lineAt = nodeAt + NODE_MS * 0.55;

          return (
            <li key={step.label} className="relative flex flex-1 flex-col items-center text-center">
              {!last && (
                // Spans from this node's centre to the next one's: starts at the half-way point
                // of its own cell and runs the full width of a cell.
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 w-full"
                  style={{ top: CENTRE }}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-px origin-left bg-border-strong"
                    style={at("trail-line", DRAW_MS, lineAt)}
                  />
                  {/* The spark. Sized larger than the line it rides so it reads as a point of
                      light on the path rather than a thicker piece of the path. */}
                  <span
                    className={cx(
                      "absolute top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
                      step.dot,
                    )}
                    style={
                      running
                        ? { animation: `trail-spark ${DRAW_MS}ms ease-in-out ${lineAt}ms both` }
                        : { display: "none" }
                    }
                  />
                </span>
              )}

              <span
                className={cx(
                  "relative z-10 flex size-11 items-center justify-center rounded-full text-white ring-4",
                  step.dot,
                  step.ring,
                )}
                style={at("trail-node", NODE_MS, nodeAt)}
              >
                <Glyph className="size-5" />
              </span>

              <span className="mt-4 block px-3" style={at("trail-label", 420, nodeAt + 120)}>
                <span className="block text-sm font-semibold text-ink">{step.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                  {step.detail}
                </span>
                <span className="mt-1.5 block text-[11px] text-ink-subtle tabular-nums">
                  {step.when}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* ------------------------------------------- narrow: the same, turned down */}
      <ol className="mx-auto max-w-sm px-5 lg:hidden">
        {WORKFLOW_TRAIL.map((step, index) => {
          const Glyph = step.icon;
          const last = index === WORKFLOW_TRAIL.length - 1;
          const nodeAt = index * TRAIL_STEP_MS;
          const lineAt = nodeAt + NODE_MS * 0.55;

          return (
            <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-11 bottom-0 left-[1.375rem] w-px -translate-x-1/2"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-px origin-top bg-border-strong"
                    style={at("trail-line-y", DRAW_MS, lineAt)}
                  />
                  <span
                    className={cx(
                      "absolute left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
                      step.dot,
                    )}
                    style={
                      running
                        ? { animation: `trail-spark-y ${DRAW_MS}ms ease-in-out ${lineAt}ms both` }
                        : { display: "none" }
                    }
                  />
                </span>
              )}

              <span
                className={cx(
                  "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full text-white ring-4",
                  step.dot,
                  step.ring,
                )}
                style={at("trail-node", NODE_MS, nodeAt)}
              >
                <Glyph className="size-5" />
              </span>

              <span className="pt-1.5" style={at("trail-label", 420, nodeAt + 120)}>
                <span className="block text-sm font-semibold text-ink">{step.label}</span>
                <span className="mt-0.5 block text-xs text-ink-muted">{step.detail}</span>
                <span className="mt-1 block text-[11px] text-ink-subtle tabular-nums">
                  {step.when}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
