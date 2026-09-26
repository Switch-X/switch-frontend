"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { useSpotlight } from "@/components/landing/hooks/useSpotlight";

/** A card that lights up under the cursor. Only the card is a client component, not what is in it. */
export function SpotlightTile({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(
        "spotlight group relative overflow-hidden rounded-card border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-ring hover:shadow-[0_18px_40px_-18px_rgba(91,47,232,0.32)]",
        className,
      )}
    >
      {/* Above the spotlight pseudo-element, which paints at the card's own stacking level. */}
      <div className="relative">{children}</div>
    </div>
  );
}
