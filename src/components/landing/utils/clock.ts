/**
 * Clock arithmetic for the live clocks and the footer.
 *
 * <p>Everything goes through `Intl` and the tzdb rather than a UTC offset, because an offset is
 * only right until the next daylight-saving change - which is exactly the case these clocks are
 * on the page to demonstrate.
 */

const HOUR_MINUTE: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

/** Minutes past local midnight in `zone`, read through the tzdb rather than an offset. */
export function minutesNowIn(zone: string): number | null {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: zone, ...HOUR_MINUTE }).formatToParts(
      new Date(),
    );
    const hour = Number(parts.find((p) => p.type === "hour")?.value);
    const minute = Number(parts.find((p) => p.type === "minute")?.value);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
    return hour * 60 + minute;
  } catch {
    return null;
  }
}

export function toMinutes(hhmm: string): number {
  const [hour, minute] = hhmm.split(":").map(Number);
  return hour * 60 + minute;
}

/**
 * Quiet windows cross midnight far more often than not, so this cannot be a simple range test:
 * 22:00-07:30 is two intervals on a 24-hour line, not one.
 */
export function isQuiet(nowMinutes: number, quiet: { start: string; end: string }): boolean {
  const start = toMinutes(quiet.start);
  const end = toMinutes(quiet.end);
  return start <= end
    ? nowMinutes >= start && nowMinutes < end
    : nowMinutes >= start || nowMinutes < end;
}

/** `HH:mm` in `zone`, right now. */
export function formatClock(zone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", { timeZone: zone, ...HOUR_MINUTE }).format(new Date());
  } catch {
    return "--:--";
  }
}

/** The reader's own time and city, for the footer - or null where `Intl` cannot say. */
export function describeLocalTime(now: Date): { time: string; zone: string } | null {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    return {
      time: new Intl.DateTimeFormat("en-GB", HOUR_MINUTE).format(now),
      zone: zone.split("/").pop()?.replace(/_/g, " ") ?? zone,
    };
  } catch {
    return null;
  }
}
