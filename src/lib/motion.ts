/**
 * True when the reader has asked for less motion.
 *
 * <p>Everything that animates checks it: content still arrives, it just arrives already there.
 * In `lib` rather than with the landing page because the app needs it too - a form that scrolls
 * a field into view should not swoop for somebody who has asked it not to.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
