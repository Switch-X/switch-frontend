import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Tone } from "@/lib/enums";

const TONE_STYLES: Record<Tone, string> = {
  neutral: "bg-surface-sunken text-ink-muted",
  info: "bg-info-soft text-info",
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  bad: "bg-bad-soft text-bad",
  accent: "bg-accent-soft text-accent",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium",
        TONE_STYLES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
