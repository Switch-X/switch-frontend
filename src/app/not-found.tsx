import Link from "next/link";
import { cx } from "@/lib/cx";
import { buttonClass } from "@/components/ui/button/Button";
import { Logo } from "@/components/ui/brand/Logo";
import { Icon } from "@/components/ui/icons";

/**
 * The page for a URL that is not one of ours.
 *
 * <p>It borrows the product's own picture rather than reaching for a cartoon: a trail of steps
 * that goes along fine and then stops, with the line into the last one dashed and the node
 * itself empty. That is exactly what has happened - there was a path here and it does not lead
 * anywhere - and it says so without a paragraph of apology.
 *
 * <p>Both ways out are offered because this page cannot know which one is wanted. Whether
 * somebody is signed in is a cookie this code cannot read, answered only by asking, and
 * guessing wrong means sending a signed-out visitor to a dashboard that bounces them back.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* The same light the hero sits in, turned down. Decoration, so it is hidden from readers
          who are being read to. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 25%, var(--color-brand-soft), transparent 70%), radial-gradient(40% 40% at 70% 75%, var(--color-accent-soft), transparent 70%)",
        }}
      />

      <Link href="/" className="mb-14">
        <Logo size="lg" />
      </Link>

      {/* The trail, running out. Three steps that happened, then a line that gives up. */}
      <div aria-hidden="true" className="mb-10 flex items-center">
        {[
          { tone: "bg-info", ring: "ring-info/20", glyph: Icon.Applications },
          { tone: "bg-accent", ring: "ring-accent/20", glyph: Icon.Screening },
          { tone: "bg-brand", ring: "ring-brand/20", glyph: Icon.Interviews },
        ].map((step, index) => {
          const Glyph = step.glyph;
          return (
            <span key={index} className="flex items-center">
              <span
                className={cx(
                  "flex size-10 items-center justify-center rounded-full text-white ring-4",
                  step.tone,
                  step.ring,
                )}
              >
                <Glyph className="size-[18px]" />
              </span>
              <span className="h-px w-8 bg-border-strong sm:w-12" />
            </span>
          );
        })}

        {/* Where the path stops: a dashed run into an empty outline. */}
        <span className="h-px w-8 border-t border-dashed border-border-strong sm:w-12" />
        <span className="flex size-10 items-center justify-center rounded-full border-2 border-dashed border-border-strong text-ink-subtle">
          <Icon.Close className="size-4" />
        </span>
      </div>

      <p className="font-display text-sm font-bold tracking-[0.2em] text-ink-subtle uppercase">
        404
      </p>

      <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-ink sm:text-4xl">
        This one goes nowhere
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
        The page you asked for is not here — moved, mistyped, or never written. Your own trail is
        exactly where you left it.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/dashboard" className={buttonClass({ className: "px-5 py-2.5" })}>
          Go to your dashboard
          <Icon.ArrowRight className="size-4" />
        </Link>
        <Link
          href="/"
          className={buttonClass({ variant: "secondary", className: "px-5 py-2.5" })}
        >
          Back to the start
        </Link>
      </div>
    </main>
  );
}
