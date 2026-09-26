/**
 * The reader's own timezone, and the list a timezone picker offers.
 *
 * <p>Shared by sign-up and the profile page, which both ask for a zone and both do better by
 * offering the one the browser already knows than by making someone scroll for it.
 */

import { COMMON_TIMEZONES } from "./enums";

/**
 * The IANA zone the browser reports, or null where `Intl` cannot say.
 *
 * <p>Only meaningful in the browser - on the server it answers with the server's zone, which is
 * nobody's. Read it in an effect, an event handler, or a component the server never renders.
 */
export function detectTimeZone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

/**
 * The zones a picker offers: the current choice, then the detected zone, then the short list.
 *
 * <p>The first two go in explicitly because they are often not in the short list, and a `<select>`
 * whose value has no matching option silently shows - and then saves - the first one instead.
 */
export function timezoneChoices(selected: string, detected: string | null = null): string[] {
  return [...new Set([selected, ...(detected ? [detected] : []), ...COMMON_TIMEZONES])];
}
