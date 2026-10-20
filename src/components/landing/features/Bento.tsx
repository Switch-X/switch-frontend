/**
 * The feature grid.
 *
 * <p>A bento: cards of unequal size, so the eye has somewhere to start instead of sweeping a row
 * of three identical boxes. The two largest carry a small piece of the real UI rather than an
 * icon, because showing the rejection-reasons list is worth more than the sentence describing it.
 *
 * <p>Every tile's content renders on the server; only the reveal and the cursor spotlight around
 * each one run in the browser (see `BentoTile`).
 */

import { BentoTile } from "./BentoTile";
import { DeadlinesTile } from "./tiles/DeadlinesTile";
import { QuietHoursTile } from "./tiles/QuietHoursTile";
import { RoundsTile } from "./tiles/RoundsTile";
import { StandaloneTile } from "./tiles/StandaloneTile";
import { StatusesTile } from "./tiles/StatusesTile";

export function Bento() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Wide tile: rounds, with a real fragment of the round list. */}
      <BentoTile className="md:col-span-2">
        <RoundsTile />
      </BentoTile>

      <BentoTile delay={80}>
        <DeadlinesTile />
      </BentoTile>

      <BentoTile delay={40}>
        <QuietHoursTile />
      </BentoTile>

      {/* Wide tile: statuses, shown as the actual badge set. */}
      <BentoTile delay={80} className="md:col-span-2">
        <StatusesTile />
      </BentoTile>

      {/* Full width: the last row would otherwise be one narrow tile beside two empty columns. */}
      <BentoTile delay={40} className="md:col-span-3">
        <StandaloneTile />
      </BentoTile>
    </div>
  );
}
