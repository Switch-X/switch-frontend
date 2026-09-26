/**
 * The only words a failure is allowed to put in front of the person using the app.
 *
 * <p>None of them say what failed or where. Addresses, configuration, stack traces and the names
 * of the services behind this app are for whoever is running it, so the proxy writes those to the
 * server's log - see `app/api/switch/[...path]/route.ts`. What reaches the screen says what
 * happened to the reader and what they can do about it.
 *
 * <p>The backend's own 4xx messages are the exception, and still pass through untouched: those
 * are written for the reader - "Company is required", "No profile for this account" - and hiding
 * them would leave a form unable to say which field it rejected.
 */
export const ERROR_MESSAGES = {
  /** The proxy could not get an answer at all. */
  unavailable: "SWITCH is not available right now. Please try again in a few minutes.",
  /** An answer came back, but it was a server-side failure. */
  serverError: "Something went wrong on our side. Please try again in a moment.",
  /** The browser could not reach this app - offline, or the app itself is down. */
  offline: "Could not reach SWITCH. Check your connection and try again.",
} as const;
