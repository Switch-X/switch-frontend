"use client";

import { FEATURE_STATS, STAT_STAGGER_MS } from "@/components/landing/constants/stats";
import { useInView } from "@/components/landing/hooks/useInView";
import { StatCell } from "./StatCell";

/** The counted stats. They all start counting together, the first time the band is in view. */
export function StatsBand() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
    >
      {FEATURE_STATS.map((stat, index) => (
        <StatCell
          key={stat.label}
          value={stat.value}
          label={stat.label}
          hint={stat.hint}
          active={inView}
          delay={index * STAT_STAGGER_MS}
        />
      ))}
    </div>
  );
}
