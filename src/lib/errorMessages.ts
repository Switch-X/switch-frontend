/**
 * The only words a failure is allowed to put in front of the person using the app.
 *
 * <p>Neither says what failed or where. Addresses, configuration, stack traces and the names of
 * the services behind the backend are for whoever is running it, and the backend already logs
 * them against the request's trace id. What reaches the screen says what happened to the reader
 * and what they can do about it - see `toApiError` in `api.ts`, which drops every 5xx body.
 *
 * <p>The backend's own 4xx messages are the exception and pass through untouched: those are
 * written for the reader - "Company is required", "No profile for this account" - and hiding
 * them would leave a form unable to say which field it rejected.
 */
export const ERROR_MESSAGES = {
  /** An answer came back, but it was a server-side failure. */
  serverError: "Something went wrong on our side. Please try again in a moment.",
  /**
   * No answer at all: the backend is down, or the browser refused the call before sending it.
   *
   * A blocked cross-origin call looks exactly like an unreachable one from here - the browser
   * tells JavaScript nothing either way, and writes the real reason to its own console.
   */
  offline: "Could not reach SWITCH. Check your connection and try again.",
} as const;
