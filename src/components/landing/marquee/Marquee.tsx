import { MARQUEE_ITEMS } from "@/components/landing/constants/marquee";

/**
 * A slow ticker of the things this actually tracks.
 *
 * <p>The track holds the list twice and travels exactly half its width, so the loop has no seam.
 * Masked at both edges so items fade rather than being chopped off by the viewport. All CSS - no
 * script, so it renders on the server like the rest of the page's static bands.
 */
export function Marquee() {
  return (
    <div
      className="marquee relative overflow-hidden border-y border-border bg-surface py-4"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center gap-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-8 text-sm font-medium text-ink-subtle"
            aria-hidden={index >= MARQUEE_ITEMS.length}
          >
            {item}
            <span className="size-1 rounded-full bg-border-strong" />
          </span>
        ))}
      </div>
    </div>
  );
}
