import type { ReactNode } from "react";
import { Reveal } from "@/components/landing/shared/Reveal";
import { SpotlightTile } from "./SpotlightTile";

/** One cell of the grid: revealed on scroll, lit under the cursor, content passed straight through. */
export function BentoTile({
  delay,
  className,
  children,
}: {
  delay?: number;
  /** Placement in the grid - `md:col-span-2` for the wide ones. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <SpotlightTile className="h-full">{children}</SpotlightTile>
    </Reveal>
  );
}
