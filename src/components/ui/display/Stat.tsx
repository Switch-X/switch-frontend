import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Tone } from "@/lib/enums";
import { Card } from "@/components/ui/layout/Card";

/** Written out rather than interpolated: Tailwind scans source text, so `text-${tone}` builds
 *  a class that is never generated and silently renders as unstyled. */
const STAT_TONES: Record<Tone, string> = {
  neutral: "text-ink",
  info: "text-info",
  good: "text-good",
  warn: "text-warn",
  bad: "text-bad",
  accent: "text-accent",
};

export function Stat({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: Tone;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium tracking-wide text-ink-subtle uppercase">{label}</p>
      <p className={cx("mt-2 text-2xl font-semibold tabular-nums", STAT_TONES[tone])}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </Card>
  );
}
