import { Reveal } from "@/components/landing/shared/Reveal";
import { WorkflowTrail } from "./WorkflowTrail";

/**
 * The one band on this page that runs edge to edge.
 *
 * <p>It does not use `Section`, which centres its children inside `max-w-7xl`. The trail is the
 * picture here, and a path that stops short of both edges reads as a diagram someone placed on
 * the page rather than something running across it. The heading above it keeps the measure every
 * other section uses, because a line of prose stretched to 1900px is unreadable.
 *
 * <p>No card, no tint, no border. The background it sits on is the page's own.
 */
export function WorkflowSection() {
  return (
    <section className="scroll-mt-20 overflow-hidden py-20 sm:py-24">
      <Reveal className="mx-auto mb-14 max-w-2xl px-5 text-center sm:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          Never lose the thread
        </p>
        <h2 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
          Every application keeps its own trail
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Each step is written the moment it happens, so months later the whole run is still
          there in the order it really went — not pieced back together from dates you half
          remember.
        </p>
      </Reveal>

      {/* The gutter is small on purpose: enough that the first and last nodes are not touching
          the edge of the screen, not so much that the path stops looking like it crosses it. */}
      <div className="px-6 sm:px-10">
        <WorkflowTrail />
      </div>
    </section>
  );
}
