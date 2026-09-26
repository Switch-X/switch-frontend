/** The footer's lit top edge and faint grid. Purely decorative. */
export function FooterDecor() {
  return (
    <>
      {/* A single lit hairline along the top edge, brightest in the middle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-brand) 30%, var(--color-accent) 70%, transparent)",
          opacity: 0.55,
        }}
      />
      {/* Faint grid, faded out before it reaches the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 70%)",
        }}
      />
    </>
  );
}
