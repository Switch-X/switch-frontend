/**
 * The counted stats band.
 *
 * <p>Every number here is a real count from the app itself - ten statuses, five stages - not an
 * invented "10,000 happy users". A landing page for something one person built should not
 * pretend otherwise. They are also all things a visitor can check by using the product, rather
 * than facts about its database.
 */
export const FEATURE_STATS = [
  { value: 5, label: "Stages tracked", hint: "Application, call, assignment, interview, offer" },
  { value: 10, label: "Application statuses", hint: "Including the ones nobody likes to show" },
  { value: 12, label: "Sample applications", hint: "One click fills a demo account" },
  { value: 0, label: "Passwords to remember", hint: "You sign in by picking your account" },
];

/** How far apart the counters start, so they land one after another rather than all at once. */
export const STAT_STAGGER_MS = 120;
