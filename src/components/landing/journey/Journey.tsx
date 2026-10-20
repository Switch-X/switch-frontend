"use client";

/**
 * The five stages of a job search, as something you can click through.
 *
 * <p>This is the page's main interactive block, and it earns its place by explaining the data
 * model without ever using the words "data model". Each stage names the record SWITCH keeps and
 * shows what that record actually holds, so by the end a visitor knows what they would be
 * getting rather than having read five adjectives about it.
 *
 * <p>It advances on its own so a passive reader still sees all five, and stops the moment anyone
 * touches it.
 */

import { useState } from "react";
import { JOURNEY_STAGES, STAGE_DWELL_MS } from "@/components/landing/journey/journey.constants";
import { useAutoAdvance } from "@/components/landing/useAutoAdvance";
import { StageRecord } from "./StageRecord";
import { StageSummary } from "./StageSummary";
import { StageTabs } from "./StageTabs";

export function Journey() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useAutoAdvance(JOURNEY_STAGES.length, STAGE_DWELL_MS, paused);
  const stage = JOURNEY_STAGES[active];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <StageTabs
        stages={JOURNEY_STAGES}
        active={active}
        onSelect={(index) => {
          setActive(index);
          setPaused(true);
        }}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <StageSummary
          key={stage.key}
          stage={stage}
          position={active + 1}
          total={JOURNEY_STAGES.length}
          paused={paused}
        />
        <StageRecord stage={stage} />
      </div>
    </div>
  );
}
