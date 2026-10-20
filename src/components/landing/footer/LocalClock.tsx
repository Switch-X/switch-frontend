"use client";

import { Icon } from "@/components/ui/icons";
import { useLocalClock } from "@/components/landing/footer/useLocalClock";

/**
 * The reader's own time, at the very end of the page.
 *
 * <p>Live and deliberate. Timezones are the one piece of real engineering in here, so the footer
 * ends on the reader's own quiet hours rather than a stock "made with love". Nothing is drawn
 * until it has mounted, since the server cannot know the reader's time.
 */
export function LocalClock() {
  const clock = useLocalClock();
  if (!clock) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs text-ink-subtle"
      title="Your own local time — the zone your quiet hours are read against"
    >
      <Icon.Globe aria-hidden="true" className="size-3.5" />
      <span className="tabular-nums">{clock.time}</span>
      <span className="text-ink-subtle/70">{clock.zone}</span>
    </span>
  );
}
