/**
 * The aurora behind the hero: two blurred blobs on different animation periods.
 *
 * <p>Cheap - two composited layers, no repaint - and it stops the top of the page from being a
 * flat rectangle of one colour, which is most of what reads as "static site" at a glance.
 */
export function HeroBackground() {
  return (
    <>
      {/* Decorative only - hidden from the accessibility tree entirely. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Two blurred blobs on different periods. On a dark ground they can be the real brand
            colours at full strength rather than the tints a light page forces you down to. */}
        <div
          className="aurora-blob absolute -top-48 -left-40 size-[680px] rounded-full opacity-45 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-brand), transparent 62%)" }}
        />
        <div
          className="aurora-blob absolute -top-32 right-[-8%] size-[620px] rounded-full opacity-35 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--color-accent), transparent 62%)",
            animationDelay: "-8s",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/3 size-[520px] rounded-full opacity-25 blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--color-brand-ring), transparent 65%)" }}
        />

        {/* Grid, masked so it fades out well before it reaches the headline. */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-night-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-night-line) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 85% 60% at 50% 0%, black 25%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 60% at 50% 0%, black 25%, transparent 78%)",
          }}
        />
      </div>

      {/* Hands the band off to the paper below instead of ending on a hard line. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas"
      />
    </>
  );
}
