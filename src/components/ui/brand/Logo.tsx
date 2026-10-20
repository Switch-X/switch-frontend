import { cx } from "@/lib/cx";

/**
 * The SWITCH logo: a mark, and the word beside it.
 *
 * <p>One component rather than the four hand-rolled copies this replaces - the landing header,
 * the landing footer, the app sidebar and the mobile header each had their own span with its own
 * sizing, which is how a wordmark ends up three slightly different sizes on one site.
 *
 * <p>The glyph is two arrows swapping places. It is the one picture this product can own: a
 * sparkle says "something nice happens here" and belongs to every SaaS landing page ever made,
 * where a swap says what the thing is actually for. Drawn here rather than in `icons.tsx`
 * because it is not an icon - nothing else should ever use it, and it is sized and weighted for
 * the mark alone.
 */

type LogoProps = {
  /** The word's colour. `white` for dark surfaces, `ink` for light ones. */
  tone?: "ink" | "white";
  size?: "sm" | "md" | "lg";
  /** False for the places with no room for the word - a collapsed rail, a narrow bar. */
  showWord?: boolean;
  className?: string;
};

const MARK = {
  sm: "size-8 rounded-[0.6rem]",
  md: "size-9 rounded-xl",
  lg: "size-11 rounded-[0.9rem]",
};

const GLYPH = { sm: "size-[1.1rem]", md: "size-5", lg: "size-6" };

const WORD = {
  sm: "text-[0.95rem]",
  md: "text-lg",
  lg: "text-xl",
};

function LogoMark({ size = "md", className }: { size?: LogoProps["size"]; className?: string }) {
  return (
    <span
      className={cx(
        // The gradient runs brand -> accent, the same two colours the rest of the page uses for
        // emphasis, so the mark belongs to the palette rather than sitting on top of it.
        "relative flex shrink-0 items-center justify-center bg-gradient-to-br from-brand to-accent text-white",
        // A hairline of white inside the corner keeps the mark from looking flat on dark
        // backgrounds, where a solid shape and the surface behind it blur together.
        "shadow-sm ring-1 ring-white/15 ring-inset",
        MARK[size ?? "md"],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={GLYPH[size ?? "md"]}
      >
        {/* Out one way, back the other: the move this app exists to keep track of. */}
        <path d="M5 9h12" />
        <path d="M14 6l3 3-3 3" />
        <path d="M19 15H7" />
        <path d="M10 12l-3 3 3 3" />
      </svg>
    </span>
  );
}

export function Logo({ tone = "ink", size = "md", showWord = true, className }: LogoProps) {
  return (
    <span className={cx("flex items-center gap-2.5", className)}>
      <LogoMark size={size} />
      {showWord && (
        <span
          className={cx(
            // Tight tracking and the display face: six capitals set loose read as a label, set
            // tight they read as a name.
            "font-display font-extrabold tracking-[-0.03em] transition-colors",
            WORD[size ?? "md"],
            tone === "white" ? "text-white" : "text-ink",
          )}
        >
          SWITCH
        </span>
      )}
    </span>
  );
}
