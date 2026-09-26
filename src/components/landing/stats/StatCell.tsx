"use client";

import { useCountUp } from "@/components/landing/hooks/useCountUp";

export function StatCell({
  value,
  label,
  hint,
  active,
  delay,
}: {
  value: number;
  label: string;
  hint: string;
  active: boolean;
  /** Added to the count's duration, so later cells land later. */
  delay: number;
}) {
  const shown = useCountUp(value, active, 1200 + delay);

  return (
    <div className="bg-surface p-6">
      <p className="font-display text-4xl font-extrabold tracking-tight tabular-nums text-ink">
        {shown}
      </p>
      <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
      <p className="mt-0.5 text-xs text-ink-subtle">{hint}</p>
    </div>
  );
}
