import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Reveal } from "./Reveal";

/** A band of the page, with the small eyebrow and heading most of them open with. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tinted,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  /** The paragraph under the heading. Sections without one get the same gap anyway. */
  intro?: ReactNode;
  children: ReactNode;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      // `scroll-mt-20` offsets the fixed header, so an anchor jump does not park the heading
      // underneath it.
      className={cx(
        "scroll-mt-20",
        tinted ? "border-y border-border bg-surface-sunken/50 py-20 sm:py-24" : "py-20 sm:py-24",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {(eyebrow || title) && (
          <Reveal className={cx("text-center", intro ? "mb-4" : "mb-10")}>
            {eyebrow && (
              <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
            )}
          </Reveal>
        )}
        {intro && (
          <p className="mx-auto mb-10 max-w-2xl text-center text-lg leading-relaxed text-ink-muted">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
