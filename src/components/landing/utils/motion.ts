/**
 * True when the reader has asked for less motion. Everything that animates on this page checks
 * it: content still arrives, it just arrives already there.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
