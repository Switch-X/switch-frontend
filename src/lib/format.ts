/**
 * Turning wire values into something worth reading.
 *
 * <p>The date helpers here take the backend's two different kinds of date seriously, because
 * confusing them is how a UI ends up showing the wrong day. A `LocalDate` - `appliedOn`,
 * `interviewDate` - is a calendar fact with no zone attached; parsing "2026-09-12" with
 * `new Date(...)` reads it as midnight UTC and then renders it in the viewer's zone, which shows
 * the 11th to everyone west of Greenwich. So plain dates are split on the hyphen and never go
 * near a `Date`. An `Instant` - `createdAt`, `lastActivity` - is a real moment, and rendering it
 * in the reader's own zone is exactly right.
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** `2026-09-12` to `12 Sep 2026`, with no timezone arithmetic anywhere near it. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

/** The same date, shortened for table cells: `12 Sep`. The year returns once it is not this one. */
export function formatDateShort(value: string | null | undefined): string {
  if (!value) return "—";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  const thisYear = new Date().getFullYear();
  return year === thisYear ? `${day} ${MONTHS[month - 1]}` : `${day} ${MONTHS[month - 1]} ${year}`;
}

/** An ISO instant, rendered in whatever zone the reader's browser is in. */
export function formatInstant(value: string | null | undefined): string {
  if (!value) return "—";
  const moment = new Date(value);
  if (Number.isNaN(moment.getTime())) return value;
  return moment.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * "in 3 days", "yesterday", "today".
 *
 * <p>Counted in whole calendar days rather than by subtracting milliseconds, so an interview
 * tomorrow morning reads as "tomorrow" rather than "in 0 days" at 11pm tonight.
 */
export function relativeDay(value: string | null | undefined): string | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  const target = Date.UTC(year, month - 1, day);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((target - today) / 86_400_000);

  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  if (days === -1) return "yesterday";
  if (days > 0) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

/** How many days from today, negative for the past. Used for sorting and for urgency colour. */
export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((Date.UTC(year, month - 1, day) - today) / 86_400_000);
}

/** Today as `yyyy-MM-dd` in the reader's own zone, for defaulting date inputs. */
export function todayAsInputValue(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** `90` to `1h 30m`. Zero is worth showing as "—" rather than "0m". */
export function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return "—";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/** `3` and `"interview"` to `3 interviews`. Every noun this app counts takes a plain "s". */
export function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

/**
 * Years and months of experience as one phrase.
 *
 * <p>Normalised before it is rendered. Each employment row holds its months as a remainder the
 * backend caps at 11, but summing several rows does not: two years six months plus one year nine
 * months is fifteen months, and "3 yrs 15 mo" is not something anyone writes down.
 */
export function formatTenure(years: number, months: number): string {
  const totalMonths = Math.max(0, Math.round(years * 12 + months));
  const wholeYears = Math.floor(totalMonths / 12);
  const restMonths = totalMonths % 12;

  const parts: string[] = [];
  if (wholeYears > 0) parts.push(`${wholeYears} yr${wholeYears === 1 ? "" : "s"}`);
  if (restMonths > 0) parts.push(`${restMonths} mo`);
  return parts.length === 0 ? "Less than a month" : parts.join(" ");
}

/** Two letters for an avatar. */
export function initialsOf(name: string | null | undefined): string {
  if (!name) return "?";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/** Splits "java, spring, kafka" into a clean list, dropping blanks and duplicates. */
export function parseList(raw: string): string[] {
  const seen = new Set<string>();
  for (const item of raw.split(",").map((part) => part.trim())) {
    if (item) seen.add(item);
  }
  return [...seen];
}

/** An empty string means "the user cleared this field", which the backend should store as null. */
export function blankToNull(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * "Good morning" / "Good afternoon" / "Good evening", worked out in the account's own zone
 * rather than the browser's.
 *
 * <p>Those two differ exactly when it matters most - somebody travelling, or a profile whose zone
 * was set somewhere other than where the laptop currently is. Falling back to a plain "Hello"
 * on an unparseable zone keeps a greeting on the page either way.
 */
export function greetingFor(timezone: string | null | undefined, now: Date = new Date()): string {
  let hour: number;
  try {
    hour = Number(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone ?? undefined,
        hour: "2-digit",
        hour12: false,
      }).format(now),
    );
  } catch {
    return "Hello";
  }

  if (Number.isNaN(hour)) return "Hello";
  if (hour < 5) return "Still up";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
